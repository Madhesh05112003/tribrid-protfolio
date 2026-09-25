import type { Metadata, Viewport } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SiteNav } from "@/components/SiteNav";
import { project } from "@/content/project";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const description = `${project.title} — ${project.subtitle}. A working prototype built by ${project.team
  .map((m) => m.name)
  .join(", ")} at ${project.institution}. Solar harvesting, a light-coil self-recharge loop, and speed-based switching between electric, LPG and petrol power.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: `${project.title} — Engineering Portfolio`,
    template: `%s — ${project.codename}`,
  },
  description,
  keywords: [...project.keywords, "IoT", "ESP8266", "BLDC", "Blynk", "engineering portfolio"],
  authors: project.team.map((m) => ({ name: m.name })),
  creator: project.team[2].name,
  openGraph: {
    title: `${project.title}`,
    description,
    type: "website",
    images: [{ url: "/media/img/front-trib-1024.webp", width: 1024, height: 1816 }],
  },
  twitter: { card: "summary_large_image", title: project.title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070907",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="grain relative min-h-full overflow-x-hidden bg-void text-chalk">
        <SmoothScroll />
        <SiteNav />
        {children}
      </body>
    </html>
  );
}
