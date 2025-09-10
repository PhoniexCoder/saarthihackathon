import { NextResponse } from 'next/server';
import { firebaseAdmin } from '@/lib/firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { verifyFirebaseIdToken } from '@/lib/auth-middleware';

export async function POST(request: Request) {
  try {
    const authResult = await verifyFirebaseIdToken(request);

    if (authResult.error) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    const { decodedToken } = authResult;
    if (!decodedToken?.uid) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = decodedToken.uid;
    const db = firebaseAdmin.firestore();
    const userDocRef = db.collection('users').doc(userId);
    const userDoc = await userDocRef.get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const userProfile = userDoc.data();
    if (!userProfile.teamId) {
      return NextResponse.json({ error: 'User is not part of a team' }, { status: 403 });
    }

    // Fetch the team document to check if the user is the leader
    const teamDocRef = db.collection('teams').doc(userProfile.teamId);
    const teamDoc = await teamDocRef.get();

    if (!teamDoc.exists) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    const teamData = teamDoc.data();
    if (teamData.leaderId !== userId) {
      return NextResponse.json({ error: 'Only the team leader can generate invites' }, { status: 403 });
    }

    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token valid for 24 hours

    const inviteDocRef = db.collection('invites').doc(token);
    await inviteDocRef.set({
      teamId: userProfile.teamId,
      createdBy: userId,
      createdAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      expiresAt,
      used: false,
      usedBy: null,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const inviteLink = `${appUrl}/join/${token}`;

    return NextResponse.json({
      inviteLink,
      expiresAt: expiresAt.toISOString(),
    });

  } catch (error) {
    console.error('Error generating invite link:', error);
    return NextResponse.json({ error: 'Failed to generate invite link.' }, { status: 500 });
  }
}