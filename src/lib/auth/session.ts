import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebase/admin";
import { SESSION_COOKIE_NAME } from "@/lib/auth/constants";

export { SESSION_COOKIE_NAME };
const SESSION_EXPIRES_IN_MS = 5 * 24 * 60 * 60 * 1000; // 5 days

/** Verifies a Firebase ID token and mints a session cookie value + its maxAge. */
export async function createSessionCookie(idToken: string) {
  const decoded = await adminAuth.verifyIdToken(idToken);
  if (decoded.email !== process.env.ADMIN_EMAIL) {
    throw new Error("Not the admin account");
  }
  const cookie = await adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_EXPIRES_IN_MS });
  return { cookie, maxAge: SESSION_EXPIRES_IN_MS / 1000 };
}

/**
 * Authoritative admin check — verifies the session cookie against Firebase
 * Admin SDK and the ADMIN_EMAIL allowlist. Returns null if not a valid
 * admin session; never throws for an absent/invalid cookie.
 */
export async function verifySession(): Promise<{ uid: string; email: string } | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    if (!decoded.email || decoded.email !== process.env.ADMIN_EMAIL) return null;
    return { uid: decoded.uid, email: decoded.email };
  } catch {
    return null;
  }
}

/** Call at the top of every protected layout AND every Server Action — redirects if not an admin. */
export async function requireAdmin() {
  const session = await verifySession();
  if (!session) redirect("/admin/login");
  return session;
}
