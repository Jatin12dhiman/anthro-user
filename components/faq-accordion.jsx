"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "Is Anthroplanet free to use?",
    a: "Yes — creating an account, publishing blogs and claiming your public profile handle are free forever. Some advanced services (like content transformation and premium mentoring) are paid, with prices shown upfront.",
  },
  {
    q: "Who is Anthroplanet for?",
    a: "Students, researchers, professors and mentors across every discipline. Whether you're publishing your first blog or building a decade of scholarly impact, there's a home for your work here.",
  },
  {
    q: "How does the public profile work?",
    a: "Every member gets a public page at anthroplanet.com/your-handle with tabs for your bio, CV, achievements, impact metrics and projects. You control what's public or private, section by section.",
  },
  {
    q: "How is plagiarism checked?",
    a: "Submitted blogs are run through an automated plagiarism check before review. If the similarity score crosses the configured threshold, the piece is flagged for revision before it can be published.",
  },
  {
    q: "What is the Anthroplanet Impact Score?",
    a: "It's our composite metric that goes beyond raw citations — combining publications, citations, h-index and real-world reach into a single, comparable score on your profile.",
  },
  {
    q: "How do mentoring sessions work?",
    a: "Browse vetted mentors, book a 1-on-1 slot or join a cohort course, and pay securely. A video meeting link is generated automatically and added to your profile, with a certificate on completion.",
  },
  {
    q: "Can I get a certificate for my work?",
    a: "Yes — competitions, projects and mentoring courses issue verifiable PDF certificates, each with a unique code and a public verification URL.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-[#e4dccb] bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold text-lagoon-900">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-moss/12 text-moss-600 transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-lagoon/70">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-lagoon/65">
          Still have questions?{" "}
          <a href="/contact" className="font-semibold text-moss-600 hover:text-moss">
            Get in touch →
          </a>
        </p>
      </div>
    </section>
  );
}
