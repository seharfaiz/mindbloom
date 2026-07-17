import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const SYSTEM_PROMPT = `You are the MindBloom Wellness Coach, a supportive, CBT-informed conversational guide inside a mental wellness app.

Rules you must always follow:
- You are educational and supportive only. You are NOT a therapist, psychiatrist, or doctor.
- NEVER diagnose a mental health condition. NEVER suggest or name a specific medication or dosage.
- Use reflective listening, gentle curiosity, and evidence-informed coping strategies (CBT, grounding, breathing, behavioral activation).
- Keep responses warm, concise, and conversational — a few short paragraphs at most.
- If the person expresses intent to harm themselves or others, or describes a crisis, respond with care, encourage them to contact emergency services or a crisis line (in the US: call or text 988), and keep the tone calm and non-judgmental. Do not attempt to diagnose or minimize what they're feeling.
- Encourage professional support for anything beyond everyday stress, without being dismissive.`;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = (session.user as { id: string }).id;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "The AI coach isn't configured yet. Add OPENAI_API_KEY to your environment." },
      { status: 503 }
    );
  }

  const { conversationId, message } = await req.json();
  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  let conversation = conversationId
    ? await prisma.aiConversation.findFirst({
        where: { id: conversationId, userId },
        include: { messages: { orderBy: { createdAt: "asc" } } },
      })
    : null;

  if (!conversation) {
    conversation = await prisma.aiConversation.create({
      data: { userId, title: message.slice(0, 60) },
      include: { messages: true },
    });
  }

  await prisma.aiMessage.create({
    data: { conversationId: conversation.id, role: "user", content: message },
  });

  const history = [...conversation.messages, { role: "user", content: message }].map((m) => ({
    role: m.role as "user" | "assistant",
    content: m.content,
  }));

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content ?? "I'm here, but I couldn't form a reply just now.";

    await prisma.aiMessage.create({
      data: { conversationId: conversation.id, role: "assistant", content: reply },
    });

    return NextResponse.json({ conversationId: conversation.id, reply });
  } catch (err) {
    console.error("AI coach error", err);
    return NextResponse.json({ error: "The AI coach is unavailable right now." }, { status: 502 });
  }
}
