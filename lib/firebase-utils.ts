import { db } from './firebase'
import { 
  doc, 
  getDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  updateDoc,
  runTransaction,
  DocumentReference,
  DocumentData
} from 'firebase/firestore'

// Advanced network connectivity check
export const checkNetworkConnectivity = async (timeout = 5000): Promise<boolean> => {
  return new Promise((resolve) => {
    // Multiple connectivity check methods
    const checkMethods = [
      () => navigator.onLine,
      async () => {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), timeout)
          
          await fetch('https://www.google.com/favicon.ico', {
            method: 'HEAD',
            mode: 'no-cors',
            signal: controller.signal
          })
          
          clearTimeout(timeoutId)
          return true
        } catch {
          return false
        }
      },
      async () => {
        try {
          // Firebase-specific connectivity check
          const testDoc = doc(db, '_connectivity_test', 'test')
          await getDoc(testDoc)
          return true
        } catch {
          return false
        }
      }
    ]

    // Sequential method checking
    const tryNextMethod = async (index = 0) => {
      if (index >= checkMethods.length) {
        resolve(false)
        return
      }

      try {
        const result = await checkMethods[index]()
        if (result) {
          resolve(true)
        } else {
          await tryNextMethod(index + 1)
        }
      } catch {
        await tryNextMethod(index + 1)
      }
    }

    tryNextMethod()
  })
}

// Safe document fetch with advanced error handling
export const safeGetDoc = async <T = DocumentData>(
  collectionName: string, 
  docId: string, 
  options: { 
    timeout?: number, 
    retries?: number 
  } = {}
): Promise<T | null> => {
  const { timeout = 10000, retries = 3 } = options

  // Check network connectivity
  const isConnected = await checkNetworkConnectivity()
  if (!isConnected) {
    console.warn('No internet connection. Attempting to fetch from local cache.')
  }

  const fetchWithRetry = async (retriesLeft: number): Promise<T | null> => {
    try {
      const docRef = doc(db, collectionName, docId)
      const docSnap = await getDoc(docRef)
      
      if (!docSnap.exists()) {
        console.warn(`Document ${docId} not found in ${collectionName}`)
        return null
      }
      
      return docSnap.data() as T
    } catch (error: any) {
      console.error(`Error fetching document from ${collectionName}:`, error)
      
      if (retriesLeft > 0) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000))
        return fetchWithRetry(retriesLeft - 1)
      }
      
      throw error
    }
  }

  try {
    return await Promise.race([
      fetchWithRetry(retries),
      new Promise<null>((_, reject) => 
        setTimeout(() => reject(new Error('Fetch timeout')), timeout)
      )
    ])
  } catch (error: any) {
    console.error('Safe document fetch failed:', error)
    
    // Specific error handling
    if (error.code === 'failed-precondition') {
      throw new Error('Offline: Client is not connected. Check your internet connection.')
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase service is currently unavailable.')
    } else if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to access this document.')
    }
    
    throw error
  }
}

// Safe transaction with retry and offline handling
export const safeTransaction = async <T>(
  transactionFn: (transaction: any) => Promise<T>,
  options: { 
    timeout?: number, 
    retries?: number 
  } = {}
): Promise<T> => {
  const { timeout = 10000, retries = 3 } = options

  // Check network connectivity
  const isConnected = await checkNetworkConnectivity()
  if (!isConnected) {
    throw new Error('No internet connection. Cannot perform transaction.')
  }

  const executeTransaction = async (retriesLeft: number): Promise<T> => {
    try {
      return await runTransaction(db, async (transaction) => {
        return await transactionFn(transaction)
      }, { maxAttempts: 3 })
    } catch (error: any) {
      console.error('Transaction error:', error)
      
      if (retriesLeft > 0) {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, 1000))
        return executeTransaction(retriesLeft - 1)
      }
      
      throw error
    }
  }

  try {
    return await Promise.race([
      executeTransaction(retries),
      new Promise<T>((_, reject) => 
        setTimeout(() => reject(new Error('Transaction timeout')), timeout)
      )
    ])
  } catch (error: any) {
    console.error('Safe transaction failed:', error)
    
    // Specific error handling
    if (error.code === 'failed-precondition') {
      throw new Error('Offline: Cannot complete transaction. Check your internet connection.')
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase service is currently unavailable.')
    } else if (error.code === 'permission-denied') {
      throw new Error('You do not have permission to perform this transaction.')
    }
    
    throw error
  }
}

// Retry mechanism with exponential backoff
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  options: { 
    maxRetries?: number, 
    baseDelay?: number, 
    timeout?: number 
  } = {}
): Promise<T> => {
  const { 
    maxRetries = 3, 
    baseDelay = 1000, 
    timeout = 15000 
  } = options

  // Check network connectivity before attempting
  const isConnected = await checkNetworkConnectivity()
  if (!isConnected) {
    throw new Error('No internet connection. Cannot perform operation.')
  }

  const executeWithRetry = async (retriesLeft: number): Promise<T> => {
    try {
      return await fn()
    } catch (error: any) {
      if (retriesLeft === 0) throw error

      // Exponential backoff
      const delay = baseDelay * Math.pow(2, maxRetries - retriesLeft)
      await new Promise(resolve => setTimeout(resolve, delay))

      return executeWithRetry(retriesLeft - 1)
    }
  }

  try {
    return await Promise.race([
      executeWithRetry(maxRetries),
      new Promise<T>((_, reject) => 
        setTimeout(() => reject(new Error('Operation timeout')), timeout)
      )
    ])
  } catch (error: any) {
    console.error('Retry operation failed:', error)
    throw error
  }
}
