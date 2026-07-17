import Link from "next/link";
import { Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white dark:border-white/10 dark:bg-canvas-dark">
      <div className="container grid gap-10 py-16 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-medium">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-white">
              <Leaf className="h-4 w-4" />
            </span>
            MindBloom
          </div>
          <p className="mt-3 max-w-xs text-sm text-navy-500 dark:text-white/60">
            Understand yourself. Grow every day.
          </p>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-navy-800 dark:text-white">Product</h4>
          <ul className="space-y-2 text-sm text-navy-500 dark:text-white/60">
            <li><a href="#features">Features</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-navy-800 dark:text-white">Company</h4>
          <ul className="space-y-2 text-sm text-navy-500 dark:text-white/60">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-sm font-medium text-navy-800 dark:text-white">A note on care</h4>
          <p className="text-sm text-navy-500 dark:text-white/60">
            MindBloom is educational and supportive. It does not diagnose conditions or replace
            professional mental health care. If you're in crisis, call or text 988 (US) any time.
          </p>
        </div>
      </div>
      <div className="border-t border-navy-100 py-6 text-center text-xs text-navy-400 dark:border-white/10">
        © {new Date().getFullYear()} MindBloom. All rights reserved.
      </div>
    </footer>
  );
}
