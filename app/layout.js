import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CoachThis — Gerador de Lero-Lero com IA",
  description:
    "Transforme qualquer situação em discurso motivacional instantâneo. Gerador de lero-lero com IA: coach motivacional, CEO visionário, guru espiritual e palestrante TED.",
  keywords: [
    "gerador de lero lero",
    "gerador de texto motivacional",
    "coach motivacional ia",
    "pitch de elevador gerador",
    "gerador discurso corporativo",
    "lero lero ia",
    "coach this",
  ],
  authors: [{ name: "CoachThis" }],
  metadataBase: new URL("https://coach-this.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CoachThis — Gerador de Lero-Lero com IA",
    description:
      "Seu gato morreu? Perdeu o emprego? Queimou o arroz? Não importa — qualquer situação vira lição de vida aqui.",
    url: "https://coach-this.vercel.app",
    siteName: "CoachThis",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoachThis — Gerador de Lero-Lero com IA",
    description:
      "Qualquer situação vira pitch de liderança. Gerador de coach motivacional com IA.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
