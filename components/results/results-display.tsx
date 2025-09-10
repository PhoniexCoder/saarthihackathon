"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Award, Star, Users, Calendar, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

interface Result {
  id: string
  teamId: string
  teamName: string
  projectTitle: string
  projectDescription?: string
  position: number
  prize: string
  score: number
  declaredAt: any
  presentationLink?: string
  demoVideoLink?: string
}

export function ResultsDisplay() {
  const [results, setResults] = useState<Result[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      // Fetch results that are not deleted
      const resultsQuery = query(collection(db, "results"), where("deleted", "!=", true), orderBy("position", "asc"))
      const snapshot = await getDocs(resultsQuery)

      if (snapshot.empty) {
        // If no results with deleted field, fetch all results
        const allResultsQuery = query(collection(db, "results"), orderBy("position", "asc"))
        const allSnapshot = await getDocs(allResultsQuery)
        const resultsData = allSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Result[]
        setResults(resultsData)
      } else {
        const resultsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Result[]
        setResults(resultsData)
      }
    } catch (error) {
      console.error("Error fetching results:", error)
      setError("Failed to load results. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-8 w-8 text-yellow-500" />
      case 2:
        return <Medal className="h-8 w-8 text-gray-400" />
      case 3:
        return <Award className="h-8 w-8 text-amber-600" />
      default:
        return <Star className="h-8 w-8 text-blue-500" />
    }
  }

  const getPositionGradient = (position: number) => {
    switch (position) {
      case 1:
        return "from-yellow-400 to-yellow-600"
      case 2:
        return "from-gray-300 to-gray-500"
      case 3:
        return "from-amber-400 to-amber-600"
      default:
        return "from-blue-400 to-blue-600"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg">Loading results...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-4">{error}</p>
          <Button onClick={fetchResults}>Try Again</Button>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Results Coming Soon!</h2>
          <p className="text-muted-foreground">
            The hackathon results will be announced here once judging is complete.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            SARTHI 2025 Results
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrating innovation in accessibility technology and inclusive design
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span>Results declared on {new Date().toLocaleDateString()}</span>
          </div>
        </motion.div>

        {/* Winners Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {results.map((result, index) => (
            <motion.div key={result.id} variants={itemVariants}>
              <Card
                className={`relative overflow-hidden border-2 ${
                  result.position <= 3 ? "border-primary shadow-lg" : "border-border"
                } hover:shadow-xl transition-all duration-300`}
              >
                {/* Position Badge */}
                <div
                  className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${getPositionGradient(result.position)} rounded-bl-3xl flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-lg">#{result.position}</span>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-3">
                    {getPositionIcon(result.position)}
                    <div>
                      <CardTitle className="text-xl">{result.teamName}</CardTitle>
                      <CardDescription className="text-sm">{result.projectTitle}</CardDescription>
                    </div>
                  </div>

                  <Badge
                    className={`w-fit bg-gradient-to-r ${getPositionGradient(result.position)} text-white border-0`}
                  >
                    {result.prize}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  {result.projectDescription && (
                    <p className="text-sm text-muted-foreground line-clamp-3">{result.projectDescription}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-semibold">{result.score} points</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">Team</span>
                    </div>
                  </div>

                  {/* Project Links */}
                  {(result.presentationLink || result.demoVideoLink) && (
                    <div className="flex space-x-2 pt-2">
                      {result.presentationLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => window.open(result.presentationLink, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Presentation
                        </Button>
                      )}
                      {result.demoVideoLink && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => window.open(result.demoVideoLink, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Congratulations Section */}
        <motion.div
          className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Trophy className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
          <h2 className="text-3xl font-bold mb-4">Congratulations to All Participants!</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Thank you for your incredible innovations in accessibility technology. Your projects are making the world
            more inclusive and accessible for everyone.
          </p>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="text-center mt-16 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <p>SARTHI 2025 - Empowering Innovation in Accessibility</p>
        </motion.div>
      </div>
    </div>
  )
}
