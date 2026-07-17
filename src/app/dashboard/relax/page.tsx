"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BreathingExercise } from "@/components/dashboard/breathing-exercise";
import { MeditationTimer } from "@/components/dashboard/meditation-timer";
import { cn } from "@/lib/utils";

const GROUNDING_STEPS = [
  { sense: "5 things you can see", hint: "Look slowly around the room" },
  { sense: "4 things you can touch", hint: "Notice texture and temperature" },
  { sense: "3 things you can hear", hint: "Near and far sounds" },
  { sense: "2 things you can smell", hint: "Even faint scents count" },
  { sense: "1 thing you can taste", hint: "Or simply notice your breath" },
];

export default function RelaxPage() {
  const [pattern, setPattern] = useState<"box" | "4-7-8">("box");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Relaxation center</h1>
        <p className="mt-1 text-navy-500 dark:text-white/60">Breathing, grounding, and stillness for whenever you need it.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guided breathing</CardTitle>
          <CardDescription>Follow the orb — it grows as you inhale, shrinks as you exhale.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-center gap-2">
            {(["box", "4-7-8"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPattern(p)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium",
                  pattern === p
                    ? "border-sage-400 bg-sage-100 text-sage-800 dark:bg-sage-500/20 dark:text-sage-300"
                    : "border-navy-200 text-navy-500 dark:border-white/15 dark:text-white/60"
                )}
              >
                {p === "box" ? "Box breathing" : "4-7-8 breathing"}
              </button>
            ))}
          </div>
          <BreathingExercise pattern={pattern} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5-4-3-2-1 grounding</CardTitle>
          <CardDescription>A simple way to anchor yourself in the present moment.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {GROUNDING_STEPS.map((s) => (
            <div key={s.sense} className="rounded-xl border border-navy-100 p-4 dark:border-white/10">
              <p className="font-medium">{s.sense}</p>
              <p className="text-sm text-navy-400">{s.hint}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Progressive muscle relaxation</CardTitle>
          <CardDescription>Work through each muscle group, tensing for 5 seconds, then releasing.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-inside list-decimal space-y-2 text-sm text-navy-600 dark:text-white/70">
            <li>Feet &amp; calves — tense, hold, release</li>
            <li>Thighs &amp; glutes — tense, hold, release</li>
            <li>Stomach &amp; chest — tense, hold, release</li>
            <li>Hands &amp; arms — tense, hold, release</li>
            <li>Shoulders &amp; neck — tense, hold, release</li>
            <li>Face — scrunch, hold, release</li>
            <li>Take three slow breaths, noticing the difference</li>
          </ol>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 font-display text-xl font-medium">Meditation timer</h2>
        <MeditationTimer />
      </div>
    </div>
  );
}
