import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const journalSchema = z.object({
  title: z.string().max(120).optional(),
  content: z.string().min(1).max(10000),
  gratitude: z.array(z.string()).default([]),
  prompt: z.string().optional(),
  tags: z.array(z.string()).default([]),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entries = await prisma.journalEntry.findMany({
    where: { userId: (session.user as { id: string }).id },
    orderBy: { entryDate: "desc" },
    take: 50,
  });
  return NextResponse.json({ entries });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = journalSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const entry = await prisma.journalEntry.create({
    data: { ...parsed.data, userId: (session.user as { id: string }).id },
  });
  return NextResponse.json({ entry }, { status: 201 });
}
