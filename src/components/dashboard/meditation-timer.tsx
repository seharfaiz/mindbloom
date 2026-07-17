"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

const DURATIONS = [1, 3, 5, 10, 15];
const SOUNDS = [
  { id: "none", label: "Silence" },
  { id: "rain", label: "Rain (generated)" },
  { id: "white", label: "White noise" },
];

export function MeditationTimer() {
  const [minutes, setMinutes] = useState(5);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const [sound, setSound] = useState("none");
  const audioCtxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ src?: AudioBufferSourceNode; gain?: GainNode; filter?: BiquadFilterNode }>({});

  useEffect(() => {
    setSecondsLeft(minutes * 60);
  }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(id);
          setRunning(false);
          stopSound();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  function stopSound() {
    nodesRef.current.src?.stop();
    nodesRef.current = {};
  }

  function playSound(kind: string) {
    stopSound();
    if (kind === "none") return;
    const ctx = audioCtxRef.current ?? new (window.AudioContext || (window as any).webkitAudioContext)();
    audioCtxRef.current = ctx;

    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = kind === "rain" ? "highpass" : "lowpass";
    filter.frequency.value = kind === "rain" ? 1000 : 4000;

    const gain = ctx.createGain();
    gain.gain.value = 0.06;

    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    nodesRef.current = { src, gain, filter };
  }

  function toggleRun() {
    if (running) {
      setRunning(false);
      stopSound();
    } else {
      setRunning(true);
      playSound(sound);
    }
  }

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-6 p-8">
        <p className="font-mono text-5xl tabular-nums">{mm}:{ss}</p>
        <div className="flex flex-wrap justify-center gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => !running && setMinutes(d)}
              className={`rounded-full border px-3 py-1.5 text-sm ${minutes === d ? "border-sage-400 bg-sage-100 text-sage-800 dark:bg-sage-500/20 dark:text-sage-300" : "border-navy-200 text-navy-500 dark:border-white/15 dark:text-white/60"}`}
            >
              {d} min
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {sound === "none" ? <VolumeX className="h-4 w-4 text-navy-400" /> : <Volume2 className="h-4 w-4 text-sage-500" />}
          <select
            value={sound}
            onChange={(e) => {
              setSound(e.target.value);
              if (running) playSound(e.target.value);
            }}
            className="rounded-lg border border-navy-200 bg-white px-3 py-1.5 text-sm dark:border-white/15 dark:bg-white/5"
          >
            {SOUNDS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
        <Button variant="sage" size="lg" onClick={toggleRun}>
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? "Pause" : "Start meditation"}
        </Button>
      </CardContent>
    </Card>
  );
}
