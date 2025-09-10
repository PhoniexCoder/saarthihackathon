"use client"

import { useState, useEffect } from "react"
import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Users, Crown, Calendar } from "lucide-react"

interface Team {
  id: string
  name: string
  description: string
  leaderId: string
  leaderName: string
  members: any[]
  skillsRequired: string[]
  createdAt: any
}

export function TeamManagement() {
  const [teams, setTeams] = useState<Team[]>([])
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchTeams()
  }, [])

  useEffect(() => {
    const filtered = teams.filter(
      (team) =>
        team.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.leaderName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredTeams(filtered)
  }, [teams, searchTerm])

  const fetchTeams = async () => {
    try {
      const teamsQuery = query(collection(db, "teams"), orderBy("createdAt", "desc"))
      const snapshot = await getDocs(teamsQuery)
      const teamsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Team[]

      setTeams(teamsData)
      setFilteredTeams(teamsData)
    } catch (error) {
      console.error("Error fetching teams:", error)
    } finally {
      setLoading(false)
    }
  }

  const getTeamSizeBadge = (memberCount: number) => {
    if (memberCount < 2) {
      return <Badge variant="destructive">Incomplete ({memberCount}/2-4)</Badge>
    } else if (memberCount <= 4) {
      return <Badge className="bg-green-100 text-green-800">Complete ({memberCount}/4)</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800">Overfull ({memberCount}/4)</Badge>
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
        <CardTitle>Team Management</CardTitle>
        <CardDescription>View and manage all teams and their members</CardDescription>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
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
                <TableHead>Team Name</TableHead>
                <TableHead>Leader</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Skills Required</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTeams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span>{team.leaderName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{team.members?.length || 0} members</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {team.skillsRequired?.slice(0, 2).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {team.skillsRequired?.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{team.skillsRequired.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getTeamSizeBadge(team.members?.length || 0)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{team.createdAt?.toDate?.()?.toLocaleDateString() || "N/A"}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {filteredTeams.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">No teams found matching your search.</div>
        )}
      </CardContent>
    </Card>
  )
}
