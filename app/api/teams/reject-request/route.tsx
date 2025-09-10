import { NextResponse } from "next/server";
import { firebaseAdmin } from '@/lib/firebase-admin';
import { verifyFirebaseIdToken } from '@/lib/auth-middleware';

export async function POST(req: Request) {
  const { error, decodedToken } = await verifyFirebaseIdToken(req);
  
  if (error || !decodedToken) {
    console.error('Firebase authentication failed:', error);
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }
  
  const userId = decodedToken.uid;

  try {
    const { requestId } = await req.json();

    if (!requestId) {
      return NextResponse.json({ error: "Request ID is required" }, { status: 400 });
    }

    const db = firebaseAdmin.firestore();
    const requestRef = db.collection("joinRequests").doc(requestId);

    // Verify that the current user is the leader of the team
    const requestSnap = await requestRef.get();
    if (!requestSnap.exists) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 });
    }
    const { teamId } = requestSnap.data();
    const teamRef = db.collection("teams").doc(teamId);
    const teamSnap = await teamRef.get();
    if (!teamSnap.exists || teamSnap.data().leaderId !== userId) {
      return NextResponse.json({ error: "Forbidden: You are not the leader of this team" }, { status: 403 });
    }

    // Delete the join request
    await requestRef.delete();

    return NextResponse.json({ message: "Request rejected successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error rejecting request:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
