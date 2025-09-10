"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { 
  doc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc,
  runTransaction
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Loader2, Users, Crown, Mail, Phone, Building, Check, X, Wifi, WifiOff, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { 
  checkNetworkConnectivity, 
  safeGetDoc, 
  retryWithBackoff,
  safeTransaction
} from "@/lib/firebase-utils"

interface TeamMember {
  uid: string
  fullName: string
  email: string
  phone: string
  university: string
  isLeader: boolean
}

interface Team {
  id: string
  teamName: string
  leaderId: string
  leaderName: string
  members: string[]
  memberDetails: TeamMember[]
  maxMembers: number
  description?: string
  skills?: string[]
  lookingFor?: string[]
  status: "open" | "full" | "closed"
  inviteCode: string
}

export default function JoinTeamPage() {
  const params = useParams()
  const router = useRouter()
  const { user, userProfile } = useAuth()
  const { toast } = useToast()
  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)
  const [error, setError] = useState("")
  const [isOnline, setIsOnline] = useState(true)
  const [memberInfo, setMemberInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    university: "",
  })

  const teamId = params.teamId as string

  // Advanced network connectivity check
  useEffect(() => {
    const checkOnlineStatus = async () => {
      const online = await checkNetworkConnectivity()
      setIsOnline(online)
    }

    const onlineHandler = () => checkOnlineStatus()
    const offlineHandler = () => setIsOnline(false)

    window.addEventListener('online', onlineHandler)
    window.addEventListener('offline', offlineHandler)
    checkOnlineStatus()

    return () => {
      window.removeEventListener('online', onlineHandler)
      window.removeEventListener('offline', offlineHandler)
    }
  }, [])

  // Fetch team data with advanced error handling and permission checks
  useEffect(() => {
    if (!teamId || !user) return

    const fetchTeam = async () => {
      try {
        setLoading(true)
        setError("")

        // Check network connectivity
        const isConnected = await checkNetworkConnectivity()
        if (!isConnected) {
          setError("You are currently offline. Please check your internet connection and try again.")
          setLoading(false)
          return
        }

        // Fetch team with additional permission validation
        const teamDoc = await getDoc(doc(db, "teams", teamId))
        
        if (!teamDoc.exists()) {
          setError("Team not found. The invite link may be invalid.")
          setLoading(false)
          return
        }

        const teamData = teamDoc.data() as Team

        // Permission checks
        if (teamData.status !== "open") {
          setError("This team is no longer accepting new members.")
          setLoading(false)
          return
        }

        if (teamData.members.length >= teamData.maxMembers) {
          setError("This team has reached its maximum member capacity.")
          setLoading(false)
          return
        }

        // Check if user is already in this or another team
        const userTeamsQuery = query(collection(db, "teams"), where("members", "array-contains", user.uid))
        const userTeams = await getDocs(userTeamsQuery)
        
        if (!userTeams.empty) {
          setError("You are already a member of a team and cannot join another.")
          setLoading(false)
          return
        }

        setTeam({
          id: teamId,
          ...teamData,
        })

        // Pre-fill member info with user profile data
        if (userProfile) {
          setMemberInfo({
            fullName: userProfile.fullName || "",
            email: userProfile.email || "",
            phone: userProfile.phone || "",
            university: userProfile.university || "",
          })
        }

      } catch (err: any) {
        console.error("Error fetching team:", err)
        
        // Detailed permission error handling
        if (err.code === 'permission-denied') {
          setError("You do not have permission to view this team. Please ensure you are authenticated.")
        } else {
          setError(err.message || "Failed to load team information. Please check your permissions and try again.")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [teamId, user, userProfile])

  // Advanced join team handler with comprehensive permission checks
  const handleJoinTeam = async () => {
    if (!user || !team) return

    setJoining(true)
    setError("")

    try {
      // Use Firebase transaction for atomic update with permission checks
      await runTransaction(db, async (transaction) => {
        // Fetch the most recent team data to ensure consistency
        const teamDocRef = doc(db, "teams", teamId)
        const teamDoc = await transaction.get(teamDocRef)
        
        if (!teamDoc.exists()) {
          throw new Error("Team no longer exists.")
        }

        const teamData = teamDoc.data() as Team

        // Comprehensive permission and validation checks
        if (teamData.status !== "open") {
          throw new Error("This team is no longer accepting new members.")
        }

        if (teamData.members.length >= teamData.maxMembers) {
          throw new Error("This team has reached its maximum member capacity.")
        }

        // Validate required fields
        if (!memberInfo.fullName.trim() || !memberInfo.email.trim() || 
            !memberInfo.phone.trim() || !memberInfo.university.trim()) {
          throw new Error("Please complete all required member information.")
        }

        // Check for duplicate email in team
        const emailExists = teamData.memberDetails.some(
          member => member.email.toLowerCase() === memberInfo.email.toLowerCase()
        )
        if (emailExists) {
          throw new Error("A member with this email is already in the team.")
        }

        // Prepare new member data
        const newMember: TeamMember = {
          uid: user.uid,
          fullName: memberInfo.fullName.trim(),
          email: memberInfo.email.trim(),
          phone: memberInfo.phone.trim(),
          university: memberInfo.university.trim(),
          isLeader: false,
        }

        // Prepare update
        const updatedMembers = [...teamData.members, user.uid]
        const updatedMemberDetails = [...teamData.memberDetails, newMember]
        const newStatus = updatedMembers.length >= teamData.maxMembers ? "full" : "open"

        // Perform atomic update
        transaction.update(teamDocRef, {
          members: updatedMembers,
          memberDetails: updatedMemberDetails,
          status: newStatus,
        })
      }, { maxAttempts: 3 })

      // Success toast
      toast({
        title: "Team Joined Successfully!",
        description: `You are now a member of ${team.teamName}.`,
        variant: "default"
      })

      // Redirect to teams page
      router.push("/teams")

    } catch (err: any) {
      console.error("Team join error:", err)
      
      // Detailed error handling
      let errorMessage = "Failed to join team."
      switch (err.code) {
        case 'permission-denied':
          errorMessage = "You do not have permission to join this team."
          break
        case 'failed-precondition':
          errorMessage = "Team join failed. The team may have changed or is no longer available."
          break
        default:
          errorMessage = err.message || "An unexpected error occurred. Please try again."
      }

      // Show error toast
      toast({
        title: "Team Join Error",
        description: errorMessage,
        variant: "destructive"
      })

      setError(errorMessage)
    } finally {
      setJoining(false)
    }
  }

  // Retry fetch with advanced error handling
  const retryFetch = async () => {
    setError("")
    setLoading(true)
    
    try {
      // Re-fetch team data with connectivity check
      const teamData = await safeGetDoc<Team>("teams", teamId, {
        timeout: 15000,
        retries: 3
      })
      
      if (!teamData) {
        setError("Team not found. The invite link may be invalid.")
        return
      }

      setTeam({
        id: teamId,
        ...teamData,
      })

      if (userProfile) {
        setMemberInfo({
          fullName: userProfile.fullName || "",
          email: userProfile.email || "",
          phone: userProfile.phone || "",
          university: userProfile.university || "",
        })
      }
    } catch (err: any) {
      setError(err.message || "Failed to load team information. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-muted-foreground">Loading team information...</p>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (error && !team) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background pt-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Alert variant="destructive" className="mb-6">
              {!isOnline ? <WifiOff className="h-4 w-4" /> : <X className="h-4 w-4" />}
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            
            <div className="flex gap-4">
              <Button onClick={() => router.push("/teams")} variant="outline">
                Back to Teams
              </Button>
              <Button onClick={retryFetch}>
                <Wifi className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!team) {
    return null
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Join Team</h1>
            <p className="text-muted-foreground">You've been invited to join a team for SARTHI 2025</p>
          </div>

          {/* Network Status Alert */}
          {!isOnline && (
            <Alert variant="destructive" className="mb-6">
              <WifiOff className="h-4 w-4" />
              <AlertDescription>
                You are currently offline. Please check your internet connection to join a team.
              </AlertDescription>
            </Alert>
          )}

          {/* Permission Error Alert */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="text-muted-foreground">Checking team details...</p>
            </div>
          )}

          {/* Team Details and Join Form */}
          {!loading && !error && team && (
            <>
              {/* Team Details Card */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {team.teamName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {team.description && (
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">{team.description}</p>
                    </div>
                  )}

                  <div>
                    <Label className="text-sm font-medium">Team Members ({team.members.length}/{team.maxMembers})</Label>
                    <div className="mt-2 space-y-2">
                      {team.memberDetails.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {member.fullName.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{member.fullName}</span>
                              {member.isLeader && <Crown className="w-3 h-3 text-yellow-500" />}
                            </div>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {member.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Building className="w-3 h-3" />
                                {member.university}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {team.skills && team.skills.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Team Skills</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {team.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {team.lookingFor && team.lookingFor.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Looking For</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {team.lookingFor.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Member Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Your Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={memberInfo.fullName}
                        onChange={(e) => setMemberInfo(prev => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={memberInfo.email}
                        onChange={(e) => setMemberInfo(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={memberInfo.phone}
                        onChange={(e) => setMemberInfo(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="university">University/College *</Label>
                      <Input
                        id="university"
                        value={memberInfo.university}
                        onChange={(e) => setMemberInfo(prev => ({ ...prev, university: e.target.value }))}
                        placeholder="Enter your university"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <Button 
                  variant="outline" 
                  onClick={() => router.push("/teams")} 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleJoinTeam} 
                  disabled={
                    joining || 
                    team.members.length >= team.maxMembers || 
                    team.status !== "open" || 
                    !isOnline
                  }
                  className="flex-1"
                >
                  {joining && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {!isOnline ? "Offline" :
                   team.members.length >= team.maxMembers ? "Team Full" : 
                   team.status !== "open" ? "Team Closed" : "Join Team"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
