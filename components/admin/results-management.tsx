"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trophy, Medal, Award, Star } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Submission {
  id: string
  teamId: string
  teamName: string
  projectTitle: string
  score?: number
  position?: number
  prize?: string
}

interface Result {
  id: string
  teamId: string
  teamName: string
  projectTitle: string
  position: number
  prize: string
  score: number
}

export function ResultsManagement() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch submissions with scores
      const submissionsQuery = query(collection(db, "submissions"), orderBy("score", "desc"))
      const submissionsSnapshot = await getDocs(submissionsQuery)
      const submissionsData = submissionsSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((sub: any) => sub.score !== undefined) as Submission[]

      // Fetch existing results
      const resultsQuery = query(collection(db, "results"), orderBy("position", "asc"))
      const resultsSnapshot = await getDocs(resultsQuery)
      const resultsData = resultsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Result[]

      setSubmissions(submissionsData)
      setResults(resultsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const declareWinner = async (submission: Submission, position: number, prize: string) => {
    try {
      const resultData = {
        teamId: submission.teamId,
        teamName: submission.teamName,
        projectTitle: submission.projectTitle,
        position,
        prize,
        score: submission.score || 0,
        declaredAt: new Date(),
      }

      // Add to results collection
      const resultRef = doc(db, "results", `${submission.teamId}-${position}`)
      await setDoc(resultRef, resultData)

      // Update submission with position
      const submissionRef = doc(db, "submissions", submission.id)
      await updateDoc(submissionRef, { position, prize })

      // Update local state
      setResults((prev) => [...prev.filter((r) => r.teamId !== submission.teamId), resultData])
      setSubmissions((prev) => prev.map((sub) => (sub.id === submission.id ? { ...sub, position, prize } : sub)))

      toast({
        title: "Winner Declared",
        description: `${submission.teamName} has been declared as ${prize}!`,
      })
    } catch (error) {
      console.error("Error declaring winner:", error)
      toast({
        title: "Error",
        description: "Failed to declare winner.",
        variant: "destructive",
      })
    }
  }

  const removeResult = async (result: Result) => {
    try {
      // Remove from results collection
      const resultRef = doc(db, "results", `${result.teamId}-${result.position}`)
      await updateDoc(resultRef, { deleted: true })

      // Update submission to remove position
      const submissionQuery = query(collection(db, "submissions"))
      const submissionSnapshot = await getDocs(submissionQuery)
      const submission = submissionSnapshot.docs.find((doc) => doc.data().teamId === result.teamId)

      if (submission) {
        const submissionRef = doc(db, "submissions", submission.id)
        await updateDoc(submissionRef, {
          position: null,
          prize: null,
        })
      }

      // Update local state
      setResults((prev) => prev.filter((r) => r.id !== result.id))
      setSubmissions((prev) =>
        prev.map((sub) => (sub.teamId === result.teamId ? { ...sub, position: undefined, prize: undefined } : sub)),
      )

      toast({
        title: "Result Removed",
        description: `${result.teamName} has been removed from results.`,
      })
    } catch (error) {
      console.error("Error removing result:", error)
      toast({
        title: "Error",
        description: "Failed to remove result.",
        variant: "destructive",
      })
    }
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <Star className="h-5 w-5 text-blue-500" />
    }
  }

  const getPrizeOptions = () => [
    { value: "1st Prize Winner", label: "1st Prize Winner" },
    { value: "2nd Prize Winner", label: "2nd Prize Winner" },
    { value: "3rd Prize Winner", label: "3rd Prize Winner" },
    { value: "Best Innovation Award", label: "Best Innovation Award" },
    { value: "Best Design Award", label: "Best Design Award" },
    { value: "Best Technical Implementation", label: "Best Technical Implementation" },
    { value: "People's Choice Award", label: "People's Choice Award" },
  ]

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
    <div className="space-y-6">
      {/* Current Results */}
      <Card>
        <CardHeader>
          <CardTitle>Declared Results</CardTitle>
          <CardDescription>Current winners and prize recipients</CardDescription>
        </CardHeader>
        <CardContent>
          {results.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Position</TableHead>
                    <TableHead>Team</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Prize</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {results.map((result) => (
                    <TableRow key={result.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getPositionIcon(result.position)}
                          <span className="font-medium">#{result.position}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{result.teamName}</TableCell>
                      <TableCell>{result.projectTitle}</TableCell>
                      <TableCell>
                        <Badge className="bg-purple-100 text-purple-800">{result.prize}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{result.score}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => removeResult(result)}>
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">No results declared yet.</div>
          )}
        </CardContent>
      </Card>

      {/* Declare New Winners */}
      <Card>
        <CardHeader>
          <CardTitle>Declare Winners</CardTitle>
          <CardDescription>Select teams to declare as winners (sorted by score)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Project</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission, index) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getPositionIcon(index + 1)}
                        <span className="font-medium">#{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{submission.teamName}</TableCell>
                    <TableCell>{submission.projectTitle}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>{submission.score}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.position ? (
                        <Badge className="bg-green-100 text-green-800">{submission.prize}</Badge>
                      ) : (
                        <Badge variant="secondary">Not declared</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {!submission.position && (
                        <div className="flex items-center space-x-2">
                          <Select
                            onValueChange={(prize) => {
                              const position = index + 1
                              declareWinner(submission, position, prize)
                            }}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Select prize" />
                            </SelectTrigger>
                            <SelectContent>
                              {getPrizeOptions().map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {submissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No scored submissions available for results declaration.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
