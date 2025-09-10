"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Upload, Save, Send, ExternalLink } from "lucide-react"

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
    description?: string
  }
}

interface SubmissionFormProps {
  team: Team
}

export function SubmissionForm({ team }: SubmissionFormProps) {
  const { user, userProfile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    pptLink: team.submissions?.pptLink || "",
    videoLink: team.submissions?.videoLink || "",
    description: team.submissions?.description || "",
  })

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (status: "draft" | "final") => {
    if (!user || !userProfile) return

    setLoading(true)
    setError("")
    setSuccess("")

    try {
      // Validation
      if (status === "final") {
        if (!formData.pptLink.trim() || !formData.videoLink.trim()) {
          setError("Both presentation and video links are required for final submission.")
          setLoading(false)
          return
        }

        if (!validateUrl(formData.pptLink) || !validateUrl(formData.videoLink)) {
          setError("Please provide valid URLs for both links.")
          setLoading(false)
          return
        }
      }

      // Update team document
      await updateDoc(doc(db, "teams", team.id), {
        submissions: {
          pptLink: formData.pptLink.trim(),
          videoLink: formData.videoLink.trim(),
          description: formData.description.trim(),
          status,
          submittedAt: new Date().toISOString(),
          submittedBy: userProfile.fullName,
        },
      })

      setSuccess(
        status === "draft"
          ? "Submission saved as draft successfully!"
          : "Submission finalized successfully! Your project has been submitted for judging.",
      )
    } catch (err: any) {
      setError(err.message || "Failed to save submission")
    } finally {
      setLoading(false)
    }
  }

  const isReadOnly = team.submissions?.status === "final"

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Project Submission
        </CardTitle>
        <CardDescription>
          {isReadOnly
            ? "Your submission has been finalized and cannot be edited."
            : "Upload your project presentation and demo video links."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-200 bg-green-50">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="pptLink">Presentation Link *</Label>
            <div className="flex gap-2">
              <Input
                id="pptLink"
                type="url"
                placeholder="https://drive.google.com/file/d/..."
                value={formData.pptLink}
                onChange={(e) => setFormData((prev) => ({ ...prev, pptLink: e.target.value }))}
                disabled={isReadOnly}
              />
              {formData.pptLink && validateUrl(formData.pptLink) && (
                <Button variant="outline" size="sm" asChild className="shrink-0 bg-transparent">
                  <a href={formData.pptLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Google Drive, Dropbox, or similar cloud storage link</p>
          </div>

          <div>
            <Label htmlFor="videoLink">Demo Video Link *</Label>
            <div className="flex gap-2">
              <Input
                id="videoLink"
                type="url"
                placeholder="https://youtube.com/watch?v=... or https://drive.google.com/..."
                value={formData.videoLink}
                onChange={(e) => setFormData((prev) => ({ ...prev, videoLink: e.target.value }))}
                disabled={isReadOnly}
              />
              {formData.videoLink && validateUrl(formData.videoLink) && (
                <Button variant="outline" size="sm" asChild className="shrink-0 bg-transparent">
                  <a href={formData.videoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">YouTube, Vimeo, Google Drive, or similar platform</p>
          </div>

          <div>
            <Label htmlFor="description">Project Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your project, key features, and accessibility innovations..."
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              disabled={isReadOnly}
            />
          </div>
        </div>

        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={() => handleSubmit("draft")} disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </Button>

            <Button
              onClick={() => handleSubmit("final")}
              disabled={loading || !formData.pptLink.trim() || !formData.videoLink.trim()}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Send className="mr-2 h-4 w-4" />
              Submit Final
            </Button>
          </div>
        )}

        {isReadOnly && (
          <div className="pt-4">
            <Badge className="bg-green-100 text-green-800">Final Submission Completed</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
