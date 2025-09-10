"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Team {
  id: string
  teamName: string
}

interface JoinTeamModalProps {
  isOpen: boolean
  onClose: () => void
  team: Team | null
}

export function JoinTeamModal({ isOpen, onClose, team }: JoinTeamModalProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !team) return

    setLoading(true)
    setError("")

    try {
      const idToken = await user.getIdToken();

      const response = await fetch("/api/teams/request-to-join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({ teamId: team.id, message }),
        credentials: "include", // Ensure cookies are sent
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to send join request");
      }

      toast({
        title: "Request Sent!",
        description: `Your request to join ${team.teamName} has been sent.`,
      })

      onClose()

    } catch (err: any) {
      setError(err.message || "Failed to send join request")
    } finally {
      setLoading(false)
    }
  }

  if (!team) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request to Join {team.teamName}</DialogTitle>
          <DialogDescription>
            Send a message to the team leader with your request to join.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell the team about your skills and why you want to join... (Optional)"
              rows={5}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}