"use client";
import { useEffect, useRef, useState } from "react";
import { BreathingOrb } from "@/components/breathing-orb";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Phase = { label: string; seconds: number };

const PATTERNS: Record<string, Phase[]> = {
  box: [
    { label: "Breathe in", seconds: 4 },
    { label: "Hold", seconds: 4 },
    { label: "Breathe out", seconds: 4 },
    { label: "Hold", seconds: 4 },
  ],
  "4-7-8": [
    { label: "Breathe in", seconds: 4 },
    { label: "Hold", seconds: 7 },
    { label: "Breathe out", seconds: 8 },
  ],
};

export function BreathingExercise({ pattern }: { pattern: "box" | "4-7-8" }) {
  const phases = PATTERNS[pattern];
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0].seconds);
  const [cycles, setCycles] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const phaseIdxRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s > 1) return s - 1;
        const next = (phaseIdxRef.current + 1) % phases.length;
        phaseIdxRef.current = next;
        setPhaseIdx(next);
        if (next === 0) setCycles((c) => c + 1);
        return phases[next].seconds;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function start() {
    phaseIdxRef.current = 0;
    setPhaseIdx(0);
    setSecondsLeft(phases[0].seconds);
    setCycles(0);
    setRunning(true);
  }
  function stop() {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  const scale = phases[phaseIdx].label === "Breathe in" ? 1.25 : phases[phaseIdx].label === "Breathe out" ? 0.8 : 1.05;

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="relative flex items-center justify-center">
        <div
          className="transition-transform duration-[1000ms] ease-in-out"
          style={{ transform: running ? `scale(${scale})` : "scale(1)" }}
        >
          <BreathingOrb size={220} paused={!running} />
        </div>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-2xl">{running ? phases[phaseIdx].label : "Ready"}</span>
          {running && <span className="font-mono text-sm text-navy-500 dark:text-white/60">{secondsLeft}s</span>}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {!running ? (
          <Button variant="sage" onClick={start}>Start</Button>
        ) : (
          <Button variant="outline" onClick={stop}>Stop</Button>
        )}
        <span className="text-sm text-navy-400">{cycles} cycle{cycles === 1 ? "" : "s"} completed</span>
      </div>
    </div>
  );
}
