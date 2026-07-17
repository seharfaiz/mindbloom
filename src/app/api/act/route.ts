import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const actSchema = z.object({
  type: z.enum(["VALUES_CLARIFICATION", "COGNITIVE_DEFUSION", "ACCEPTANCE_WILLINGNESS", "COMMITTED_ACTION"]),
  data: z.record(z.any()),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const worksheets = await prisma.actWorksheet.findMany({
    where: { userId: (session.user as { id: string }).id, ...(type ? { type: type as any } : {}) },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ worksheets });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = actSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const worksheet = await prisma.actWorksheet.create({
    data: { ...parsed.data, userId: (session.user as { id: string }).id },
  });
  return NextResponse.json({ worksheet }, { status: 201 });
}
