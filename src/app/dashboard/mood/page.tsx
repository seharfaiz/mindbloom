"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type MoodEntry = {
  id: string;
  mood: number;
  energy: number;
  stress: number;
  anxiety: number;
  entryDate: string;
};

const SCALES = [
  { key: "mood", label: "Mood", low: "Very low", high: "Great" },
  { key: "energy", label: "Energy", low: "Depleted", high: "Energized" },
  { key: "stress", label: "Stress", low: "Calm", high: "Overwhelmed" },
  { key: "anxiety", label: "Anxiety", low: "At ease", high: "Very anxious" },
] as const;

const EMOTIONS = ["Calm", "Hopeful", "Anxious", "Grateful", "Sad", "Irritable", "Content", "Lonely", "Excited", "Tired"];

export default function MoodPage() {
  const [values, setValues] = useState({ mood: 3, energy: 3, stress: 3, anxiety: 3 });
  const [emotions, setEmotions] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/mood?days=30");
    if (res.ok) {
      const data = await res.json();
      setEntries(data.entries);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/mood", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, emotions, triggers: [], notes: notes || undefined }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Check-in saved");
      setNotes("");
      setEmotions([]);
      load();
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Couldn't save your check-in");
    }
  }

  const chartData = entries.map((e) => ({
    date: new Date(e.entryDate).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    Mood: e.mood,
    Stress: e.stress,
    Anxiety: e.anxiety,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Mood tracker</h1>
        <p className="mt-1 text-navy-500 dark:text-white/60">A 30-second check-in, whenever you need one.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's check-in</CardTitle>
          <CardDescription>Slide each scale to where you're at right now.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {SCALES.map((s) => (
            <div key={s.key}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <Label>{s.label}</Label>
                <span className="text-navy-400">{values[s.key]}/5</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={values[s.key]}
                onChange={(e) => setValues((v) => ({ ...v, [s.key]: Number(e.target.value) }))}
                className="w-full accent-sage-500"
              />
              <div className="flex justify-between text-xs text-navy-400">
                <span>{s.low}</span>
                <span>{s.high}</span>
              </div>
            </div>
          ))}

          <div>
            <Label className="mb-2 block">What are you feeling? (optional)</Label>
            <div className="flex flex-wrap gap-2">
              {EMOTIONS.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setEmotions((cur) => (cur.includes(em) ? cur.filter((e) => e !== em) : [...cur, em]))}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    emotions.includes(em)
                      ? "border-sage-400 bg-sage-100 text-sage-800 dark:bg-sage-500/20 dark:text-sage-300"
                      : "border-navy-200 text-navy-500 hover:bg-navy-50 dark:border-white/15 dark:text-white/60"
                  )}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="notes" className="mb-2 block">Notes (optional)</Label>
            <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything on your mind…" />
          </div>

          <Button variant="sage" onClick={handleSave} disabled={saving}>
            {saving ? "Saving…" : "Save check-in"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Last 30 days</CardTitle>
          <CardDescription>Mood, stress, and anxiety over time.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-sm text-navy-400">Loading…</p>
          ) : chartData.length === 0 ? (
            <p className="text-sm text-navy-400">Log your first check-in to start seeing trends here.</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6ede0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis domain={[1, 5]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="Mood" stroke="#6f8a62" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Stress" stroke="#c1a670" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Anxiety" stroke="#354f68" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
