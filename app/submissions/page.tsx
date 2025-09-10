"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { SubmissionForm } from "@/components/submissions/submission-form"
import { SubmissionStatus } from "@/components/submissions/submission-status"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { AlertCircle, Users } from "lucide-react"

interface Team {
  id: string
  teamName: string
  leaderId: string
  members: string[]
  submissions?: {
    pptLink: string
    videoLink: string
    status: "draft" | "final"
    submittedAt: string
    submittedBy: string
  }
}

export default function SubmissionsPage() {
  const { user, userProfile } = useAuth()
  const [userTeam, setUserTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    // Listen to user's team
    const teamsQuery = query(collection(db, "teams"), where("members", "array-contains", user.uid))

    const unsubscribe = onSnapshot(teamsQuery, async (snapshot) => {
      if (!snapshot.empty) {
        const teamDoc = snapshot.docs[0]
        const teamData = {
          id: teamDoc.id,
          ...teamDoc.data(),
        } as Team

        setUserTeam(teamData)
      } else {
        setUserTeam(null)
      }
      setLoading(false)
    })

    return unsubscribe
  }, [user])

  if (!userProfile?.registrationComplete) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please complete your registration before managing submissions.
                <Button asChild className="ml-4">
                  <a href="/register">Complete Registration</a>
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!userTeam) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Team Found</h3>
                <p className="text-muted-foreground mb-6">You need to be part of a team to manage submissions.</p>
                <Button asChild>
                  <a href="/teams">Join or Create Team</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Project Submissions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your team's project presentation and demo video for SARTHI 2025
            </p>
          </div>

          <div className="space-y-6">
            {/* Team Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  {userTeam.teamName}
                </CardTitle>
                <CardDescription>
                  {userTeam.leaderId === user?.uid ? "You are the team leader" : "Team submission management"}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Submission Status */}
            <SubmissionStatus team={userTeam} />

            {/* Submission Form */}
            <SubmissionForm team={userTeam} />

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Presentation Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Upload your presentation to Google Drive and share the link</li>
                    <li>Ensure the link is accessible to anyone with the link</li>
                    <li>Maximum 10 slides covering problem, solution, and impact</li>
                    <li>Include team member details and contact information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Demo Video Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Upload to YouTube, Vimeo, or Google Drive</li>
                    <li>Maximum 5 minutes duration</li>
                    <li>Show your working prototype or solution</li>
                    <li>Include brief explanation of accessibility features</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Important Notes</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Submissions can be saved as draft and finalized later</li>
                    <li>Only finalized submissions will be considered for judging</li>
                    <li>Final submission deadline: November 9th, 10:00 AM</li>
                    <li>All team members can edit submissions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
