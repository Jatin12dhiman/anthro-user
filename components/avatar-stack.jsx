import Image from "next/image";

/** Overlapping researcher avatars — used for social proof (hero, CTA). */
const AVATARS = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80",
];

export default function AvatarStack({ count = 4, ringClass = "ring-lagoon-900" }) {
  return (
    <div className="flex -space-x-2.5">
      {AVATARS.slice(0, count).map((src) => (
        <span
          key={src}
          className={`relative h-8 w-8 overflow-hidden rounded-full ring-2 ${ringClass}`}
        >
          <Image src={src} alt="" fill sizes="32px" className="object-cover" />
        </span>
      ))}
    </div>
  );
}
