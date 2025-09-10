"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateUserProfileOptimistic: (data: Partial<UserProfile>) => void
  reloadUserProfile: () => Promise<void>
}

interface UserProfile {
  uid: string
  email: string
  fullName?: string
  phone?: string
  university?: string
  role: "participant" | "admin"
  registrationComplete: boolean
  teamId?: string
  teamRole?: "owner" | "admin" | "member"
  teamJoinDate?: Date
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  const updateUserProfileOptimistic = (data: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...data });
    }
  };

  const fetchUserProfile = async (user: User) => {
    const userDoc = await getDoc(doc(db, "users", user.uid))
    if (userDoc.exists()) {
      setUserProfile(userDoc.data() as UserProfile)
    } else {
      // Create basic profile for new users
      const basicProfile: UserProfile = {
        uid: user.uid,
        email: user.email!,
        role: "participant",
        registrationComplete: false,
        teamRole: undefined,
        teamId: undefined,
        teamJoinDate: undefined
      }
      try {
        await setDoc(doc(db, "users", user.uid), basicProfile)
        setUserProfile(basicProfile)
      } catch (err) {
      }
    }
  }

  const reloadUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        await fetchUserProfile(user)
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const logout = async () => {
    await signOut(auth)
  }

  const value = {
    user,
    userProfile,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    updateUserProfileOptimistic,
    reloadUserProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}