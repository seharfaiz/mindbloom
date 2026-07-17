import { NextResponse } from "next/server";
import { z } from "zod";
import { nanoid } from "nanoid";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });

  const email = parsed.data.email.toLowerCase();
  const user = await prisma.user.findUnique({ where: { email } });

  // Always respond success to avoid leaking which emails are registered.
  if (!user || !user.passwordHash) {
    return NextResponse.json({ ok: true });
  }

  const token = nanoid(32);
  const expires = new Date(Date.now() + 1000 * 60 * 30); // 30 min

  await prisma.passwordResetToken.create({ data: { email, token, expires } });

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
      await resend.emails.send({
        from: process.env.EMAIL_FROM ?? "MindBloom <hello@mindbloom.app>",
        to: email,
        subject: "Reset your MindBloom password",
        html: `<p>Click below to reset your password. This link expires in 30 minutes.</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
      });
    } catch (err) {
      console.error("Failed to send reset email", err);
    }
  } else {
    console.log(`[dev] Password reset link: ${process.env.NEXTAUTH_URL}/reset-password?token=${token}`);
  }

  return NextResponse.json({ ok: true });
}
