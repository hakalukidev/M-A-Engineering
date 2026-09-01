/**
 * Kept separate from session.ts so middleware.ts (Edge runtime) can import
 * just the cookie name without pulling in firebase-admin (Node-only, would
 * fail to bundle for Edge) transitively.
 */
export const SESSION_COOKIE_NAME = "ma_admin_session";
