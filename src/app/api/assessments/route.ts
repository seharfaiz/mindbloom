import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ASSESSMENTS, scoreAssessment } from "@/lib/assessments";

const submitSchema = z.object({
  instrument: z.string(),
  answers: z.array(z.number().int().min(0)),
});

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const instrument = searchParams.get("instrument");

  const results = await prisma.assessmentResult.findMany({
    where: { userId: (session.user as { id: string }).id, ...(instrument ? { instrument } : {}) },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ results });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = submitSchema.safeParse(body);
  if (!parsed.success || !ASSESSMENTS[parsed.data.instrument]) {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }

  const { instrument, answers } = parsed.data;
  const def = ASSESSMENTS[instrument];
  if (answers.length !== def.questions.length) {
    return NextResponse.json({ error: "Answer count doesn't match this assessment" }, { status: 400 });
  }

  const scored = scoreAssessment(instrument, answers);

  const result = await prisma.assessmentResult.create({
    data: {
      userId: (session.user as { id: string }).id,
      instrument,
      answers,
      totalScore: scored.total,
      interpretation: scored.interpretation,
      severity: scored.severity,
    },
  });

  const crisisFlag =
    def.crisisItemIndex !== undefined && answers[def.crisisItemIndex] > 0;

  return NextResponse.json({ result, scored, crisisFlag }, { status: 201 });
}
