"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      toast.error("This reset link is missing its token.");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      toast.error(data.error ?? "Something went wrong.");
      return;
    }
    toast.success("Password updated — please log in.");
    router.push("/login");
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Set a new password</h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-white/60">Choose a new password for your account.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="password">New password</Label>
          <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 8 characters" />
        </div>
        <Button type="submit" variant="sage" className="w-full" disabled={loading}>
          {loading ? "Updating…" : "Update password"}
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
