"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENTS } from "@/lib/assessments";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export default function AssessmentRunner() {
  const params = useParams<{ instrument: string }>();
  const router = useRouter();
  const def = ASSESSMENTS[params.instrument];

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | {
    total: number;
    severity: string;
    interpretation: string;
    suggestions: string[];
    crisisFlag: boolean;
  }>(null);

  if (!def) {
    return <p className="text-sm text-navy-400">That assessment doesn't exist.</p>;
  }

  const started = answers.length > 0 || step > 0;
  const current = def.questions[step];
  const progress = (step / def.questions.length) * 100;

  async function selectAnswer(value: number) {
    const next = [...answers];
    next[step] = value;
    setAnswers(next);

    if (step < def.questions.length - 1) {
      setStep(step + 1);
      return;
    }

    setSubmitting(true);
    const res = await fetch("/api/assessments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ instrument: def.id, answers: next }),
    });
    setSubmitting(false);
    if (res.ok) {
      const data = await res.json();
      setResult({ ...data.scored, crisisFlag: data.crisisFlag });
    } else {
      toast.error("Couldn't submit — please try again.");
    }
  }

  if (result) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <Card>
          <CardHeader>
            <Badge className="w-fit">{def.name} result</Badge>
            <CardTitle className="mt-2 text-2xl">Score: {result.total}</CardTitle>
            <CardDescription>{result.severity} range</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-navy-600 dark:text-white/70">{result.interpretation}</p>
            <div>
              <h4 className="mb-2 text-sm font-medium">Suggested next steps</h4>
              <ul className="list-inside list-disc space-y-1 text-sm text-navy-500 dark:text-white/60">
                {result.suggestions.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-navy-400">
              This is a screening result, not a diagnosis. Please share it with a licensed
              professional for a full clinical picture.
            </p>
            {result.crisisFlag && (
              <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium">If you're in danger or thinking of harming yourself</p>
                  <p className="mt-1">
                    In the US, call or text 988 (Suicide &amp; Crisis Lifeline) any time. Outside the
                    US, please reach your local emergency number or crisis line.
                  </p>
                </div>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => router.push("/dashboard/assessments")}>
                Back to assessments
              </Button>
              <Button variant="sage" onClick={() => router.push("/dashboard")}>Go to dashboard</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <Badge>{def.name}</Badge>
        <h1 className="mt-3 font-display text-2xl font-medium">{def.fullName}</h1>
        {!started && <p className="mt-2 text-sm text-navy-500 dark:text-white/60">{def.instructions}</p>}
      </div>
      <Progress value={progress} />
      <Card>
        <CardContent className="p-6">
          <p className="mb-6 font-display text-lg">{current}</p>
          <div className="space-y-2">
            {def.options.map((opt) => (
              <button
                key={opt.value}
                disabled={submitting}
                onClick={() => selectAnswer(opt.value)}
                className={cn(
                  "w-full rounded-xl border border-navy-200 px-4 py-3 text-left text-sm transition-colors hover:border-sage-400 hover:bg-sage-50 disabled:opacity-50 dark:border-white/15 dark:hover:bg-sage-500/10"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-navy-400">
        Question {step + 1} of {def.questions.length} · Your answers are private
      </p>
    </div>
  );
}
