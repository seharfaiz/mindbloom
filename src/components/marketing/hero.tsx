"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BreathingOrb } from "@/components/breathing-orb";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 md:pt-24">
      <div className="bg-grain pointer-events-none absolute inset-0 opacity-40" />
      <div className="container relative grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-sage-200 bg-sage-50 px-4 py-1.5 text-xs font-medium text-sage-700 dark:border-sage-500/30 dark:bg-sage-500/10 dark:text-sage-300">
            <Sparkles className="h-3.5 w-3.5" /> A calmer way to check in with yourself
          </span>
          <h1 className="mt-6 text-balance font-display text-5xl font-medium leading-[1.05] tracking-tight text-navy-900 md:text-6xl dark:text-white">
            Understand yourself.
            <br />
            <span className="italic text-sage-600 dark:text-sage-300">Grow</span> every day.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-navy-500 dark:text-white/70">
            MindBloom pairs mood tracking, guided journaling, and evidence-informed CBT tools in one
            calm space — so small, daily check-ins turn into real self-understanding.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" variant="sage" asChild>
              <Link href="/register">
                Start your first check-in <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#how-it-works">See how it works</a>
            </Button>
          </div>
          <p className="mt-6 text-xs text-navy-400 dark:text-white/40">
            Educational &amp; supportive — not a diagnostic tool or a replacement for professional care.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="relative flex items-center justify-center"
        >
          <BreathingOrb size={380} />
          <div className="absolute rounded-3xl glass px-6 py-4 shadow-lift" style={{ top: "8%", left: "-4%" }}>
            <p className="text-xs text-navy-500 dark:text-white/60">Today's mood</p>
            <p className="font-display text-lg">Calm, hopeful 🌿</p>
          </div>
          <div className="absolute rounded-3xl glass px-6 py-4 shadow-lift" style={{ bottom: "10%", right: "-6%" }}>
            <p className="text-xs text-navy-500 dark:text-white/60">Streak</p>
            <p className="font-display text-lg">12 days breathing</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
