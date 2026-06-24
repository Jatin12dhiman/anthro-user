import Image from "next/image";
import AmbassadorForm from "@/components/ambassador-form";
import { Rupee, Medal, Megaphone } from "@/components/icons";

const PERKS = [
  [Rupee, "Earn commission", "Get rewarded for every researcher you bring to the platform."],
  [Medal, "Exclusive access", "Early features, premium modules and ambassador-only events."],
  [Megaphone, "Grow your network", "Represent Anthroplanet at your campus and beyond."],
];

const AMBASSADORS = [
  { name: "Aarav Mehta", role: "IIT Delhi", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
  { name: "Neha Rao", role: "AIIMS", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80" },
  { name: "Saanvi Iyer", role: "IISc Bangalore", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80" },
  { name: "Rohan Das", role: "BITS Pilani", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" },
];

export default function AmbassadorsContent() {
  return (
    <>
      {/* Perks */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 sm:grid-cols-3">
            {PERKS.map(([PerkIcon, title, desc]) => (
              <div key={title} className="rounded-2xl border border-[#e4dccb] bg-white p-7 shadow-[0_18px_40px_-32px_rgba(18,39,52,0.5)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-moss/12 text-moss-600">
                  <PerkIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold text-lagoon-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-lagoon/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current ambassadors */}
      <section className="bg-frost-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Meet the team</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">Our campus ambassadors.</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AMBASSADORS.map((a) => (
              <div key={a.name} className="rounded-2xl border border-[#e4dccb] bg-white p-6 text-center">
                <div className="relative mx-auto h-20 w-20 overflow-hidden rounded-full ring-4 ring-frost-50">
                  <Image src={a.img} alt={a.name} fill sizes="80px" className="object-cover" />
                </div>
                <p className="mt-4 font-display text-lg font-semibold text-lagoon-900">{a.name}</p>
                <p className="font-mono text-xs uppercase tracking-wide text-moss">{a.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply */}
      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 sm:px-8 lg:grid-cols-2">
          <div>
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-moss">Join us</span>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-lagoon-900 sm:text-5xl">
              Become an Anthroplanet ambassador.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-lagoon/70">
              Love research and community? Represent Anthroplanet at your
              institution, help fellow researchers get discovered, and earn
              rewards along the way. Apply in two minutes.
            </p>
          </div>
          <AmbassadorForm />
        </div>
      </section>
    </>
  );
}
