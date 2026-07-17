"use client";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div>
        <h1 className="font-display text-3xl font-medium">Check your email</h1>
        <p className="mt-2 text-sm text-navy-500 dark:text-white/60">
          If an account exists for {email}, a reset link is on its way. It expires in 30 minutes.
        </p>
        <Button variant="outline" className="mt-6 w-full" asChild>
          <Link href="/login">Back to log in</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Reset your password</h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-white/60">
        Enter the email on your account and we'll send you a reset link.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <Button type="submit" variant="sage" className="w-full" disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-navy-500 dark:text-white/60">
        <Link href="/login" className="font-medium text-sage-600 hover:underline dark:text-sage-300">
          Back to log in
        </Link>
      </p>
    </div>
  );
}
