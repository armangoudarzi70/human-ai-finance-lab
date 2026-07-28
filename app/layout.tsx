import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Human–AI Finance Lab",
    template: "%s · Human–AI Finance Lab",
  },
  description:
    "Experimental research on how artificial intelligence changes financial judgment, advisory behavior, and human decision-making.",
  keywords: [
    "human AI",
    "finance",
    "experimental economics",
    "AI advice",
    "portfolio choice",
  ],
  openGraph: {
    title: "Human–AI Finance Lab",
    description:
      "Financial decisions at the edge of human and artificial intelligence.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
