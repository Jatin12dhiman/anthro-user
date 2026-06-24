import PageHero from "@/components/page-hero";
import AmbassadorsContent from "@/components/ambassadors-content";

export const metadata = {
  title: "Ambassadors",
  description:
    "Represent Anthroplanet at your institution, help researchers get discovered, and earn rewards as a campus ambassador.",
};

export default function AmbassadorsPage() {
  return (
    <>
      <PageHero
        kicker="Ambassador program"
        title="Champion research at"
        accent="your campus."
        subtitle="Join a community of student leaders growing the future of open, connected research — and get rewarded for it."
      />
      <AmbassadorsContent />
    </>
  );
}
