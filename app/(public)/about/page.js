import PageHero from "@/components/page-hero";
import AboutContent from "@/components/about-content";
import InfoCta from "@/components/info-cta";

export const metadata = {
  title: "About",
  description:
    "Anthroplanet is the academic research platform giving every researcher a home for publishing, mentoring, profiles and impact.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About Anthroplanet"
        title="One home for the"
        accent="research journey."
        subtitle="We bring publishing, mentoring, profiles and impact together — so scholars spend less time on logistics and more on discovery."
      />
      <AboutContent />
      <InfoCta />
    </>
  );
}
