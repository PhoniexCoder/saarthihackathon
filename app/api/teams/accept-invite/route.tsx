import { NextResponse } from 'next/server';
import { verifyFirebaseIdToken } from '@/lib/auth-middleware';
import { firebaseAdmin } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  const authResult = await verifyFirebaseIdToken(request);

  if (authResult.error || !authResult.decodedToken) {
    return NextResponse.json({ error: authResult.error || 'Unauthorized' }, { status: 401 });
  }

  const { token } = await request.json();

  if (!token) {
    return NextResponse.json({ error: 'Invite token is required.' }, { status: 400 });
  }

  const userId = authResult.decodedToken.uid;

  try {
    const db = firebaseAdmin.firestore();
    const teamName = await db.runTransaction(async (transaction) => {
      const inviteDocRef = db.collection('invites').doc(token);
      const inviteDoc = await transaction.get(inviteDocRef);

      if (!inviteDoc.exists) {
        throw new Error('This invitation is invalid or has been used.');
      }

      const inviteData = inviteDoc.data();

      // Removed: if (inviteData.used) { throw new Error('This invitation has already been used.'); }

      if (new Date() > inviteData.expiresAt.toDate()) {
        throw new Error('This invitation has expired.');
      }

      const userDocRef = db.collection('users').doc(userId);
      const userDoc = await transaction.get(userDocRef);

      if (!userDoc.exists) {
        throw new Error('Your user profile could not be found.');
      }

      if (userDoc.data().teamId) {
        throw new Error('You are already part of a team.');
      }

      const teamId = inviteData.teamId;
      const teamDocRef = db.collection('teams').doc(teamId);
      const teamDoc = await transaction.get(teamDocRef);

      if (!teamDoc.exists) {
        throw new Error('The team you were invited to no longer exists.');
      }

      const teamData = teamDoc.data();
      const membersCollectionRef = db.collection(`teams/${teamId}/members`).doc(userId);
      const teamMembersSnapshot = await transaction.get(membersCollectionRef);

      // Note: This check is simplified. A more robust check would query the members subcollection.
      // For now, we assume a `memberCount` field on the team document.
      if (teamData.memberCount >= 4) {
        throw new Error('This team is already full.');
      }

      // All checks passed, let's add the user to the team
      transaction.update(userDocRef, {
        teamId: teamId,
        teamRole: 'member',
        teamJoinDate: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      });

      // Add user to the team's members array in the teams document
      transaction.update(teamDocRef, {
        members: firebaseAdmin.firestore.FieldValue.arrayUnion(userId),
      });

      // Remove user to the team's members subcollection as it's no longer needed
      // transaction.set(membersCollectionRef, {
      //   userId: userId,
      //   role: 'member',
      //   joinedAt: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      //   email: authResult.decodedToken.email, // Storing email for convenience
      // });

      // Increment the member count on the team
      transaction.update(teamDocRef, {
        memberCount: (teamData.memberCount || 0) + 1,
      });

      // Removed: Mark the invite as used
      // transaction.update(inviteDocRef, {
      //   used: true,
      //   usedBy: userId,
      // });

      return teamData.name;
    });

    return NextResponse.json({ message: `Successfully joined team ${teamName}!` });

  } catch (error) {
    console.error('Error accepting invite:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return NextResponse.json({ error: `Failed to join team: ${errorMessage}` }, { status: 500 });
  }
}