import Link from "next/link";
import { Leaf } from "lucide-react";
import { BreathingOrb } from "@/components/breathing-orb";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex flex-col justify-between p-8 md:p-12">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-medium">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage-500 text-white">
            <Leaf className="h-4 w-4" />
          </span>
          MindBloom
        </Link>
        <div className="mx-auto w-full max-w-sm">{children}</div>
        <p className="text-center text-xs text-navy-400 dark:text-white/40 md:text-left">
          Educational &amp; supportive — not a replacement for professional care.
        </p>
      </div>
      <div className="relative hidden items-center justify-center overflow-hidden bg-navy-800 md:flex">
        <div className="bg-grain absolute inset-0 opacity-20" />
        <BreathingOrb size={420} />
        <blockquote className="absolute bottom-16 left-12 right-12 font-display text-xl italic text-white/90">
          "A quiet corner of my day to check in with myself."
        </blockquote>
      </div>
    </div>
  );
}
