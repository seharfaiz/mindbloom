import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="container max-w-2xl py-24">
        <h1 className="font-display text-4xl font-medium">Privacy</h1>
        <div className="mt-6 space-y-4 text-navy-600 dark:text-white/70">
          <p>Your mood, journal, sleep, assessment, and CBT worksheet entries are private to
          your account and are never shared with other users.</p>
          <p>You can export or delete your data at any time from Settings.</p>
          <p>This is placeholder policy text for the demo build — replace with your actual
          privacy policy before taking this to production.</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
