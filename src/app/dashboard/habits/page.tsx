"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Flame, Trash2, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, startOfDay } from "@/lib/utils";

type HabitLog = { date: string; completed: boolean };
type Habit = { id: string; name: string; color: string; logs: HabitLog[] };

function computeStreak(logs: HabitLog[]): number {
  const dates = new Set(logs.map((l) => startOfDay(new Date(l.date)).toDateString()));
  let streak = 0;
  const cursor = startOfDay(new Date());
  while (dates.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/habits");
    if (res.ok) setHabits((await res.json()).habits);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function addHabit() {
    if (!name.trim()) return;
    setAdding(true);
    const res = await fetch("/api/habits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setAdding(false);
    if (res.ok) {
      setName("");
      toast.success("Habit created");
      load();
    } else {
      toast.error("Couldn't create that habit");
    }
  }

  async function toggleToday(id: string) {
    const res = await fetch(`/api/habits/${id}`, { method: "POST" });
    if (res.ok) load();
  }

  async function removeHabit(id: string) {
    const res = await fetch(`/api/habits/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Habit archived");
      load();
    }
  }

  const todayStr = startOfDay(new Date()).toDateString();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Habits</h1>
        <p className="mt-1 text-navy-500 dark:text-white/60">Small routines, tracked honestly.</p>
      </div>

      <Card>
        <CardContent className="flex gap-3 p-4">
          <Input
            placeholder="e.g. 10 minute walk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addHabit()}
          />
          <Button variant="sage" onClick={addHabit} disabled={adding}>
            <Plus className="h-4 w-4" /> Add habit
          </Button>
        </CardContent>
      </Card>

      {loading ? (
        <p className="text-sm text-navy-400">Loading…</p>
      ) : habits.length === 0 ? (
        <p className="text-sm text-navy-400">No habits yet — add your first one above.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map((h) => {
            const doneToday = h.logs.some((l) => startOfDay(new Date(l.date)).toDateString() === todayStr);
            const streak = computeStreak(h.logs);
            return (
              <Card key={h.id} className="p-5">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{h.name}</CardTitle>
                  <button onClick={() => removeHabit(h.id)} aria-label="Archive habit" className="text-navy-300 hover:text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-sm text-navy-500 dark:text-white/60">
                    <Flame className="h-4 w-4 text-beige-500" /> {streak} day{streak === 1 ? "" : "s"}
                  </span>
                  <button
                    onClick={() => toggleToday(h.id)}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
                      doneToday
                        ? "border-sage-500 bg-sage-500 text-white"
                        : "border-navy-200 text-navy-300 hover:border-sage-400 dark:border-white/20"
                    )}
                    aria-label="Mark done today"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
