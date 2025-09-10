"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { RegistrationForm } from "@/components/registration/registration-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Loader2 } from "lucide-react"
import { LoginModal } from "@/components/auth/login-modal"
import { ProtectedRoute } from "@/components/auth/protected-route"


export default function RegisterPage() {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    if (!loading && !user) {
      setShowLoginModal(true)
    }
  }, [user, loading])

  const handleCloseModal = () => {
    setShowLoginModal(false)
    if (!user) {
      router.push("/")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginModal isOpen={showLoginModal} onClose={handleCloseModal} />
  }

  if (userProfile?.registrationComplete) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-2xl">Registration Complete!</CardTitle>
                <CardDescription>
                  Thank you for registering for SARTHI 2025. Your registration has been successfully submitted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userProfile?.uid && (
                    <Badge variant="secondary" className="text-sm">
                      Registration ID: {userProfile.uid.slice(-8).toUpperCase()}
                    </Badge>
                  )}
                  <p className="text-muted-foreground">
                    You can now proceed to form teams and participate in the hackathon. Check your email for further
                    updates and instructions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Register for SARTHI 2025</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Complete your registration to participate in the Inter-University Hackathon on Accessibility Innovation
          </p>
        </div>

        <RegistrationForm />
      </div>
    </div>
  )
}