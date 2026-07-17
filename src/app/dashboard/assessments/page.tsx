import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ASSESSMENTS } from "@/lib/assessments";
import { Clock, ShieldCheck } from "lucide-react";

const categories = ["Mood & Anxiety", "Stress & Burnout"];

export default function AssessmentsHub() {
  const defs = Object.values(ASSESSMENTS);
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Self-assessments</h1>
        <p className="mt-1 max-w-2xl text-navy-500 dark:text-white/60">
          Evidence-informed screening tools with automatic scoring. These are screening
          instruments, not diagnoses — please discuss results with a licensed professional.
        </p>
      </div>

      {categories.map((cat) => {
        const items = defs.filter((d) => d.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <h2 className="mb-4 font-display text-xl font-medium">{cat}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((d) => (
                <Link key={d.id} href={`/dashboard/assessments/${d.id}`}>
                  <Card className="h-full p-6 transition-transform hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <Badge>{d.name}</Badge>
                      <span className="flex items-center gap-1 text-xs text-navy-400">
                        <Clock className="h-3.5 w-3.5" /> {d.estimatedMinutes} min
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-medium">{d.fullName}</h3>
                    <p className="mt-2 text-sm text-navy-500 dark:text-white/60">{d.description}</p>
                    <p className="mt-4 flex items-center gap-1 text-xs text-navy-400">
                      <ShieldCheck className="h-3.5 w-3.5" /> Private — visible only to you
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
