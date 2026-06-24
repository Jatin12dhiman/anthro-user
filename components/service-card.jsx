import Image from "next/image";
import Link from "next/link";

/** A single service / module card (image, label, title, blurb, link). */
export default function ServiceCard({ img, label, title, desc, href }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-[#e4dccb] bg-white shadow-[0_18px_40px_-30px_rgba(18,39,52,0.5)] transition-transform duration-300 hover:-translate-y-1.5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 1024px) 90vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-lagoon-900/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-frost-50 backdrop-blur">
          {label}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-semibold text-lagoon-900">{title}</h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-lagoon/65">{desc}</p>
        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-moss-600 transition-colors hover:text-moss"
        >
          Explore
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
