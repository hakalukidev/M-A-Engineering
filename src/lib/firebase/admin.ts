import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Server-only Firebase Admin SDK init. Never import this from a "use client"
 * file — it reads server-only env vars and has full, rule-bypassing access
 * to Firestore/Auth.
 */
function getAdminApp(): App {
  const existing = getApps()[0];
  if (existing) return existing;

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Missing Firebase Admin env vars (FIREBASE_ADMIN_PROJECT_ID / FIREBASE_ADMIN_CLIENT_EMAIL / FIREBASE_ADMIN_PRIVATE_KEY)"
    );
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

/**
 * Wraps a lazily-created SDK instance so importing this module never runs
 * `factory()` (and therefore never reads the env vars) until a caller
 * actually touches a property at request time. Next.js's production build
 * imports every route module during page-data collection just to inspect
 * its exports, which would otherwise crash the build in environments where
 * these env vars aren't set until deploy.
 *
 * Property access is forwarded to the real instance via `Reflect`, and any
 * function is bound back to it, so methods relying on internal/private
 * state work exactly as if `adminAuth`/`adminDb` were the real object.
 */
function lazy<T extends object>(factory: () => T): T {
  let cached: T | undefined;
  const getInstance = () => (cached ??= factory());

  return new Proxy({} as T, {
    get(_target, prop, _receiver) {
      const instance = getInstance();
      const value = Reflect.get(instance as object, prop, instance);
      return typeof value === "function" ? value.bind(instance) : value;
    },
    has(_target, prop) {
      return Reflect.has(getInstance() as object, prop);
    },
  });
}

export const adminAuth: Auth = lazy(() => getAuth(getAdminApp()));
export const adminDb: Firestore = lazy(() => getFirestore(getAdminApp()));
