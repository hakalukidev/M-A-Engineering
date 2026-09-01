"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { LogIn, Lock, Mail } from "lucide-react";
import { auth } from "@/lib/firebase/client";
import { siteConfig } from "@/config/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await credential.user.getIdToken();
      const res = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
      if (!res.ok) throw new Error("Not authorized");
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Invalid email/password, or this account isn't the admin account.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-green-dark px-4">
      <div className="w-full max-w-sm rounded-md bg-white p-8 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-green">
          {siteConfig.name}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-brand-ink">Admin Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted">
              <Mail size={16} />
            </span>
            <input
              type="email"
              required
              autoComplete="username"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-zinc-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-brand-ink outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
            />
          </div>
          <div className="relative">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted">
              <Lock size={16} />
            </span>
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-zinc-300 bg-white py-2.5 pl-10 pr-3.5 text-sm text-brand-ink outline-none transition-colors focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-dark disabled:opacity-60"
          >
            <LogIn size={16} />
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
