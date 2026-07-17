"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { signOut } from "next-auth/react";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/mood", label: "Mood tracker" },
  { href: "/dashboard/habits", label: "Habits" },
  { href: "/dashboard/journal", label: "Journal" },
  { href: "/dashboard/sleep", label: "Sleep" },
  { href: "/dashboard/assessments", label: "Assessments" },
  { href: "/dashboard/cbt", label: "CBT toolbox" },
  { href: "/dashboard/relax", label: "Relaxation center" },
  { href: "/dashboard/coach", label: "AI coach" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function MobileTopbar() {
  const [open, setOpen] = useState(false);
  return (
    <div className="sticky top-0 z-40 flex items-center justify-between border-b border-navy-100 bg-white/90 px-4 py-3 backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-canvas-dark/90">
      <Link href="/" className="flex items-center gap-2 font-display font-medium">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage-500 text-white">
          <Leaf className="h-3.5 w-3.5" />
        </span>
        MindBloom
      </Link>
      <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full max-h-[70vh] overflow-y-auto border-b border-navy-100 bg-white p-4 shadow-lift dark:border-white/10 dark:bg-canvas-dark">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-navy-600 hover:bg-navy-50 dark:text-white/70 dark:hover:bg-white/5">
                {l.label}
              </Link>
            ))}
            <button onClick={() => signOut({ callbackUrl: "/" })} className="mt-1 rounded-lg px-3 py-2 text-left text-sm text-navy-600 hover:bg-navy-50 dark:text-white/70 dark:hover:bg-white/5">
              Sign out
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
