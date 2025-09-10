import { NextRequest } from "next/server";
import { firebaseAdmin } from "./firebase-admin";

interface AuthResult {
  error?: string;
  decodedToken?: any;
}

export async function verifyFirebaseIdToken(req: NextRequest): Promise<AuthResult> {
  const authHeader = req.headers.get("Authorization") || req.headers.get("authorization");
  
  if (!authHeader) {
    console.error("Authorization header is missing");
    return { error: "Authorization header is required" };
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.error("Malformed authorization header:", authHeader.slice(0, 50));
    return { error: "Invalid authorization format" };
  }

  const idToken = (authHeader.split("Bearer ")[1] || "").trim();
  if (!idToken) {
    console.error("Empty token found in Authorization header");
    return { error: "Malformed authorization token" };
  }
  console.log("Attempting to verify token starting with:", idToken.slice(0, 10));

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);
    console.log("Token verified successfully for user:", decodedToken.uid);
    return { decodedToken };
  } catch (error: any) {
    console.error("Token verification failed:", error.code, error.message);
    return { error: "Invalid or expired authentication token" };
  }
}
