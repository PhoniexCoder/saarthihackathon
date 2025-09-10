import * as admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    console.log("Initializing Firebase Admin SDK...");
    
    if (!process.env.FIREBASE_ADMIN_SDK_CONFIG) {
      throw new Error("FIREBASE_ADMIN_SDK_CONFIG environment variable missing");
    }

    // Decode base64 service account configuration
    const decodedConfig = Buffer.from(
      process.env.FIREBASE_ADMIN_SDK_CONFIG, 
      'base64'
    ).toString('utf-8');

    console.log("Decoded service account config:", decodedConfig.slice(0, 100) + "...");

    const serviceAccount = JSON.parse(decodedConfig);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
    });
    
    console.log("Firebase Admin SDK initialized successfully");
  } catch (error: any) {
    console.error("Initialization error:", error);
    throw new Error(`Firebase Admin init failed: ${error.message}`);
  }
}

export const firebaseAdmin = admin;
