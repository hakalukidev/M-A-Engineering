import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

/**
 * Browser-side Firebase client SDK init. This app uses it for exactly one
 * thing: signInWithEmailAndPassword on /admin/login. Every other Firebase
 * read/write goes through the Admin SDK server-side (see ./admin.ts) — no
 * Firestore access happens from the client.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps()[0] ?? initializeApp(firebaseConfig);

export const auth = getAuth(app);
