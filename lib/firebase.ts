import { initializeApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null

// Enable offline persistence
const enableOfflinePersistence = async () => {
  try {
    await enableIndexedDbPersistence(db, { forceOwnership: true })
    console.log("Offline persistence enabled")
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('failed-precondition')) {
        console.warn("Offline persistence can only be enabled in one tab at a time.")
      } else if (error.message.includes('unimplemented')) {
        console.warn("Offline persistence is not supported in this browser.")
      }
    }
  }
}

// Check if we're in a browser environment before enabling persistence
if (typeof window !== 'undefined') {
  enableOfflinePersistence()
}

// Development environment emulator setup
if (process.env.NODE_ENV === 'development') {
  // Uncomment and configure these if you're using local emulators
  // connectAuthEmulator(auth, 'http://localhost:9099')
  // connectFirestoreEmulator(db, 'localhost', 8080)
  // connectStorageEmulator(storage, 'localhost', 9199)
}

export default app