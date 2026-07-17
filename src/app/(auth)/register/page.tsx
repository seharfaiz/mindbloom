"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong.");
        setLoading(false);
        return;
      }
      const signInRes = await signIn("credentials", { ...form, redirect: false });
      setLoading(false);
      if (signInRes?.error) {
        toast.success("Account created — please log in.");
        router.push("/login");
        return;
      }
      toast.success("Welcome to MindBloom 🌿");
      router.push("/dashboard");
    } catch {
      setLoading(false);
      toast.error("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-medium">Create your account</h1>
      <p className="mt-2 text-sm text-navy-500 dark:text-white/60">Free forever. No credit card needed.</p>

      <Button variant="outline" className="mt-8 w-full" onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
        Continue with Google
      </Button>

      <div className="my-6 flex items-center gap-3 text-xs text-navy-400">
        <div className="h-px flex-1 bg-navy-100 dark:bg-white/10" /> or <div className="h-px flex-1 bg-navy-100 dark:bg-white/10" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Jamie Rivera" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required minLength={8} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 8 characters" />
        </div>
        <Button type="submit" variant="sage" className="w-full" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-navy-500 dark:text-white/60">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-sage-600 hover:underline dark:text-sage-300">
          Log in
        </Link>
      </p>
    </div>
  );
}
