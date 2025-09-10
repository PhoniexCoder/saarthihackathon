"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function JoinPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const { user, loading, reloadUserProfile } = useAuth(); // Assuming your auth context provides a `loading` state

  const token = params.token as string;

  useEffect(() => {
    // Wait until the initial authentication check is complete
    if (loading) {
      return; 
    }

    // Case 1: Auth check is done, but there is NO logged-in user
    if (!user && token) {
      // Redirect to the registration/login page and pass the invite token
      // so we can return the user here after they sign in.
      const loginUrl = `/register?inviteToken=${token}`;
      router.push(loginUrl);
      return;
    }

    // Case 2: Auth check is done, AND a user is logged in
    if (user && token) {
      const acceptInvite = async () => {
        try {
          const idToken = await user.getIdToken(); // Get the ID token

          const response = await fetch('/api/teams/accept-invite', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${idToken}`,
            },
            body: JSON.stringify({ token }),
          });

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || 'Failed to join the team.');
          }
          
          toast({
            title: "Welcome to the Team!",
            description: `You have successfully joined ${result.teamName}.`,
          });
          await reloadUserProfile(); // Call to reload user profile

        } catch (error: any) {
          toast({
            title: "Invitation Error",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          // Whether it succeeds or fails, send the user to their dashboard
          router.push('/dashboard');
        }
      };

      acceptInvite();
    }
  }, [token, user, loading, router, toast, reloadUserProfile]); // Added reloadUserProfile to dependencies

  // Render a generic loading state while we check auth and process the token
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-semibold">Verifying your invitation...</p>
        <p className="text-sm text-gray-600">Please wait a moment.</p>
      </div>
    </div>
  );
}