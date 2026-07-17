import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { daysAgo } from "@/lib/utils";
import { Heart, ListChecks, BookOpen, ClipboardCheck, ArrowRight } from "lucide-react";

const QUOTES = [
  "Small steps, taken daily, become a different life.",
  "You don't have to see the whole staircase, just the next step.",
  "Rest is productive too.",
  "Notice one good thing before you notice the rest.",
  "Progress isn't a straight line, and that's alright.",
];

export default async function DashboardOverview() {
  const session = await getServerSession(authOptions);
  const userId = (session!.user as { id: string }).id;
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  const since = daysAgo(7);
  const [moodEntries, habits, journalCount, latestAssessment] = await Promise.all([
    prisma.moodEntry.findMany({ where: { userId, entryDate: { gte: since } }, orderBy: { entryDate: "asc" } }),
    prisma.habit.findMany({ where: { userId, archived: false }, include: { logs: { take: 30, orderBy: { date: "desc" } } } }),
    prisma.journalEntry.count({ where: { userId } }),
    prisma.assessmentResult.findFirst({ where: { userId }, orderBy: { createdAt: "desc" } }),
  ]);

  const avgMood = moodEntries.length
    ? (moodEntries.reduce((a, e) => a + e.mood, 0) / moodEntries.length).toFixed(1)
    : "—";

  const quote = QUOTES[new Date().getDate() % QUOTES.length];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-medium">Welcome back, {firstName}</h1>
        <p className="mt-1 italic text-navy-500 dark:text-white/60">"{quote}"</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <Heart className="h-5 w-5 text-sage-500" />
            <p className="mt-3 text-sm text-navy-500 dark:text-white/60">7-day avg mood</p>
            <p className="font-display text-3xl">{avgMood}<span className="text-base text-navy-400">/5</span></p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <ListChecks className="h-5 w-5 text-sage-500" />
            <p className="mt-3 text-sm text-navy-500 dark:text-white/60">Active habits</p>
            <p className="font-display text-3xl">{habits.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <BookOpen className="h-5 w-5 text-sage-500" />
            <p className="mt-3 text-sm text-navy-500 dark:text-white/60">Journal entries</p>
            <p className="font-display text-3xl">{journalCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <ClipboardCheck className="h-5 w-5 text-sage-500" />
            <p className="mt-3 text-sm text-navy-500 dark:text-white/60">Latest assessment</p>
            <p className="font-display text-xl">{latestAssessment ? `${latestAssessment.instrument} — ${latestAssessment.severity}` : "None yet"}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today's suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {moodEntries.length === 0 && (
              <SuggestionRow href="/dashboard/mood" label="Log your first mood check-in" />
            )}
            {habits.length === 0 && <SuggestionRow href="/dashboard/habits" label="Create your first habit" />}
            <SuggestionRow href="/dashboard/relax" label="Take 5 minutes to breathe" />
            <SuggestionRow href="/dashboard/journal" label="Write today's gratitude entry" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Habits today</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {habits.length === 0 ? (
              <p className="text-sm text-navy-400">No habits yet.</p>
            ) : (
              habits.slice(0, 5).map((h) => (
                <div key={h.id} className="flex items-center justify-between text-sm">
                  <span>{h.name}</span>
                  <span className="text-navy-400">{h.logs.length} logs</span>
                </div>
              ))
            )}
            <Button variant="link" size="sm" asChild className="px-0">
              <Link href="/dashboard/habits">Manage habits <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SuggestionRow({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="flex items-center justify-between rounded-xl border border-navy-100 px-4 py-3 text-sm transition-colors hover:border-sage-300 hover:bg-sage-50 dark:border-white/10 dark:hover:bg-sage-500/10">
      {label}
      <ArrowRight className="h-4 w-4 text-navy-300" />
    </Link>
  );
}
