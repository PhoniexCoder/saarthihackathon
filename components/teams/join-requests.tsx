import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JoinRequest {
  id: string;
  teamId: string;
  userId: string;
  userName: string;
  userEmail: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: any; // Firebase Timestamp
}

const JoinRequests: React.FC = () => {
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();

  const fetchJoinRequests = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const idToken = await user.getIdToken();
      const response = await fetch('/api/teams/join-requests', {
        headers: {
          'Authorization': `Bearer ${idToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: JoinRequest[] = await response.json();
      setJoinRequests(data);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to fetch join requests.', { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchJoinRequests();
    }
  }, [user]);

  const handleApprove = async (requestId: string) => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/teams/approve-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ requestId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success('Join request approved!');
      fetchJoinRequests(); // Refresh the list
    } catch (err: any) {
      toast.error('Failed to approve request.', { description: err.message });
    }
  };

  const handleReject = async (requestId: string) => {
    if (!user) return;
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/teams/reject-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({ requestId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success('Join request rejected!');
      fetchJoinRequests(); // Refresh the list
    } catch (err: any) {
      toast.error('Failed to reject request.', { description: err.message });
    }
  };

  if (loading) {
    return <div className="text-center">Loading join requests...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (joinRequests.length === 0) {
    return <div className="text-center text-gray-500">No pending join requests.</div>;
  }

  return (
    <div className="space-y-4">
      {joinRequests.map((request) => (
        <Card key={request.id}>
          <CardHeader>
            <CardTitle>Join Request from {request.userName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {request.userEmail}</p>
            {request.message && <p><strong>Message:</strong> {request.message}</p>}
            <p><strong>Status:</strong> {request.status}</p>
            <div className="mt-4 space-x-2">
              <Button onClick={() => handleApprove(request.id)}>Approve</Button>
              <Button variant="outline" onClick={() => handleReject(request.id)}>Reject</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JoinRequests;