"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Heart,
  ListChecks,
  BookOpen,
  Moon,
  ClipboardCheck,
  Brain,
  Wind,
  Sparkles,
  Settings,
  LogOut,
  Leaf,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/mood", label: "Mood tracker", icon: Heart },
  { href: "/dashboard/habits", label: "Habits", icon: ListChecks },
  { href: "/dashboard/journal", label: "Gratitude journal", icon: BookOpen },
  { href: "/dashboard/sleep", label: "Sleep", icon: Moon },
  { href: "/dashboard/assessments", label: "Assessments", icon: ClipboardCheck },
  { href: "/dashboard/cbt", label: "CBT toolbox", icon: Brain },
  { href: "/dashboard/relax", label: "Relaxation center", icon: Wind },
  { href: "/dashboard/coach", label: "AI wellness coach", icon: Sparkles },
];

export function Sidebar({ name }: { name?: string | null }) {
  const pathname = usePathname();
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-navy-100 bg-white/80 backdrop-blur-xl md:flex dark:border-white/10 dark:bg-canvas-dark/80">
      <Link href="/" className="flex items-center gap-2 px-6 py-6 font-display text-lg font-medium">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-white">
          <Leaf className="h-4 w-4" />
        </span>
        MindBloom
      </Link>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-sage-100 text-sage-800 dark:bg-sage-500/15 dark:text-sage-300"
                  : "text-navy-500 hover:bg-navy-50 hover:text-navy-800 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="space-y-1 border-t border-navy-100 p-3 dark:border-white/10">
        <Link href="/dashboard/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-500 hover:bg-navy-50 dark:text-white/60 dark:hover:bg-white/5">
          <Settings className="h-4 w-4" /> Settings
        </Link>
        <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-navy-500 hover:bg-navy-50 dark:text-white/60 dark:hover:bg-white/5">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
        {name && <p className="px-3 pt-2 text-xs text-navy-400 dark:text-white/40">Signed in as {name}</p>}
      </div>
    </aside>
  );
}
