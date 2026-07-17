"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Settings = {
  theme: string;
  moodReminder: boolean;
  habitReminder: boolean;
  journalReminder: boolean;
  sleepReminder: boolean;
  assessmentReminder: boolean;
  reminderHour: number;
};

const REMINDER_KEYS: { key: keyof Settings; label: string }[] = [
  { key: "moodReminder", label: "Mood check-in reminder" },
  { key: "habitReminder", label: "Habit reminder" },
  { key: "journalReminder", label: "Journal reminder" },
  { key: "sleepReminder", label: "Sleep log reminder" },
  { key: "assessmentReminder", label: "Assessment reminder" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => setSettings(d.settings));
  }, []);

  async function update(patch: Partial<Settings>) {
    setSettings((s) => (s ? { ...s, ...patch } : s));
    const res = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    if (res.ok) toast.success("Settings updated");
    else toast.error("Couldn't update settings");
  }

  return (
    <div className="max-w-xl space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Settings</h1>
        <p className="mt-1 text-navy-500 dark:text-white/60">Tune MindBloom to how you want to use it.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Choose light, dark, or match your system.</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2">
          {["light", "dark", "system"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm capitalize",
                theme === t
                  ? "border-sage-400 bg-sage-100 text-sage-800 dark:bg-sage-500/20 dark:text-sage-300"
                  : "border-navy-200 text-navy-500 dark:border-white/15 dark:text-white/60"
              )}
            >
              {t}
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Choose what MindBloom reminds you about.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!settings ? (
            <p className="text-sm text-navy-400">Loading…</p>
          ) : (
            REMINDER_KEYS.map((r) => (
              <label key={r.key} className="flex items-center justify-between text-sm">
                {r.label}
                <input
                  type="checkbox"
                  checked={settings[r.key] as boolean}
                  onChange={(e) => update({ [r.key]: e.target.checked } as Partial<Settings>)}
                  className="h-5 w-5 accent-sage-500"
                />
              </label>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
