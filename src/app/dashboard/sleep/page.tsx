"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatMinutes } from "@/lib/utils";

type SleepLog = { id: string; date: string; durationMin: number; quality: number };

export default function SleepPage() {
  const [bedTime, setBedTime] = useState("");
  const [wakeTime, setWakeTime] = useState("");
  const [quality, setQuality] = useState(3);
  const [logs, setLogs] = useState<SleepLog[]>([]);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/sleep");
    if (res.ok) setLogs((await res.json()).logs);
  }
  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!bedTime || !wakeTime) {
      toast.error("Add both a bedtime and a wake time");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/sleep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bedTime, wakeTime, quality }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Sleep logged");
      load();
    } else {
      toast.error("Couldn't save that log");
    }
  }

  const avgDuration = logs.length ? Math.round(logs.reduce((a, l) => a + l.durationMin, 0) / logs.length) : 0;
  const avgQuality = logs.length ? (logs.reduce((a, l) => a + l.quality, 0) / logs.length).toFixed(1) : "—";

  const chartData = [...logs]
    .reverse()
    .map((l) => ({ date: new Date(l.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }), Hours: +(l.durationMin / 60).toFixed(1) }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Sleep tracker</h1>
        <p className="mt-1 text-navy-500 dark:text-white/60">Log last night, and see how sleep tracks with your mood.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card><CardContent className="p-6"><p className="text-sm text-navy-500 dark:text-white/60">Average duration</p><p className="mt-1 font-display text-3xl">{avgDuration ? formatMinutes(avgDuration) : "—"}</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-navy-500 dark:text-white/60">Average quality</p><p className="mt-1 font-display text-3xl">{avgQuality}/5</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log last night</CardTitle>
          <CardDescription>We'll calculate your total sleep time automatically.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Bedtime</Label>
              <Input type="datetime-local" value={bedTime} onChange={(e) => setBedTime(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Wake time</Label>
              <Input type="datetime-local" value={wakeTime} onChange={(e) => setWakeTime(e.target.value)} />
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between text-sm"><Label>Sleep quality</Label><span className="text-navy-400">{quality}/5</span></div>
            <input type="range" min={1} max={5} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full accent-sage-500" />
          </div>
          <Button variant="sage" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save sleep log"}</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Recent nights</CardTitle></CardHeader>
        <CardContent>
          {chartData.length === 0 ? (
            <p className="text-sm text-navy-400">Log a night's sleep to see your chart.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e6ede0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="Hours" fill="#8da47e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
