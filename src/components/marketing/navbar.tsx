"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-navy-100/60 bg-canvas-light/80 backdrop-blur-xl dark:border-white/10 dark:bg-canvas-dark/80">
      <div className="container flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-medium">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-white">
            <Leaf className="h-4 w-4" />
          </span>
          MindBloom
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-navy-600 transition-colors hover:text-navy-900 dark:text-white/70 dark:hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log in</Link>
          </Button>
          <Button variant="sage" size="sm" asChild>
            <Link href="/register">Start free</Link>
          </Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-navy-100 px-6 py-4 md:hidden dark:border-white/10">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-navy-600 dark:text-white/70">
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="outline" asChild><Link href="/login">Log in</Link></Button>
              <Button variant="sage" asChild><Link href="/register">Start free</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
