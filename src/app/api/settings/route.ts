import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const settingsSchema = z.object({
  theme: z.enum(["light", "dark", "system"]).optional(),
  moodReminder: z.boolean().optional(),
  habitReminder: z.boolean().optional(),
  journalReminder: z.boolean().optional(),
  sleepReminder: z.boolean().optional(),
  assessmentReminder: z.boolean().optional(),
  reminderHour: z.number().int().min(0).max(23).optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  const settings = await prisma.settings.upsert({
    where: { userId },
    update: {},
    create: { userId },
  });
  return NextResponse.json({ settings });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  const body = await req.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const settings = await prisma.settings.upsert({
    where: { userId },
    update: parsed.data,
    create: { userId, ...parsed.data },
  });
  return NextResponse.json({ settings });
}
