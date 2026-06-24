import PageHero from "@/components/page-hero";
import PricingContent from "@/components/pricing-content";

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for researchers and institutions — start free, upgrade when you're ready.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        kicker="Pricing"
        title="Start free. Grow when"
        accent="you're ready."
        subtitle="No hidden fees. Publish and build your profile for free — upgrade for premium tools and analytics."
      />
      <PricingContent />
    </>
  );
}
