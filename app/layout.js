import { Fraunces, Archivo, JetBrains_Mono } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import "./globals.css";

// Design system per PRD Frontend Build Guide — "Scholarly Editorial Modern":
// Fraunces (display) · Archivo (body/UI) · JetBrains Mono (labels/data)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Anthroplanet — Our Planet, Your Insight",
    template: "%s · Anthroplanet",
  },
  description:
    "Anthroplanet is the academic research platform where students, researchers and mentors publish, collaborate, build profiles and grow their scholarly impact.",
  keywords: [
    "academic research",
    "research profile",
    "scholarly blogging",
    "mentoring",
    "Anthroplanet",
  ],
  openGraph: {
    type: "website",
    title: "Anthroplanet — Our Planet, Your Insight",
    description:
      "Publish research, build a public profile, find mentors and measure your scholarly impact — all in one platform.",
    siteName: "Anthroplanet",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
