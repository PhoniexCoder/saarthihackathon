"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Crown, Plus, ArrowRight, Copy, Zap, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface TeamMember {
  uid: string
  fullName: string
  email: string
  phone: string
  university: string
  isLeader: boolean
  avatarUrl?: string
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
}

interface TeamCardProps {
  team: Team
  onJoinRequest: () => void
  hasPendingRequestForThisTeam: boolean
}

export function TeamCard({ team, onJoinRequest, hasPendingRequestForThisTeam }: TeamCardProps) {
  const { toast } = useToast()
  const isFull = team.members.length >= team.maxMembers
  const isOpen = team.status === "open" && !isFull

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/20 rounded-xl overflow-hidden shadow-lg w-full flex flex-col">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-base font-bold text-primary">
              <Users className="w-5 h-5" />
              {team.teamName}
            </CardTitle>
            <CardDescription className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <Crown className="w-4 h-4 text-yellow-500" />
              Led by {team.leaderName}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            {hasPendingRequestForThisTeam && (
              <Badge variant="secondary" className="text-xs font-semibold bg-yellow-500 text-white">
                Pending Request
              </Badge>
            )}
            <Badge variant={isOpen ? "success" : "destructive"} className="text-xs font-semibold">
              {isFull ? "Full" : team.status === "closed" ? "Closed" : "Open"}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {team.members.length}/{team.maxMembers} members
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-3 flex-grow">
        {team.description && (
          <p className="text-xs text-muted-foreground line-clamp-3">{team.description}</p>
        )}

        <Separator />

        {/* Team Members */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-foreground">Members</h4>
          <div className="flex items-center -space-x-2">
            {team.memberDetails && team.memberDetails.map((member, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="w-7 h-7 border-2 border-primary/50">
                      <AvatarImage src={member.avatarUrl} alt={member.fullName} />
                      <AvatarFallback className="bg-primary/20 text-primary font-bold text-xs">
                        {getInitials(member.fullName)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">{member.fullName}</p>
                    <p className="text-xs text-muted-foreground">{member.university}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        {/* Skills */}
        {team.skills && team.skills.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold mb-2 text-foreground">Skills</h4>
            <div className="flex flex-wrap gap-1">
              {team.skills.slice(0, 5).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {team.skills.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{team.skills.length - 5}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Looking For */}
        {team.lookingFor && team.lookingFor.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold mb-2 text-foreground">Looking For</h4>
            <div className="flex flex-wrap gap-1">
              {team.lookingFor.slice(0, 5).map((item, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {item}
                </Badge>
              ))}
              {team.lookingFor.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{team.lookingFor.length - 5}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-3 bg-muted/30 flex gap-2 mt-auto">
        <Button
          onClick={onJoinRequest}
          disabled={!isOpen || hasPendingRequestForThisTeam}
          className="flex-1 group"
          size="sm"
        >
          <Plus className="w-4 h-4 mr-1" />
          {hasPendingRequestForThisTeam ? "Pending" : (isFull ? "Full" : team.status === "closed" ? "Closed" : "Join")}
        </Button>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="px-2"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(`${window.location.origin}/join/${team.id}`);
                  toast({ title: "Copied!", description: "Invite link copied." });
                }}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy Invite Link</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}