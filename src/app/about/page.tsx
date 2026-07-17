import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="container max-w-2xl py-24">
        <h1 className="font-display text-4xl font-medium">About MindBloom</h1>
        <p className="mt-6 text-navy-600 dark:text-white/70">
          MindBloom was built to make evidence-informed self-reflection feel calm and
          approachable rather than clinical. It's a space for daily check-ins, small habits,
          and the occasional deeper worksheet — not a replacement for therapy or medical care.
        </p>
        <p className="mt-4 text-navy-600 dark:text-white/70">
          If you're in crisis, please contact your local emergency number or, in the US,
          call or text 988 any time.
        </p>
      </main>
      <Footer />
    </>
  );
}
