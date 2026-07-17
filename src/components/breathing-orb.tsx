"use client";
import { cn } from "@/lib/utils";

export function BreathingOrb({
  className,
  size = 320,
  paused = false,
}: {
  className?: string;
  size?: number;
  paused?: boolean;
}) {
  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br from-sage-200 via-sage-300 to-beige-300 blur-2xl opacity-70",
          !paused && "animate-breathe"
        )}
      />
      <div
        className={cn(
          "absolute inset-[15%] rounded-full bg-gradient-to-tr from-sage-300 via-sage-200 to-beige-200 blur-xl opacity-80",
          !paused && "animate-breathe"
        )}
        style={{ animationDelay: "-2s" }}
      />
      <div
        className={cn(
          "absolute inset-[32%] rounded-full bg-white/70 backdrop-blur-md shadow-glow",
          !paused && "animate-breathe"
        )}
        style={{ animationDelay: "-4s" }}
      />
    </div>
  );
}
