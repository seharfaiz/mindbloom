"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ACT_WORKSHEETS } from "@/lib/act-worksheets";
import { cn } from "@/lib/utils";

type Worksheet = { id: string; type: string; data: Record<string, string>; createdAt: string };

export default function ActToolboxPage() {
  const [activeType, setActiveType] = useState(ACT_WORKSHEETS[0].type);
  const def = ACT_WORKSHEETS.find((w) => w.type === activeType)!;
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [history, setHistory] = useState<Worksheet[]>([]);
  const [saving, setSaving] = useState(false);

  async function loadHistory(type: string) {
    const res = await fetch(`/api/act?type=${type}`);
    if (res.ok) setHistory((await res.json()).worksheets);
  }

  useEffect(() => {
    setFormData({});
    loadHistory(activeType);
  }, [activeType]);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/act", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: activeType, data: formData }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success("Worksheet saved");
      setFormData({});
      loadHistory(activeType);
    } else {
      toast.error("Couldn't save your worksheet");
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">ACT toolbox</h1>
        <p className="mt-1 text-navy-500 dark:text-white/60">
          Acceptance &amp; Commitment Therapy tools — values, defusion, acceptance, and committed action.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {ACT_WORKSHEETS.map((w) => (
          <button
            key={w.type}
            onClick={() => setActiveType(w.type)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              activeType === w.type
                ? "border-sage-400 bg-sage-100 text-sage-800 dark:bg-sage-500/20 dark:text-sage-300"
                : "border-navy-200 text-navy-500 hover:bg-navy-50 dark:border-white/15 dark:text-white/60"
            )}
          >
            {w.title}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{def.title}</CardTitle>
          <CardDescription>{def.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {def.fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label>{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  placeholder={f.placeholder}
                  value={formData[f.key] ?? ""}
                  onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                />
              ) : (
                <Input
                  type={f.type === "number" ? "number" : "text"}
                  placeholder={f.placeholder}
                  value={formData[f.key] ?? ""}
                  onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                />
              )}
            </div>
          ))}
          <Button variant="sage" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save worksheet"}
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="mb-4 font-display text-xl font-medium">Saved worksheets</h2>
        {history.length === 0 ? (
          <p className="text-sm text-navy-400">No saved {def.title.toLowerCase()} entries yet.</p>
        ) : (
          <div className="space-y-4">
            {history.map((h) => (
              <Card key={h.id} className="p-5">
                <Badge variant="outline">{new Date(h.createdAt).toLocaleDateString()}</Badge>
                <dl className="mt-3 space-y-2">
                  {def.fields.map((f) =>
                    h.data[f.key] ? (
                      <div key={f.key}>
                        <dt className="text-xs font-medium text-navy-400">{f.label}</dt>
                        <dd className="text-sm text-navy-700 dark:text-white/80">{h.data[f.key]}</dd>
                      </div>
                    ) : null
                  )}
                </dl>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
