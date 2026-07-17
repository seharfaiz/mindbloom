import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const moodSchema = z.object({
  mood: z.number().int().min(1).max(5),
  emotions: z.array(z.string()).default([]),
  energy: z.number().int().min(1).max(5),
  stress: z.number().int().min(1).max(5),
  anxiety: z.number().int().min(1).max(5),
  sleepQuality: z.number().int().min(1).max(5).optional(),
  triggers: z.array(z.string()).default([]),
  notes: z.string().max(2000).optional(),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const days = Number(searchParams.get("days") ?? 30);
  const since = new Date();
  since.setDate(since.getDate() - days);

  const entries = await prisma.moodEntry.findMany({
    where: { userId: (session.user as { id: string }).id, entryDate: { gte: since } },
    orderBy: { entryDate: "asc" },
  });
  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = moodSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const entry = await prisma.moodEntry.create({
    data: { ...parsed.data, userId: (session.user as { id: string }).id },
  });
  return NextResponse.json({ entry }, { status: 201 });
}
