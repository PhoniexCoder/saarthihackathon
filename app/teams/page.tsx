"use client"

import { useState, useEffect } => "react"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { 
  doc, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  updateDoc, 
  getDoc 
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { 
  Edit, 
  Trash2, 
  PlusCircle 
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import JoinRequests from "@/components/teams/join-requests"
import Link from "next/link" // Add this import

interface TeamMember {
  uid: string
  fullName: string
  email: string
  phone: string
  university: string
  status: 'verified' | 'pending' | 'not_added'
}

interface Team {
  id: string
  teamName: string
  leaderId: string
  members: string[] // Change to an array of UIDs
  maxMembers: number
  lookingForTeammates: boolean
}

export default function TeamsPage() {
  const router = useRouter()
  const { user, userProfile } = useAuth()
  const { toast } = useToast()
  const [team, setTeam] = useState<Team | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'teammates' | 'invitations' | 'requests'>('teammates')
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0) // New state

  useEffect(() => {
    if (!user || !team || user.uid !== team.leaderId) return; // Only fetch if user is team leader

    const fetchPendingRequestsCount = async () => {
      try {
        const idToken = await user.getIdToken();
        const response = await fetch('/api/teams/join-requests', {
          headers: {
            'Authorization': `Bearer ${idToken}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPendingRequestsCount(data.length); // Assuming data is an array of requests
      } catch (err) {
        console.error("Error fetching pending join requests count:", err);
        setPendingRequestsCount(0);
      }
    };

    fetchPendingRequestsCount();
  }, [user, team]); // Re-run when user or team changes

  useEffect(() => {
    if (!user) return

    // Get fresh Firebase token for API calls
    const getIdToken = async () => {
      try {
        return await user.getIdToken();
      } catch (error) {
        console.error("Error getting Firebase ID token:", error);
        return null;
      }
    };

    const unsubscribe = onSnapshot(doc(db, "users", user.uid), async (userDocSnap) => {
      if (userDocSnap.exists() && userDocSnap.data().teamId) {
        const userTeamId = userDocSnap.data().teamId;
        const teamDocRef = doc(db, "teams", userTeamId);

        onSnapshot(teamDocRef, async (teamDocSnap) => {
          if (teamDocSnap.exists()) {
            const teamData = teamDocSnap.data() as Team

            // Fetch detailed member information for each UID in the members array
            const membersArray: TeamMember[] = await Promise.all(
                (teamData.members || []).map(async (uid: string): Promise<TeamMember> => {
                    try {
                      const memberDoc = await getDoc(doc(db, "users", uid))
                      const memberData = memberDoc.data()
                      return {
                        uid: uid,
                        fullName: memberData?.fullName || '',
                        email: memberData?.email || '',
                        phone: memberData?.phone || '',
                        university: memberData?.university || '',
                        status: (memberData ? 'verified' : 'pending') as TeamMember['status']
                      }
                    } catch { // If user document not found or error fetching
                      return { 
                        uid: uid,
                        fullName: '',
                        email: '',
                        phone: '',
                        university: '',
                        status: 'not_added' as TeamMember['status']
                      }
                    }
                })
            )

            setTeam({
              ...teamData,
              id: teamDocSnap.id,
              members: membersArray // Use the newly created membersArray
            })
          } else {
            setTeam(null)
          }
          setLoading(false)
        });
      } else {
        setTeam(null)
        setLoading(false)
      }
    });

    return unsubscribe
  }, [user])

  const toggleLookingForTeammates = async () => {
    if (!team) return

    try {
      await updateDoc(doc(db, "teams", team.id), {
        lookingForTeammates: !team.lookingForTeammates
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team status.",
        variant: "destructive"
      })
    }
  }


  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'not_added': return 'bg-red-100 text-red-800'
    }
  }

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
          <div className="animate-pulse text-primary">Loading...</div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white border rounded-lg">
            <Tabs 
              defaultValue="teammates" 
              value={activeTab} 
              onValueChange={(value) => setActiveTab(value as 'teammates' | 'invitations' | 'requests')}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="teammates">Teammates</TabsTrigger>
                  <TabsTrigger value="invitations">Invitations</TabsTrigger>
                  {user?.uid === team?.leaderId && (
                    <TabsTrigger value="requests">
                      <Link href={`/teams/join/${team?.id}`} className="flex items-center">
                        Join Requests {pendingRequestsCount > 0 && `(${pendingRequestsCount})`}
                      </Link>
                    </TabsTrigger>
                  )}
                </TabsList>
              </div>

              <TabsContent value="teammates">
                <div className="p-4">
                  {/* Team Name Section */}
                  <div className="p-4 border-b flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold">Team Name</span>
                      <span className="text-lg font-bold text-primary">{team?.teamName || 'N/A'}</span>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button variant="destructive" size="sm">
                      Cancel Team
                    </Button>
                  </div>

                  {/* Teammates Section */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-2">
                        <span>Teammates</span>
                        <span className="text-muted-foreground">({teamData.members.length}/{team?.maxMembers})</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Looking for Teammates</span>
                        <Button 
                          variant={team?.lookingForTeammates ? "default" : "outline"} 
                          size="sm"
                          onClick={toggleLookingForTeammates}
                        >
                          {team?.lookingForTeammates ? "On" : "Off"}
                        </Button>
                      </div>
                    </div>

                    {/* Member List */}
                    <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                      {(teamData.members || []).map((member, index) => (
                        <div 
                          key={index}
                          className="flex-shrink-0 w-64 mr-8 transform transition-all duration-300 hover:scale-105 hover:z-10 relative shadow-lg"
                          style={{ 
                            transform: `translateX(-${index * 25}px) scale(${1 - index * 0.03})`,
                            zIndex: teamData.members.length - index
                          }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
                                {member.fullName?.charAt(0).toUpperCase() || '?'}
                              </div>
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-baseline justify-between">
                                <h3 className="text-lg font-semibold">
                                  {member.fullName || 'Pending Member'}
                                </h3>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                                  {member.status.toUpperCase()}
                                </span>
                              </div>
                              <div className="space-y-1 text-sm">
                                {member.email && (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="i-lucide-mail opacity-70 w-4 h-4" />
                                    <span>{member.email}</span>
                                  </div>
                                )}
                                {member.phone && (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="i-lucide-phone opacity-70 w-4 h-4" />
                                    <span>{member.phone}</span>
                                  </div>
                                )}
                                {member.university && (
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="i-lucide-school opacity-70 w-4 h-4" />
                                    <span>{member.university}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Member */}
                    <div className="mt-4 flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add 1 participant to complete the team
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="requests">
                <div className="p-4">
                  <JoinRequests teamId={team?.id || ''} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}