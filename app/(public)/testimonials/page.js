import PageHero from "@/components/page-hero";
import TestimonialsContent from "@/components/testimonials-content";
import InfoCta from "@/components/info-cta";

export const metadata = {
  title: "Testimonials",
  description: "Hear from researchers, mentors and students who grow their work with Anthroplanet.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        kicker="Loved by researchers"
        title="Trusted across"
        accent="campuses."
        subtitle="From first-year students to seasoned professors — here's what the Anthroplanet community has to say."
      />
      <TestimonialsContent />
      <InfoCta />
    </>
  );
}
