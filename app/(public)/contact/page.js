import PageHero from "@/components/page-hero";
import ContactContent from "@/components/contact-content";

export const metadata = {
  title: "Contact",
  description: "Get in touch with the Anthroplanet team — support, partnerships and general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Let's talk"
        accent="research."
        subtitle="Whether you need help, have feedback, or want to partner with us — we're listening."
      />
      <ContactContent />
    </>
  );
}
