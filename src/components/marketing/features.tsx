"use client";
import { motion } from "framer-motion";
import { Heart, BookOpen, ListChecks, Moon, Brain, Wind, ClipboardCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  { icon: Heart, title: "Mood tracking", desc: "Log mood, energy, stress and anxiety in seconds, then watch patterns emerge over weeks and months." },
  { icon: BookOpen, title: "Gratitude journal", desc: "Guided prompts and a rich text editor make daily reflection easy to keep up." },
  { icon: ListChecks, title: "Habit tracker", desc: "Build routines with streaks, statistics, and a calendar that keeps you honest." },
  { icon: Brain, title: "CBT toolbox", desc: "Thought records, behavioral activation, and core-belief worksheets grounded in CBT." },
  { icon: ClipboardCheck, title: "Self-assessments", desc: "PHQ-9, GAD-7, and stress screenings with automatic scoring and plain-language interpretation." },
  { icon: Wind, title: "Relaxation center", desc: "Box breathing, 4-7-8 breathing, and guided grounding for the moments you need to reset." },
  { icon: Moon, title: "Sleep tracker", desc: "Log bedtime, wake time, and quality to see how sleep and mood move together." },
  { icon: Sparkles, title: "AI wellness coach", desc: "A supportive, CBT-informed chat that reflects with you — never diagnoses, never prescribes." },
];

export function Features() {
  return (
    <section id="features" className="container py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance font-display text-4xl font-medium tracking-tight md:text-5xl">
          Everything you need for a daily practice
        </h2>
        <p className="mt-4 text-navy-500 dark:text-white/60">
          Eight tools, one calm home. Use what helps today; the rest is there when you need it.
        </p>
      </div>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
          >
            <Card className="h-full p-6 transition-transform hover:-translate-y-1">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-sage-700 dark:bg-sage-500/15 dark:text-sage-300">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-medium">{f.title}</h3>
              <p className="mt-2 text-sm text-navy-500 dark:text-white/60">{f.desc}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
