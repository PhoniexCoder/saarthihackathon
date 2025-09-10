"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, FileText, Video, ExternalLink, Eye, Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Submission {
  id: string
  teamId: string
  teamName: string
  projectTitle: string
  projectDescription: string
  presentationLink: string
  demoVideoLink: string
  status: string
  score?: number
  feedback?: string
  createdAt: any
  updatedAt: any
}

export function SubmissionReview() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [filteredSubmissions, setFilteredSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)

  useEffect(() => {
    fetchSubmissions()
  }, [])

  useEffect(() => {
    const filtered = submissions.filter(
      (submission) =>
        submission.teamName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.projectTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.projectDescription?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredSubmissions(filtered)
  }, [submissions, searchTerm])

  const fetchSubmissions = async () => {
    try {
      const submissionsQuery = query(collection(db, "submissions"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(submissionsQuery)
      const submissionsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Submission[]

      setSubmissions(submissionsData)
      setFilteredSubmissions(submissionsData)
    } catch (error) {
      console.error("Error fetching submissions:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateSubmissionScore = async (submissionId: string, score: number, feedback: string) => {
    try {
      const submissionRef = doc(db, "submissions", submissionId)
      await updateDoc(submissionRef, {
        score,
        feedback,
        reviewedAt: new Date(),
      })

      // Update local state
      setSubmissions((prev) => prev.map((sub) => (sub.id === submissionId ? { ...sub, score, feedback } : sub)))

      toast({
        title: "Score Updated",
        description: "Submission score has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating score:", error)
      toast({
        title: "Error",
        description: "Failed to update submission score.",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "final":
        return <Badge className="bg-green-100 text-green-800">Final</Badge>
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submission Review</CardTitle>
        <CardDescription>Review and score team submissions</CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search submissions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team</TableHead>
                <TableHead>Project Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.teamName}</TableCell>
                  <TableCell>{submission.projectTitle}</TableCell>
                  <TableCell>{getStatusBadge(submission.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{submission.score || "Not scored"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{submission.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{submission.projectTitle}</DialogTitle>
                          <DialogDescription>Team: {submission.teamName}</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Project Description</h4>
                            <p className="text-sm text-muted-foreground">{submission.projectDescription}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold mb-2">Presentation</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full bg-transparent"
                                onClick={() => window.open(submission.presentationLink, "_blank")}
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Presentation
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </Button>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-2">Demo Video</h4>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full bg-transparent"
                                onClick={() => window.open(submission.demoVideoLink, "_blank")}
                              >
                                <Video className="h-4 w-4 mr-2" />
                                Watch Demo
                                <ExternalLink className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Score & Feedback</h4>
                            <div className="space-y-2">
                              <Input
                                type="number"
                                placeholder="Score (0-100)"
                                defaultValue={submission.score || ""}
                                min="0"
                                max="100"
                                id={`score-${submission.id}`}
                              />
                              <Input
                                placeholder="Feedback (optional)"
                                defaultValue={submission.feedback || ""}
                                id={`feedback-${submission.id}`}
                              />
                              <Button
                                onClick={() => {
                                  const scoreInput = document.getElementById(
                                    `score-${submission.id}`,
                                  ) as HTMLInputElement
                                  const feedbackInput = document.getElementById(
                                    `feedback-${submission.id}`,
                                  ) as HTMLInputElement
                                  const score = Number.parseInt(scoreInput.value)
                                  const feedback = feedbackInput.value

                                  if (score >= 0 && score <= 100) {
                                    updateSubmissionScore(submission.id, score, feedback)
                                  }
                                }}
                                className="w-full"
                              >
                                Update Score
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredSubmissions.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No submissions found matching your search.</div>
        )}
      </CardContent>
    </Card>
  )
}
