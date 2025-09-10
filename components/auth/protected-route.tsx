"use client"

import type React from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export function ProtectedRoute({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/",
}: ProtectedRouteProps) {
  const { user, userProfile, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [teamStatus, setTeamStatus] = useState<'checking' | 'has-team' | 'no-team'>('checking');

  useEffect(() => {
    if (loading) return;

    const fromRegistration = searchParams.get('from') === 'registration';

    if (requireAuth && !user) {
      router.push(redirectTo);
      return;
    }

    if (requireAdmin && userProfile?.role !== "admin") {
      router.push(redirectTo);
      return;
    }

    if (user && userProfile?.registrationComplete) {
      if (teamStatus === 'checking') {
        fetch(`/api/teams/my-team?userId=${user.uid}`)
          .then(res => res.json())
          .then(data => {
            if (Array.isArray(data) && data.length > 0) {
              setTeamStatus('has-team');
            } else {
              setTeamStatus('no-team');
            }
          })
          .catch(() => setTeamStatus('no-team'));
      }
    } else if (user && !userProfile?.registrationComplete && pathname !== '/register' && !fromRegistration) {
        router.push('/register');
    } else {
      setTeamStatus('no-team');
    }

    if (teamStatus === 'no-team' && pathname !== '/team-selection' && pathname !== '/register' && pathname !== '/dashboard') {
      router.push('/team-selection');
    }

  }, [user, userProfile, loading, requireAuth, requireAdmin, redirectTo, router, teamStatus, pathname, searchParams]);

  if (loading || (userProfile?.registrationComplete && teamStatus === 'checking')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null;
  }

  if (requireAdmin && userProfile?.role !== "admin") {
    return null;
  }

  if (teamStatus === 'no-team' && pathname !== '/team-selection' && pathname !== '/dashboard') {
    return null;
  }

  return <>{children}</>;
}
