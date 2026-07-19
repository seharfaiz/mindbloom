"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
    setLoading(false);
    if (res?.error) {
      toast.error("Couldn't sign you in. Check your email and password.");
      return;
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Welcome back</h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-white/60">Log in to continue your practice.</p>

      <Button
        variant="outline"
        className="mt-8 w-full"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Continue with Google
      </Button>

      <div className="my-6 flex items-center gap-3 text-xs text-navy-400">
        <div className="h-px flex-1 bg-navy-100 dark:bg-white/10" /> or <div className="h-px flex-1 bg-navy-100 dark:bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link href="/forgot-password" className="text-xs text-sage-600 hover:underline dark:text-sage-300">
              Forgot password?
            </Link>
          </div>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Button type="submit" variant="sage" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Log in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-500 dark:text-white/60">
        New to MindBloom?{" "}
        <Link href="/register" className="font-medium text-sage-600 hover:underline dark:text-sage-300">
          Create an account
        </Link>
      </p>
    </div>
  );
}
