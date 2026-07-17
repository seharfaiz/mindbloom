"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";

const steps = [
  { label: "Check in", title: "Log a moment", desc: "A 30-second mood, energy, and stress check-in — as often as you like." },
  { label: "Reflect", title: "Journal or assess", desc: "Add a gratitude note, run a screening, or work through a CBT worksheet." },
  { label: "Grow", title: "See your patterns", desc: "Weekly and monthly charts show what's shifting, so you can act on it." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-navy-800 py-24 text-white">
      <div className="container">
        <h2 className="max-w-lg font-display text-4xl font-medium tracking-tight md:text-5xl">
          A rhythm, not a chore
        </h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="border-l border-white/15 pl-6"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-sage-300">{s.label}</span>
              <h3 className="mt-3 font-display text-2xl font-medium">{s.title}</h3>
              <p className="mt-2 text-white/60">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { quote: "Logging my mood takes seconds now, and the monthly chart showed me my stress spikes every Sunday night — something I'd never noticed.", name: "Priya R.", role: "Grad student" },
  { quote: "The thought record worksheet is the first CBT tool that's actually stuck as a daily habit for me.", name: "Marcus T.", role: "Product designer" },
  { quote: "Simple, calm, and it never feels clinical. It feels like a quiet corner of my day.", name: "Elena V.", role: "Nurse" },
];

export function Testimonials() {
  return (
    <section className="container py-24">
      <h2 className="text-center font-display text-4xl font-medium tracking-tight md:text-5xl">
        People growing with MindBloom
      </h2>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="p-7">
            <p className="font-display text-lg italic leading-relaxed text-navy-800 dark:text-white/90">
              "{t.quote}"
            </p>
            <p className="mt-5 text-sm font-medium text-navy-900 dark:text-white">{t.name}</p>
            <p className="text-xs text-navy-400 dark:text-white/50">{t.role}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

const plans = [
  { name: "Sprout", price: "Free", desc: "Everything you need to start a daily practice.", features: ["Mood, habit & sleep tracking", "Gratitude journal", "2 self-assessments / month", "Relaxation center"], cta: "Start free" },
  { name: "Bloom", price: "$9/mo", desc: "The full toolbox, unlimited.", features: ["Everything in Sprout", "Unlimited assessments", "Full CBT toolbox", "AI wellness coach", "PDF exports"], cta: "Start 14-day trial", highlight: true },
  { name: "Practice", price: "Contact us", desc: "For clinics and student counseling centers.", features: ["Everything in Bloom", "Multi-client dashboards", "Admin & reporting tools", "Priority support"], cta: "Talk to us" },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-beige-50 py-24 dark:bg-white/[0.02]">
      <div className="container">
        <h2 className="text-center font-display text-4xl font-medium tracking-tight md:text-5xl">
          Simple, honest pricing
        </h2>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <Card key={p.name} className={p.highlight ? "border-sage-400 shadow-lift ring-1 ring-sage-400" : ""}>
              <CardContent className="p-8">
                <h3 className="font-display text-2xl font-medium">{p.name}</h3>
                <p className="mt-1 text-3xl font-semibold">{p.price}</p>
                <p className="mt-2 text-sm text-navy-500 dark:text-white/60">{p.desc}</p>
                <ul className="mt-6 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sage-500" /> {f}
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full" variant={p.highlight ? "sage" : "outline"} asChild>
                  <Link href="/register">{p.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Is MindBloom a replacement for therapy?", a: "No. MindBloom is educational and supportive. Self-assessments are screening tools, not diagnoses — please talk to a licensed professional for clinical care." },
  { q: "Is my data private?", a: "Your entries are encrypted in transit and access is protected behind authentication. You can export or delete your data at any time." },
  { q: "What happens if I'm in crisis?", a: "MindBloom will surface crisis resources whenever a screening or conversation suggests you may need immediate support." },
  { q: "Can I cancel anytime?", a: "Yes — Bloom is monthly with no lock-in, and your data stays exportable even on the free plan." },
];

export function Faq() {
  return (
    <section id="faq" className="container py-24">
      <h2 className="text-center font-display text-4xl font-medium tracking-tight md:text-5xl">
        Questions, answered
      </h2>
      <div className="mx-auto mt-12 max-w-2xl divide-y divide-navy-100 dark:divide-white/10">
        {faqs.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-display text-lg">
              {f.q}
              <span className="ml-4 text-sage-500 transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-navy-500 dark:text-white/60">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function NewsletterCta() {
  return (
    <section className="container pb-24">
      <div className="rounded-3xl bg-gradient-to-br from-sage-600 to-navy-700 px-8 py-16 text-center text-white md:px-16">
        <h2 className="font-display text-3xl font-medium md:text-4xl">Get one calm idea a week</h2>
        <p className="mx-auto mt-3 max-w-md text-white/70">
          A short note with a reflection prompt, a coping tool, and nothing else.
        </p>
        <form className="mx-auto mt-8 flex max-w-md gap-3" onSubmit={(e) => e.preventDefault()}>
          <Input type="email" placeholder="you@example.com" className="border-white/20 bg-white/10 text-white placeholder:text-white/50" />
          <Button variant="sage" type="submit">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
