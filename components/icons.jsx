function base(props) {
  return {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...props,
  };
}

// ── Existing icons ──────────────────────────────────────────────

export const Globe = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" />
  </svg>
);

export const Users = (p) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3.5 20c0-3.2 2.8-5 5.5-5s5.5 1.8 5.5 5" />
    <path d="M16 5.5a3.2 3.2 0 0 1 0 6.2M17.5 15c2 .6 3.5 2.2 3.5 5" />
  </svg>
);

export const ShieldCheck = (p) => (
  <svg {...base(p)}>
    <path d="M12 3l7 3v5c0 5-3 8.2-7 10-4-1.8-7-5-7-10V6z" />
    <path d="m8.8 12 2.2 2.2L15.4 10" />
  </svg>
);

export const TrendingUp = (p) => (
  <svg {...base(p)}>
    <path d="M3 17l6-6 4 4 7-8" />
    <path d="M17 7h4v4" />
  </svg>
);

export const Rupee = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9 8h6M9 11h6M14.5 8c0 3-2.5 4-5.5 4l5 4" />
  </svg>
);

export const Medal = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="5" />
    <path d="M8.5 12.8 7 21l5-3 5 3-1.5-8.2" />
  </svg>
);

export const Megaphone = (p) => (
  <svg {...base(p)}>
    <path d="M4 10v4a1 1 0 0 0 1 1h2l5 4V5L7 9H5a1 1 0 0 0-1 1z" />
    <path d="M16 8.5a4 4 0 0 1 0 7" />
  </svg>
);

export const Mail = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </svg>
);

export const LifeBuoy = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="m5.6 5.6 3.8 3.8M14.6 14.6l3.8 3.8M18.4 5.6l-3.8 3.8M9.4 14.6l-3.8 3.8" />
  </svg>
);

export const Briefcase = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5.5A2.5 2.5 0 0 1 10.5 3h3A2.5 2.5 0 0 1 16 5.5V7" />
    <path d="M3 12h18" />
  </svg>
);

// ── New icons ───────────────────────────────────────────────────

export const Search = (p) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m21 21-4.5-4.5" />
  </svg>
);

export const Clock = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

export const Calendar = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="17" rx="2" />
    <path d="M3 10h18M8 2v4M16 2v4" />
  </svg>
);

export const BookOpen = (p) => (
  <svg {...base(p)}>
    <path d="M2 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
    <path d="M12 6s1.5-2 5-2 5 2 5 2v14s-1.5-1-5-1-5 1-5 1V6z" />
  </svg>
);

export const Heart = (p) => (
  <svg {...base(p)}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z" />
  </svg>
);

export const MessageCircle = (p) => (
  <svg {...base(p)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const Share2 = (p) => (
  <svg {...base(p)}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
  </svg>
);

export const Eye = (p) => (
  <svg {...base(p)}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ArrowRight = (p) => (
  <svg {...base(p)}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronRight = (p) => (
  <svg {...base(p)}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const ChevronDown = (p) => (
  <svg {...base(p)}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Star = (p) => (
  <svg {...base(p)}>
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8l-6.2 3.2 1.2-6.8L2 9.3l6.9-1z" />
  </svg>
);

export const Trophy = (p) => (
  <svg {...base(p)}>
    <path d="M6 9H3.5a2.5 2.5 0 0 0 0 5H6M18 9h2.5a2.5 2.5 0 0 1 0 5H18" />
    <path d="M6 3h12v9a6 6 0 0 1-12 0V3z" />
    <path d="M9 21h6M12 18v3" />
  </svg>
);

export const Award = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="9" r="7" />
    <path d="M8.2 14.7 7 22l5-3 5 3-1.2-7.3" />
  </svg>
);

export const FileText = (p) => (
  <svg {...base(p)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);

export const Video = (p) => (
  <svg {...base(p)}>
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <path d="m22 8-6 4 6 4V8z" />
  </svg>
);

export const Zap = (p) => (
  <svg {...base(p)}>
    <path d="M13 2L4.1 13H12l-1 9 8.9-11H12l1-9z" />
  </svg>
);

export const CheckCircle = (p) => (
  <svg {...base(p)}>
    <path d="M22 11.1V12a10 10 0 1 1-5.9-9.1" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

export const Download = (p) => (
  <svg {...base(p)}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export const FlaskConical = (p) => (
  <svg {...base(p)}>
    <path d="M9 3h6M9 3v7l-5 9a1 1 0 0 0 .9 1.5h12.2A1 1 0 0 0 22 19l-5-9V3" />
    <path d="M7.5 14h9" />
  </svg>
);

export const Sparkles = (p) => (
  <svg {...base(p)}>
    <path d="M12 3c.5 3 3 5.5 6 6-3 .5-5.5 3-6 6-.5-3-3-5.5-6-6 3-.5 5.5-3 6-6z" />
    <path d="M5 3c.3 1.5 1.5 2.7 3 3-1.5.3-2.7 1.5-3 3-.3-1.5-1.5-2.7-3-3 1.5-.3 2.7-1.5 3-3z" />
    <path d="M19 13c.3 1.5 1.5 2.7 3 3-1.5.3-2.7 1.5-3 3-.3-1.5-1.5-2.7-3-3 1.5-.3 2.7-1.5 3-3z" />
  </svg>
);

export const PenLine = (p) => (
  <svg {...base(p)}>
    <path d="M12 20h9" />
    <path d="M16.4 3.6a2 2 0 0 1 2.8 2.8L7 18.6 3 20l1.4-4L16.4 3.6z" />
  </svg>
);

export const Filter = (p) => (
  <svg {...base(p)}>
    <path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z" />
  </svg>
);

export const MapPin = (p) => (
  <svg {...base(p)}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const UserCircle = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="10" r="3" />
    <path d="M6.2 18.4a6 6 0 0 1 11.6 0" />
  </svg>
);

export const Twitter = (p) => (
  <svg {...base(p)}>
    <path d="M22 4s-2.8 1-4.2 1.1A5.9 5.9 0 0 0 2 9v1a14 14 0 0 1-2-1s0 7 7 10a14 14 0 0 1-7 2c7 4 16 0 16-11.5A5.5 5.5 0 0 0 22 4z" />
  </svg>
);

export const Linkedin = (p) => (
  <svg {...base(p)}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const GraduationCap = (p) => (
  <svg {...base(p)}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

export const Layers = (p) => (
  <svg {...base(p)}>
    <path d="M12 2 2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
  </svg>
);

export const ArrowUpRight = (p) => (
  <svg {...base(p)}>
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export const Tag = (p) => (
  <svg {...base(p)}>
    <path d="M20.6 11.4 12.4 3.2A1.5 1.5 0 0 0 11.3 3H5a2 2 0 0 0-2 2v6.3a1.5 1.5 0 0 0 .4 1L11.6 20.6a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8z" />
    <circle cx="7.5" cy="7.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const Icon = {
  Globe, Users, ShieldCheck, TrendingUp, Rupee, Medal, Megaphone, Mail, LifeBuoy, Briefcase,
  Search, Clock, Calendar, BookOpen, Heart, MessageCircle, Share2, Eye, ArrowRight, ChevronRight,
  ChevronDown, Star, Trophy, Award, FileText, Video, Zap, CheckCircle, Download, FlaskConical,
  Sparkles, PenLine, Filter, MapPin, UserCircle, Twitter, Linkedin, GraduationCap, Layers, ArrowUpRight, Tag,
};
export default Icon;
