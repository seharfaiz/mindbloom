import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="container max-w-2xl py-24">
        <h1 className="font-display text-4xl font-medium">Terms of use</h1>
        <div className="mt-6 space-y-4 text-navy-600 dark:text-white/70">
          <p>MindBloom is provided for educational and supportive purposes only. It is not a
          medical device and does not provide diagnosis, treatment, or emergency services.</p>
          <p>This is placeholder terms text for the demo build — replace with your actual
          terms of service before taking this to production.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
