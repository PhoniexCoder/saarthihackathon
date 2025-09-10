import { NextRequest, NextResponse } from "next/server";
import { verifyFirebaseIdToken } from "@/lib/auth-middleware";
import { firebaseAdmin } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  const authResult = await verifyFirebaseIdToken(req);

  if (authResult.error) {
    return NextResponse.json({ error: authResult.error }, { status: 401 });
  }

  const { decodedToken } = authResult;
  
  if (!decodedToken?.uid) {
    return NextResponse.json({ error: "Invalid authentication token" }, { status: 401 });
  }

  try {
    const db = firebaseAdmin.firestore();

    console.log("Attempting to parse request body...");
    const { teamId, message } = await req.json();
    console.log("Request body parsed:", { teamId, message });

    if (!teamId) {
      return NextResponse.json({ error: "Team ID is required" }, { status: 400 });
    }

  // Get full user document from Firestore
  const userDoc = await db.collection("users").doc(decodedToken.uid).get();
  if (!userDoc.exists) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const userData = userDoc.data();

  console.log("Attempting to add document to joinRequests collection...");
  // Create a join request
  await db.collection("joinRequests").add({
    teamId,
    userId: decodedToken.uid,
    userName: userData.fullName || '',
    userEmail: decodedToken.email || '',
    message,
    status: "pending",
      createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });
  console.log("Document added to joinRequests collection.");

    return NextResponse.json({ message: "Join request sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending join request:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
