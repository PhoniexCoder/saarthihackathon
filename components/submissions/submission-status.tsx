"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react"

interface Team {
  id: string
  teamName: string
  submissions?: {
    pptLink: string
    videoLink: string
    status: "draft" | "final"
    submittedAt: string
    submittedBy: string
    description?: string
  }
}

interface SubmissionStatusProps {
  team: Team
}

export function SubmissionStatus({ team }: SubmissionStatusProps) {
  const { submissions } = team

  if (!submissions) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-muted-foreground" />
            No Submissions Yet
          </CardTitle>
          <CardDescription>
            Your team hasn't uploaded any submissions yet. Start by adding your project links below.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const statusConfig = {
    draft: {
      icon: Clock,
      color: "bg-yellow-100 text-yellow-800",
      title: "Draft Saved",
      description: "Your submission is saved as draft. Remember to finalize it before the deadline.",
    },
    final: {
      icon: CheckCircle,
      color: "bg-green-100 text-green-800",
      title: "Final Submission",
      description: "Your submission has been finalized and submitted for judging.",
    },
  }

  const config = statusConfig[submissions.status]
  const StatusIcon = config.icon

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StatusIcon className="w-5 h-5" />
          Submission Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge className={config.color}>{config.title}</Badge>
          <span className="text-sm text-muted-foreground">
            Submitted by {submissions.submittedBy} on{" "}
            {new Date(submissions.submittedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">{config.description}</p>

        {submissions.description && (
          <div>
            <h4 className="font-medium mb-2">Project Description</h4>
            <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">{submissions.description}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Presentation</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {submissions.pptLink ? "Link provided" : "Not provided"}
              </span>
              {submissions.pptLink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={submissions.pptLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Demo Video</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {submissions.videoLink ? "Link provided" : "Not provided"}
              </span>
              {submissions.videoLink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={submissions.videoLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
