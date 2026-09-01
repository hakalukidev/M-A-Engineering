"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Eye, EyeOff, LogIn, Lock, Mail, ShieldCheck } from "lucide-react";
import { auth } from "@/lib/firebase/client";
import { siteConfig } from "@/config/site";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Full-bleed background — restaurant cooking equipment */}
      <Image
        src="/images/categories/restaurant-equipment/cooking-ranges/cover.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-brand-green-dark/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />

      {/* Centered login card */}
      <div className="relative w-full max-w-sm rounded-md bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-brand-green">
          <ShieldCheck size={13} />
          {siteConfig.name} &middot; Admin access only
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-brand-ink">Admin Login</h1>
        <p className="mt-2 text-sm text-brand-muted">Sign in with your admin account to continue.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
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
                className="w-full rounded-md border border-zinc-300 bg-white py-3 pl-10 pr-3.5 text-sm text-brand-ink outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
              />
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted">
                <Lock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-zinc-300 bg-white py-3 pl-10 pr-10 text-sm text-brand-ink outline-none transition-colors placeholder:text-zinc-400 focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-ink"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-green py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-green-dark disabled:opacity-60"
            >
              <LogIn size={16} />
              {submitting ? "Signing in..." : "Sign in"}
            </button>
        </form>
      </div>
    </div>
  );
}
