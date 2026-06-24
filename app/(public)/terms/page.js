import LegalPage from "@/components/legal-page";

export const metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Anthroplanet platform.",
};

const SECTIONS = [
  {
    heading: "Acceptance of terms",
    body: [
      "By accessing or using Anthroplanet, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the platform.",
    ],
  },
  {
    heading: "Your account",
    body: [
      "You are responsible for safeguarding your account credentials and for all activity that occurs under your account. You must provide accurate information and keep it up to date.",
      "You must be authorised to use any institutional affiliation you list on your profile.",
    ],
  },
  {
    heading: "Content and conduct",
    body: [
      "You retain ownership of the research, blogs and materials you publish. By publishing, you grant Anthroplanet a licence to host and display that content on the platform.",
      "You agree not to post plagiarised, unlawful or misleading content. Submissions may be screened for originality before publication.",
    ],
  },
  {
    heading: "Payments and subscriptions",
    body: [
      "Paid services and subscriptions are billed through our payment provider. Prices are shown before purchase. Refunds, where applicable, follow the policy displayed at checkout.",
    ],
  },
  {
    heading: "Termination",
    body: [
      "We may suspend or terminate accounts that violate these terms. You may close your account at any time from your settings.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "Anthroplanet is provided on an “as is” basis. To the maximum extent permitted by law, we are not liable for indirect or consequential damages arising from your use of the platform.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Legal"
      title="Terms of"
      accent="Service."
      updated="June 2026"
      intro="Please read these terms carefully — they govern your use of the Anthroplanet platform."
      sections={SECTIONS}
    />
  );
}
