import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfDay } from "@/lib/utils";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  // Toggle today's completion for this habit
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  const habit = await prisma.habit.findFirst({ where: { id: params.id, userId } });
  if (!habit) return NextResponse.json({ error: "Habit not found" }, { status: 404 });

  const today = startOfDay(new Date());
  const existing = await prisma.habitLog.findUnique({
    where: { habitId_date: { habitId: habit.id, date: today } },
  });

  if (existing) {
    await prisma.habitLog.delete({ where: { id: existing.id } });
    return NextResponse.json({ completed: false });
  }

  await prisma.habitLog.create({ data: { habitId: habit.id, userId, date: today, completed: true } });
  return NextResponse.json({ completed: true });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  const habit = await prisma.habit.findFirst({ where: { id: params.id, userId } });
  if (!habit) return NextResponse.json({ error: "Habit not found" }, { status: 404 });

  await prisma.habit.update({ where: { id: habit.id }, data: { archived: true } });
  return NextResponse.json({ ok: true });
}
