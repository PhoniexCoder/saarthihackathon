"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Users,
  Pencil,
  Trash2,
  Bell,
  UserPlus,
  Info,
  PlusCircle,
  Copy,
  LogOut,
  User,
  Menu
} from "lucide-react"
import { CreateTeamModal } from "@/components/teams/create-team-modal"
import { BrowseTeamsModal } from "@/components/teams/browse-teams-modal"
import { ProfileModal } from "@/components/profile/profile-modal"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"

import JoinRequests from "@/components/teams/join-requests";

// --- A simple loading component for better UX ---
const DashboardLoadingSkeleton = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
            {/* You can add a spinner icon here */}
            <p className="text-xl font-semibold text-gray-700">Loading Your Dashboard...</p>
            <p className="text-sm text-gray-500">Fetching your team details.</p>
        </div>
    </div>
);

interface Team {
  id: string
  name: string
  members: any[]
  maxMembers: number
  inviteCode: string
  createdAt: string
}

// Main Dashboard Component
export default function DashboardPage() {
  const { user, userProfile, loading: authLoading, logout, reloadUserProfile } = useAuth()
  const { toast } = useToast()
  
  const [team, setTeam] = useState<Team | null>(null)
  const [joinRequests, setJoinRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  const [isLookingForTeammates, setIsLookingForTeammates] = useState(true)
  
  // Modal & Invite State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [isBrowseTeamsModalOpen, setBrowseTeamsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadTeamData = async () => {
      setLoading(true);
      try {
        if (userProfile?.teamId) {
          const teamDoc = await getDoc(doc(db, 'teams', userProfile.teamId));
          if (teamDoc.exists()) {
            const teamData = teamDoc.data();

            const memberPromises = teamData.members.map((memberId: string) => getDoc(doc(db, 'users', memberId)));
            const memberDocs = await Promise.all(memberPromises);
            const members = memberDocs.map(memberDoc => {
              if (memberDoc.exists()) {
                const memberData = memberDoc.data();
                return {
                  uid: memberDoc.id,
                  name: memberData.fullName,
                  phone: memberData.phone,
                  status: 'verified',
                  isOwner: memberData.teamRole === 'owner'
                };
              }
              return null;
            }).filter(Boolean);

            const teamSlots = Array(teamData.maxMembers || 4).fill(null);
            members.forEach((member, index) => {
              if (index < teamSlots.length) {
                teamSlots[index] = member;
              }
            });

            setTeam({
              id: teamDoc.id,
              name: teamData.teamName,
              members: teamSlots,
              maxMembers: teamData.maxMembers,
              inviteCode: teamData.inviteCode,
              createdAt: teamData.createdAt
            });

            // Fetch join requests if the user is the leader
            if (userProfile.uid === teamData.leaderId) {
              const idToken = await user.getIdToken();
              const res = await fetch(`/api/teams/join-requests?teamId=${teamDoc.id}`, {
                headers: {
                  'Authorization': `Bearer ${idToken}`,
                },
              });
              if (res.ok) {
                const requests = await res.json();
                setJoinRequests(requests);
              }
            }
          }
        }
      } catch (error) {
        toast({
          title: 'Error loading team',
          description: error instanceof Error ? error.message : 'Failed to load team data',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      if (user) {
        loadTeamData();
      } else {
        setLoading(false);
      }
    }
  }, [user, userProfile, authLoading, toast]);

  const handleInvite = async () => {
    if (!team || !user) return;
    const currentTeamSize = team.members.filter(Boolean).length;
    if (currentTeamSize >= team.maxMembers) {
      toast({ title: "Team Full", description: "You cannot invite more members.", variant: "destructive" });
      return;
    }
    setIsGeneratingLink(true);
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/teams/generate-invite', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`
        },
        credentials: 'include',
        body: JSON.stringify({ teamName: team.name }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create invite link.');
      }
      const data = await response.json();
      setInviteLink(data.inviteLink);
      setIsInviteModalOpen(true);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsGeneratingLink(false);
    }
  };

  const handleRemoveTeammate = (indexToRemove: number) => {
    if (!team) return;
    if (team.members[indexToRemove]?.isOwner) {
      toast({ title: "Action Forbidden", description: "You cannot remove the team owner.", variant: "destructive" });
      return;
    }
    // This should also be an API call in a real app to update the database
    const newTeammates = team.members.map((member, index) => index === indexToRemove ? null : member);
    setTeam({ ...team, members: newTeammates });
  };

  const handleApproveRequest = async (requestId: string) => {
    if (!user) return;
    const idToken = await user.getIdToken();
    const res = await fetch("/api/teams/approve-request", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ requestId }),
    });
    if (res.ok) {
      setJoinRequests(joinRequests.filter(req => req.id !== requestId));
      await reloadUserProfile();
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    if (!user) return;
    const idToken = await user.getIdToken();
    const res = await fetch("/api/teams/reject-request", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({ requestId }),
    });
    if (res.ok) {
      setJoinRequests(joinRequests.filter(req => req.id !== requestId));
    }
  };

  if (authLoading || loading) {
    return <DashboardLoadingSkeleton />;
  }

  const currentTeamSize = team ? team.members.filter(member => member !== null).length : 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div>
                <h1 className="text-lg font-bold">SARTHI 2025</h1>
                <p className="text-sm text-gray-500">Graphic Era hill University</p>
              </div>
            </div>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-4">
               <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
               <div className="flex items-center space-x-2">
                 <Button variant="outline"><UserPlus className="h-4 w-4 mr-2"/>Invitations<Badge variant="destructive" className="ml-2">0</Badge></Button>
                 <Button variant="outline"><Users className="h-4 w-4 mr-2"/>Requests<Badge variant="destructive" className="ml-2">{joinRequests.length}</Badge></Button>
                 <Button variant="outline" onClick={() => setIsProfileModalOpen(true)}><User className="h-4 w-4 mr-2"/>Profile</Button>
                 <Button variant="outline" onClick={logout}><LogOut className="h-4 w-4 mr-2"/>Logout</Button>
               </div>
            </div>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <Menu className="h-6 w-6" />
                </Button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <Button variant="ghost" className="w-full justify-start"><Bell className="h-5 w-5 mr-2" />Notifications</Button>
                    <Button variant="ghost" className="w-full justify-start"><UserPlus className="h-4 w-4 mr-2"/>Invitations<Badge variant="destructive" className="ml-2">0</Badge></Button>
                    <Button variant="ghost" className="w-full justify-start"><Users className="h-4 w-4 mr-2"/>Requests<Badge variant="destructive" className="ml-2">{joinRequests.length}</Badge></Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => {setIsProfileModalOpen(true); setIsMobileMenuOpen(false);}}><User className="h-4 w-4 mr-2"/>Profile</Button>
                    <Button variant="ghost" className="w-full justify-start" onClick={() => {logout(); setIsMobileMenuOpen(false);}}><LogOut className="h-4 w-4 mr-2"/>Logout</Button>
                </div>
            </div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Team Details */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg border">
              {!userProfile?.teamId || !team ? (
                <div className="text-center py-8">
                  <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard!</h2>
                  <p className="text-gray-600 mb-8 max-w-xl mx-auto">You are not part of a team yet. Get started by creating a new team or joining an existing one.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Create Team Card */}
                    <div 
                      className="bg-gray-50 p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer transition-all flex flex-col items-center justify-center text-center"
                      onClick={() => setCreateTeamModalOpen(true)}
                    >
                      <PlusCircle className="h-12 w-12 text-blue-500 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800">Create a New Team</h3>
                      <p className="text-sm text-gray-500 mt-2">Build your team from scratch and invite members to collaborate.</p>
                    </div>

                    {/* Join Team Card */}
                    <div 
                      className="bg-gray-50 p-8 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-500 hover:bg-green-50 cursor-pointer transition-all flex flex-col items-center justify-center text-center"
                      onClick={() => setBrowseTeamsModalOpen(true)}
                    >
                      <Users className="h-12 w-12 text-green-500 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-800">Join an Existing Team</h3>
                      <p className="text-sm text-gray-500 mt-2">Browse existing teams to find your perfect match and join them.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">Team Name: {team.name}</h2>
                      <Pencil className="h-5 w-5 text-gray-500 cursor-pointer" />
                    </div>
                    <Button variant="outline" className="text-red-500 border-red-500">Cancel Team</Button>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">Teammates ({currentTeamSize}/{team.maxMembers})</h3>
                      <p className="text-sm text-gray-500">
                        {currentTeamSize < team.maxMembers ? `Add ${team.maxMembers - currentTeamSize} more participant(s) to complete the team` : 'Your team is full!'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="looking-for-teammates">Looking for Teammates</label>
                      <Switch id="looking-for-teammates" checked={isLookingForTeammates} onCheckedChange={setIsLookingForTeammates} />
                      <Info className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {team.members.map((member, index) =>
                      member ? (
                        <TeamMemberCard key={member.uid || index} member={member} onRemove={() => handleRemoveTeammate(index)} />
                      ) : (
                        <EmptySlotCard key={index} onInvite={handleInvite} isLoading={isGeneratingLink} />
                      )
                    )}
                  </div>

                  <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-green-500"></div><span>Verified</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-yellow-500"></div><span>Confirmation Pending/Unsaved Changes</span></div>
                    <div className="flex items-center space-x-1"><div className="w-3 h-3 rounded-full bg-red-500"></div><span>Not Added Yet</span></div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Suggestions and Requests */}
            <div className="bg-white p-6 rounded-lg border">
              {userProfile?.teamRole === 'owner' && (
                <JoinRequests />
              )}
              <SuggestionTabs />
              <div className="mt-6 text-center">
                <div className="flex justify-center">
                   <Image src="/no-suggestion.png" alt="No suggestions" width={200} height={200} />
                </div>
                <p className="mt-4 text-gray-600">No friend suggestion right now. Explore other ways to create your team.</p>
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <Button variant="outline">&larr; Back</Button>
            <Button>Update Details</Button>
          </div>
        </main>

        {/* Modals */}
        {user && <CreateTeamModal isOpen={isCreateTeamModalOpen} onClose={() => setCreateTeamModalOpen(false)} userId={user.uid} />}
        <BrowseTeamsModal isOpen={isBrowseTeamsModalOpen} onClose={() => setBrowseTeamsModalOpen(false)} />
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        <InviteModal isOpen={isInviteModalOpen} onClose={() => setIsInviteModalOpen(false)} link={inviteLink} toast={toast} />
      </div>
    </ProtectedRoute>
  )
}

