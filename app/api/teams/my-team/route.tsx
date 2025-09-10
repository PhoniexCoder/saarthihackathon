
// File: app/api/teams/my-team/route.ts

import { NextResponse } from 'next/server';
import { getAuth } from "firebase-admin/auth"; // Example using Firebase Admin for auth

// --- DATABASE SIMULATION ---
// In a real app, this data comes from Firestore, Supabase, etc.
const teams = new Map<string, { uid: string; name: string; phone: string; isOwner?: boolean }[]>([
  ["unigo", [
    { uid: "owner123", name: "Priyanshu", phone: "+919193345928", isOwner: true },
    // New members will be added here by the accept-invite API
  ]]
]);

// This map would store which team a user belongs to
const userTeamMap = new Map<string, string>([
    ["owner123", "unigo"],
]);
// --- END DATABASE SIMULATION ---


export async function GET(request: Request) {
  try {
    // In a real app, you would verify the user's session token here
    // to get their UID securely.
    // For this example, we'll use a query param for simulation.
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User not authenticated.' }, { status: 401 });
    }

    // 1. Find which team the user belongs to
    const teamName = userTeamMap.get(userId);
    if (!teamName) {
      // This could mean the user hasn't created or joined a team yet
      return NextResponse.json([]); // Return an empty array
    }

    // 2. Get the members of that team
    const teamMembers = teams.get(teamName) || [];
    
    return NextResponse.json(teamMembers);

  } catch (error) {
    console.error("Error fetching team:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}