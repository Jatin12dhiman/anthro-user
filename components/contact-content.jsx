import ContactForm from "@/components/contact-form";
import { Mail, LifeBuoy, Briefcase } from "@/components/icons";

const CHANNELS = [
  [Mail, "Email us", "hello@anthroplanet.com", "We reply within 1–2 business days."],
  [LifeBuoy, "Support", "support@anthroplanet.com", "Account, billing and technical help."],
  [Briefcase, "Partnerships", "partners@anthroplanet.com", "Institutions and collaborations."],
];

export default function ContactContent() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-2">
        {/* Channels */}
        <div>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">
            Get in touch
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
            We&apos;d love to hear from you.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-lagoon/70">
            Questions, feedback or a partnership idea? Pick a channel or send us a
            message — a real person will get back to you.
          </p>

          <div className="mt-8 space-y-4">
            {CHANNELS.map(([ChannelIcon, title, email, note]) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-[#e4dccb] bg-white p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-moss/12 text-moss-600">
                  <ChannelIcon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-lagoon-900">{title}</p>
                  <a href={`mailto:${email}`} className="text-sm font-medium text-moss-600 hover:text-moss">
                    {email}
                  </a>
                  <p className="mt-0.5 text-xs text-lagoon/55">{note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
