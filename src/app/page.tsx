import { Navbar } from "@/components/marketing/navbar";
import { Footer } from "@/components/marketing/footer";
import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { HowItWorks, Testimonials, Pricing, Faq, NewsletterCta } from "@/components/marketing/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Faq />
        <NewsletterCta />
      </main>
      <Footer />
    </>
  );
}
