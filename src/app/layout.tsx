import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import AuthSessionProvider from "@/components/session-provider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "MindBloom — Understand Yourself. Grow Every Day.",
  description:
    "A calm, evidence-informed space to track your mood, build habits, and grow — MindBloom is educational and supportive, not a replacement for professional care.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${jakarta.variable} ${plexMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthSessionProvider>
            {children}
            <Toaster position="top-center" richColors closeButton />
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
