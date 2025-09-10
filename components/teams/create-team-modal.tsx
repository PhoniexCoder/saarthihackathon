"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, X, Copy, Check, Users, Crown, Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TeamMember {
  uid: string
  fullName: string
  email: string
  phone: string
  university: string
  isLeader: boolean
}

interface CreateTeamModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function CreateTeamModal({ isOpen, onClose }: CreateTeamModalProps) {
  const { user, userProfile, reloadUserProfile, loading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [teamId, setTeamId] = useState("")
  const [teamLink, setTeamLink] = useState("")
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    teamName: "",
    maxMembers: "3"
  })

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [inviteEmail, setInviteEmail] = useState("")

  // Initialize with current user as leader
  useEffect(() => {
    if (user && userProfile) {
      setTeamMembers([
        {
          uid: user.uid,
          fullName: userProfile.fullName,
          email: userProfile.email || user.email || "", // Fallback to user.email
          phone: userProfile.phone || "",
          university: userProfile.university || "",
          isLeader: true,
        },
      ])
    }
  }, [user, userProfile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("handleSubmit called. User:", user, "UserProfile:", userProfile);
    if (!user || !userProfile) {
      setError("User not authenticated or profile not loaded.");
      setLoading(false);
      return;
    }

    if (userProfile.teamId) {
      setError("You are already in a team. You cannot create a new one.")
      return;
    }

    setLoading(true)
    setError("")

    try {
      // Validate team name
      if (!formData.teamName?.trim()) {
        setError("Please enter a team name");
        setLoading(false);
        return;
      }

      // Check if team name is unique
      const teamsQuery = query(collection(db, "teams"), where("teamName", "==", formData.teamName.trim()))
      const existingTeams = await getDocs(teamsQuery)

      if (!existingTeams.empty) {
        setError("A team with this name already exists. Please choose a different name.")
        setLoading(false)
        return
      }

      
      // Create team
      const teamRef = await addDoc(collection(db, "teams"), {
        teamName: formData.teamName.trim(),
        leaderId: user.uid,
        leaderEmail: userProfile.email || user.email || "",
        members: [user.uid],
        maxMembers: Number.parseInt(formData.maxMembers),
        status: "open",
        createdAt: new Date().toISOString(),
        inviteCode: generateInviteCode(),
        memberCount: 1, // Initialize memberCount to 1 for the leader
      })

      // Update user's team membership
      await updateDoc(doc(db, "users", user.uid), {
  teamId: teamRef.id,
  teamRole: "owner" ?? null,
  teamJoinDate: new Date().toISOString()
      })

      await reloadUserProfile()
      
      setTeamId(teamRef.id)
      setTeamLink(`${window.location.origin}/teams/join/${teamRef.id}`)
      
      toast({
        title: "Team Created Successfully!",
        description: "Your team has been created. Share the invite link with your teammates.",
      })

    } catch (err: any) {
      console.error("Error creating team:", err);
      setError(err.message || "Failed to create team")
    } finally {
      setLoading(false)
    }
  }

  const generateInviteCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  }

  const addTeamMember = () => {
    if (!inviteEmail.trim()) return

    const newMember: TeamMember = {
      uid: "",
      fullName: "",
      email: inviteEmail.trim(),
      phone: "",
      university: "",
      isLeader: false,
    }

    setTeamMembers(prev => [...prev, newMember])
    setInviteEmail("")
  }

  const removeTeamMember = (index: number) => {
    setTeamMembers(prev => prev.filter((_, i) => i !== index))
  }

  const updateTeamMember = (index: number, field: keyof TeamMember, value: string) => {
    setTeamMembers(prev => prev.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    ))
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(teamLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Link Copied!",
        description: "Team invite link has been copied to clipboard.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    onClose()
    // Reset form
    setFormData({
      teamName: "",
      maxMembers: "3",
    })
    setTeamMembers([])
    setTeamId("")
    setTeamLink("")
    setError("")
  }

  if (teamId) {
    // Show success state with invite link
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              Team Created Successfully!
            </DialogTitle>
            <DialogDescription>
              Your team "{formData.teamName}" has been created. Share the invite link with your teammates.
            </DialogDescription>
          </DialogHeader>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Team Invite Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input value={teamLink} readOnly className="text-sm" />
                <Button onClick={copyToClipboard} size="sm" variant="outline">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Team Members ({teamMembers.length}/{formData.maxMembers}):</p>
                <div className="mt-2 space-y-1">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {member.isLeader && <Crown className="w-3 h-3 text-yellow-500" />}
                      <span className="text-xs">{member.fullName || member.email}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
            <Button onClick={handleClose}>
              Go to Teams
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Your Team</DialogTitle>
          <DialogDescription>
            Start your team - You'll be the team leader. Invite others after creation.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="teamName">Team Name *</Label>
                <Input
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, teamName: e.target.value }))}
                  placeholder="Enter a unique team name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxMembers">Maximum Team Size *</Label>
                <Select
                  value={formData.maxMembers}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, maxMembers: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 members</SelectItem>
                    <SelectItem value="4">4 members</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={loading || !formData.teamName.trim()}
                onClick={handleSubmit}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Team
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}