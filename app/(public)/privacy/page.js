import LegalPage from "@/components/legal-page";

export const metadata = {
  title: "Privacy Policy",
  description: "How Anthroplanet collects, uses and protects your data.",
};

const SECTIONS = [
  {
    heading: "Information we collect",
    body: [
      "We collect the information you provide when you create an account and build your profile — such as your name, email, institution and the content you publish.",
      "We also collect limited technical data (like device and usage information) to keep the platform secure and improve it.",
    ],
  },
  {
    heading: "How we use your data",
    body: [
      "We use your data to operate the platform: to power your public profile, deliver services you request, process payments, and send important notifications.",
      "You control the visibility of each profile section through per-section privacy settings.",
    ],
  },
  {
    heading: "Sharing and disclosure",
    body: [
      "We do not sell your personal data. We share data only with service providers needed to run the platform (such as payment, email and storage providers), and where required by law.",
    ],
  },
  {
    heading: "Data security",
    body: [
      "Passwords are hashed, sessions are protected, and private files are served through time-limited secure links. We apply industry-standard safeguards to protect your information.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can access, update or delete your information from your account settings. You may request a copy of your data or its deletion by contacting us.",
    ],
  },
  {
    heading: "Cookies",
    body: [
      "We use essential cookies to keep you signed in and to remember your preferences. You can control cookies through your browser settings.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Privacy"
      accent="Policy."
      updated="June 2026"
      intro="Your trust matters. Here's how we collect, use and protect your data on Anthroplanet."
      sections={SECTIONS}
    />
  );
}
