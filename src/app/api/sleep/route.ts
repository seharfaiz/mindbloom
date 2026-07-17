import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfDay } from "@/lib/utils";

const sleepSchema = z.object({
  bedTime: z.string(),
  wakeTime: z.string(),
  quality: z.number().int().min(1).max(5),
  notes: z.string().max(500).optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const logs = await prisma.sleepLog.findMany({
    where: { userId: (session.user as { id: string }).id },
    orderBy: { date: "desc" },
    take: 30,
  });
  return NextResponse.json({ logs });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  const body = await req.json();
  const parsed = sleepSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const bedTime = new Date(parsed.data.bedTime);
  const wakeTime = new Date(parsed.data.wakeTime);
  let durationMin = Math.round((wakeTime.getTime() - bedTime.getTime()) / 60000);
  if (durationMin < 0) durationMin += 24 * 60;

  const date = startOfDay(wakeTime);

  const log = await prisma.sleepLog.upsert({
    where: { userId_date: { userId, date } },
    update: { bedTime, wakeTime, durationMin, quality: parsed.data.quality, notes: parsed.data.notes },
    create: { userId, date, bedTime, wakeTime, durationMin, quality: parsed.data.quality, notes: parsed.data.notes },
  });

  return NextResponse.json({ log }, { status: 201 });
}
