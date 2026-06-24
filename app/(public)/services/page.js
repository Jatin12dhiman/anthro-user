import PageHero from "@/components/page-hero";
import ServicesContent from "@/components/services-content";
import InfoCta from "@/components/info-cta";

export const metadata = {
  title: "Services",
  description:
    "Explore Anthroplanet's services — academic blogging, mentoring, research profiles, content transformation, projects and competitions.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        kicker="Our services"
        title="Built for every stage of"
        accent="your research."
        subtitle="Six connected modules — publish, mentor, build a profile and compete — all under one account."
      />
      <ServicesContent />
      <InfoCta primaryLabel="Start free" secondaryLabel="See pricing" secondaryHref="/pricing" />
    </>
  );
}
