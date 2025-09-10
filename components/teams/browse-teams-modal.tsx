"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { TeamCard } from "./team-card"
import * as firestore from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { JoinTeamModal } from "./join-team-modal"
import { ScrollArea } from "@/components/ui/scroll-area"

// Simplified Team interface for this component
interface TeamMember {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  university: string;
  isLeader: boolean;
}

interface Team {
  id: string;
  teamName: string;
  leaderId: string;
  leaderName: string;
  members: string[];
  memberDetails: TeamMember[];
  maxMembers: number;
  description?: string;
  skills?: string[];
  lookingFor?: string[];
  status: "open" | "full" | "closed";
}

interface BrowseTeamsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BrowseTeamsModal({ isOpen, onClose }: BrowseTeamsModalProps) {
  const { user } = useAuth()
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
  const [isJoinModalOpen, setJoinModalOpen] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null)
  const [pendingRequestTeamIds, setPendingRequestTeamIds] = useState<string[]>([])

  useEffect(() => {
    if (!isOpen) {
      setActiveCardIndex(null) // Reset active card on close
      return
    }

    setLoading(true)
    const teamsQuery = firestore.query(
      firestore.collection(db, "teams"),
      firestore.where("status", "==", "open")
    )

    const unsubscribeTeams = firestore.onSnapshot(teamsQuery, async (snapshot) => {
      const teamsData = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Omit<Team, 'memberDetails'>)
      )
      
      // Fetch member details for each team
      const teamsWithDetails = await Promise.all(
        teamsData.map(async (team) => {
          const memberDetails = await Promise.all(
            team.members.map(async (memberId) => {
              const userDoc = await firestore.getDoc(firestore.doc(db, "users", memberId));
              if (userDoc.exists()) {
                const userData = userDoc.data();
                return {
                  uid: memberId,
                  fullName: userData.fullName || 'N/A',
                  email: userData.email || 'N/A',
                  phone: userData.phone || 'N/A',
                  university: userData.university || 'N/A',
                  isLeader: team.leaderId === memberId,
                } as TeamMember;
              }
              return null;
            })
          );
          return { ...team, memberDetails: memberDetails.filter(Boolean) as TeamMember[] } as Team;
        })
      );

      // Filter out teams the user is already in
      const availableTeams = teamsWithDetails.filter(team => !team.members.includes(user?.uid || ''));
      setTeams(availableTeams)
      setLoading(false)
    })

    let unsubscribeJoinRequests: () => void = () => {};
    if (user?.uid) {
      const joinRequestsQuery = firestore.query(
        firestore.collection(db, "joinRequests"),
        firestore.where("userId", "==", user.uid),
        firestore.where("status", "==", "pending")
      );
      unsubscribeJoinRequests = firestore.onSnapshot(joinRequestsQuery, (snapshot) => {
        const pendingRequests = snapshot.docs.map(doc => doc.data().teamId as string);
        setPendingRequestTeamIds(pendingRequests);
      });
    }

    return () => {
      unsubscribeTeams();
      unsubscribeJoinRequests();
    };
  }, [isOpen, user])

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.teamName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [teams, searchTerm])

  const handleJoinRequest = (team: Team) => {
    setSelectedTeam(team)
    setJoinModalOpen(true)
  }

  const handleCloseJoinModal = () => {
    setJoinModalOpen(false)
    setSelectedTeam(null)
  }

  const handleCardClick = (index: number) => {
    setActiveCardIndex(index === activeCardIndex ? null : index) // Toggle active state
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Browse Teams</DialogTitle>
            <DialogDescription>
              Find a team to join for SARTHI 2025.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4">
            <Input
              placeholder="Search for a team by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full overflow-x-auto scrollbar-hide">
            <div className="flex space-x-[-150px] p-4 pl-[150px]">
              {loading ? (
                <p>Loading teams...</p>
              ) : filteredTeams.length > 0 ? (
                filteredTeams.map((team, index) => (
                  <div 
                    key={team.id} 
                    className={`w-72 flex-shrink-0 transition-all duration-300 ease-in-out transform ${activeCardIndex === index ? 'scale-105 -translate-y-4' : 'hover:scale-105 hover:-translate-y-4'}`}
                    style={{ zIndex: activeCardIndex === index ? 100 : filteredTeams.length - index }}
                    onClick={() => handleCardClick(index)}
                  >
                    <TeamCard
                      team={team}
                      onJoinRequest={() => handleJoinRequest(team)}
                      hasPendingRequestForThisTeam={pendingRequestTeamIds.includes(team.id)}
                    />
                  </div>
                ))
              ) : (
                <p>No open teams found.</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      {selectedTeam && (
        <JoinTeamModal
          isOpen={isJoinModalOpen}
          onClose={handleCloseJoinModal}
          team={selectedTeam}
        />
      )}
    </>
  )
}
