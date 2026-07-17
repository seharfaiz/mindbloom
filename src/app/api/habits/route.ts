import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const habitSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(300).optional(),
  color: z.string().default("#8da47e"),
  frequency: z.enum(["DAILY", "WEEKLY", "CUSTOM"]).default("DAILY"),
  targetDays: z.array(z.string()).default([]),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const habits = await prisma.habit.findMany({
    where: { userId: (session.user as { id: string }).id, archived: false },
    include: { logs: { orderBy: { date: "desc" }, take: 90 } },
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json({ habits });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = habitSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const habit = await prisma.habit.create({
    data: { ...parsed.data, userId: (session.user as { id: string }).id },
  });
  return NextResponse.json({ habit }, { status: 201 });
}
