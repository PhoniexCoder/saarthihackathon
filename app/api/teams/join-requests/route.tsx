import { NextResponse, type NextRequest } from 'next/server';
import { firebaseAdmin } from '@/lib/firebase-admin';
import { verifyFirebaseIdToken } from '@/lib/auth-middleware';

export async function GET(req: NextRequest) {
  const { error, decodedToken } = await verifyFirebaseIdToken(req);

  if (error || !decodedToken) {
    console.error('Firebase authentication failed:', error);
    return NextResponse.json({ error: error || 'Unauthorized' }, { status: 401 });
  }

  const userId = decodedToken.uid;
  console.log('Inside join-requests API route. userId:', userId);

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = firebaseAdmin.firestore();

    // Find the team where the current user is the leader
    const teamsSnapshot = await db.collection('teams')
      .where('leaderId', '==', userId)
      .get();

    if (teamsSnapshot.empty) {
      return NextResponse.json({ error: 'You are not a leader of any team' }, { status: 403 });
    }

    const teamDoc = teamsSnapshot.docs[0];
    const teamId = teamDoc.id;

    // Fetch join requests for this team
    const joinRequestsSnapshot = await db.collection('joinRequests')
      .where('teamId', '==', teamId)
      .where('status', '==', 'pending') // Filter directly in the query
      .get();

    const joinRequests = joinRequestsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(joinRequests);
  } catch (error) {
    console.error('Error fetching join requests:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
