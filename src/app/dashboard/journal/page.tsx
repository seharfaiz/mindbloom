"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PROMPTS = [
  "What's one small thing that went right today?",
  "Who made your day a little easier, and how?",
  "What's something you're looking forward to?",
  "What's a challenge you handled better than you expected?",
  "What did your body need today, and did you give it that?",
];

type Entry = { id: string; title: string | null; content: string; gratitude: string[]; entryDate: string };

export default function JournalPage() {
  const [prompt] = useState(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [gratitude, setGratitude] = useState(["", "", ""]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [saving, setSaving] = useState(false);

  async function load() {
    const res = await fetch("/api/journal");
    if (res.ok) setEntries((await res.json()).entries);
  }
  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!content.trim()) {
      toast.error("Write a little something first");
      return;
    }
    setSaving(true);
    const res = await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title || undefined,
        content,
        gratitude: gratitude.filter(Boolean),
        prompt,
      }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Entry saved");
      setTitle("");
      setContent("");
      setGratitude(["", "", ""]);
      load();
    } else {
      toast.error("Couldn't save your entry");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Gratitude journal</h1>
        <p className="mt-1 text-navy-500 dark:text-white/60">Today's prompt: {prompt}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New entry</CardTitle>
          <CardDescription>Free-write, or answer the prompt above.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} />
          <Textarea
            placeholder="Write freely…"
            className="min-h-[180px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div>
            <Label className="mb-2 block">Three things you're grateful for</Label>
            <div className="grid gap-2 sm:grid-cols-3">
              {gratitude.map((g, i) => (
                <Input
                  key={i}
                  placeholder={`Gratitude ${i + 1}`}
                  value={g}
                  onChange={(e) => {
                    const next = [...gratitude];
                    next[i] = e.target.value;
                    setGratitude(next);
                  }}
                />
              ))}
            </div>
          </div>
          <Button variant="sage" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save entry"}
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 font-display text-xl font-medium">Past entries</h2>
        <div className="space-y-4">
          {entries.length === 0 && <p className="text-sm text-navy-400">No entries yet.</p>}
          {entries.map((e) => (
            <Card key={e.id} className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-medium">{e.title || "Untitled"}</h3>
                <span className="text-xs text-navy-400">{new Date(e.entryDate).toLocaleDateString()}</span>
              </div>
              <p className="mt-2 whitespace-pre-wrap text-sm text-navy-600 dark:text-white/70">{e.content}</p>
              {e.gratitude.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {e.gratitude.map((g, i) => (
                    <li key={i} className="rounded-full bg-sage-50 px-3 py-1 text-xs text-sage-700 dark:bg-sage-500/10 dark:text-sage-300">
                      {g}
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
