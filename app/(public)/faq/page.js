import PageHero from "@/components/page-hero";
import FaqAccordion from "@/components/faq-accordion";
import InfoCta from "@/components/info-cta";

export const metadata = {
  title: "FAQ",
  description: "Answers to common questions about Anthroplanet — pricing, profiles, mentoring, plagiarism checks and more.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        kicker="Help center"
        title="Frequently asked"
        accent="questions."
        subtitle="Everything you need to know about getting started, publishing and growing on Anthroplanet."
      />
      <FaqAccordion />
      <InfoCta />
    </>
  );
}
