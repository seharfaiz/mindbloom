"use client";
import { useRef, useState, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi, I'm your MindBloom coach. I'm here to listen and offer coping tools — not to diagnose or prescribe. What's on your mind today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/ai-coach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, message: userMsg.content }),
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessages((m) => [...m, { role: "assistant", content: data.error ?? "Something went wrong." }]);
      return;
    }
    setConversationId(data.conversationId);
    setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] max-w-2xl flex-col">
      <div className="mb-4">
        <h1 className="font-display text-3xl font-medium">AI wellness coach</h1>
        <p className="mt-1 text-sm text-navy-500 dark:text-white/60">
          Supportive, CBT-informed conversation. Not a substitute for professional care.
        </p>
      </div>

      <Card className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm",
                  m.role === "user"
                    ? "bg-navy-700 text-white"
                    : "bg-sage-50 text-navy-800 dark:bg-sage-500/10 dark:text-white/90"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-navy-400">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" /> Thinking…
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </Card>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Share what's on your mind…"
          className="h-12 flex-1 rounded-full border border-navy-200 bg-white px-5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-400 dark:border-white/15 dark:bg-white/5"
        />
        <Button variant="sage" size="icon" className="h-12 w-12 rounded-full" onClick={send} disabled={loading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
