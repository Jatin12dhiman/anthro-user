import PageHero from "@/components/page-hero";
import HowItWorksContent from "@/components/how-it-works-content";
import InfoCta from "@/components/info-cta";

export const metadata = {
  title: "How it works",
  description:
    "From sign-up to scholarly impact in three steps — see how Anthroplanet works across publishing, mentoring and profiles.",
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        kicker="How it works"
        title="From visitor to"
        accent="published researcher."
        subtitle="No clutter, no confusion — a clear path from your first sign-up to a growing scholarly reputation."
      />
      <HowItWorksContent />
      <InfoCta primaryLabel="Get started free" secondaryLabel="Browse services" secondaryHref="/services" />
    </>
  );
}