// --- SUB-COMPONENTS (No changes needed below) ---

const TeamMemberCard = ({ member, onRemove }: { member: any, onRemove: () => void }) => {
  const isVerified = member.status === 'verified';
  return (
    <div className={`p-3 rounded-lg flex items-center justify-between ${isVerified ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${isVerified ? 'bg-green-500' : 'bg-gray-400'}`}>{member.name.charAt(0)}</div>
        <div>
          <p className="font-semibold">{member.name}</p>
          <p className="text-sm text-gray-600">{member.phone}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {!isVerified && <Badge variant="destructive">Not Added Yet</Badge>}
        <button><Pencil className="h-5 w-5 text-gray-600" /></button>
        {!member.isOwner && (<button onClick={onRemove}><Trash2 className="h-5 w-5 text-gray-600" /></button>)}
      </div>
    </div>
  );
};

const EmptySlotCard = ({ onInvite, isLoading }: { onInvite: () => void, isLoading: boolean }) => (
  <div className="p-3 rounded-lg flex items-center justify-center border-2 border-dashed bg-gray-50">
    <Button variant="ghost" onClick={onInvite} disabled={isLoading} className="text-gray-600">
      <PlusCircle className="h-5 w-5 mr-2" />
      {isLoading ? "Generating Link..." : "Invite Teammate"}
    </Button>
  </div>
);

const InviteModal = ({ isOpen, onClose, link, toast }: { isOpen: boolean, onClose: () => void, link: string, toast: any }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(link).then(() => {
      toast({ title: "Copied!", description: "Invitation link copied to clipboard." });
    }).catch(() => {
      toast({ title: "Error", description: "Could not copy the link.", variant: "destructive" });
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite a Teammate</DialogTitle>
          <DialogDescription>Share this link to invite someone to your team. The link expires in 24 hours.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <Input id="link" value={link} readOnly className="flex-grow" />
          <Button type="button" size="icon" onClick={handleCopyLink}><Copy className="h-4 w-4" /></Button>
        </div>
        <DialogFooter><Button variant="secondary" onClick={onClose}>Close</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const SuggestionTabs = () => (
  <div className="flex space-x-4 border-b">
    <button className="py-2 px-1 text-blue-600 border-b-2 border-blue-600 font-semibold text-sm">Past teammates</button>
    <button className="py-2 px-1 text-gray-500 text-sm flex items-center gap-1">Teams seeking to join <Info className="h-4 w-4" /></button>
    <button className="py-2 px-1 text-gray-500 text-sm flex items-center gap-1">Players seeking to join <Info className="h-4 w-4" /></button>
  </div>
);