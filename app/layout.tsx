import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getLocale } from "./i18n/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

const siteUrl = "https://mubarak.kg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mubarak — сеть чайхан №1 в Кыргызстане",
    template: "%s | Mubarak",
  },
  description:
    "Mubarak — цифровая сеть чайхан: онлайн-меню, доставка, бронирование столов, QR-заказ и программа лояльности. Восточная и кыргызская кухня в 9+ филиалах.",
  keywords: [
    "Mubarak",
    "чайхана",
    "доставка еды Бишкек",
    "плов",
    "манты",
    "шашлык",
    "восточная кухня",
    "бронирование стола",
    "онлайн заказ еды",
  ],
  authors: [{ name: "Mubarak" }],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Mubarak",
    title: "Mubarak — сеть чайхан №1 в Кыргызстане",
    description:
      "Онлайн-меню, доставка, бронирование и программа лояльности сети чайхан Mubarak.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mubarak — сеть чайхан №1 в Кыргызстане",
    description:
      "Онлайн-меню, доставка, бронирование и программа лояльности сети чайхан Mubarak.",
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "ru-RU": siteUrl,
      "ky-KG": `${siteUrl}/ky`,
      "en-US": `${siteUrl}/en`,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#123227",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-espresso">
        {children}
      </body>
    </html>
  );
}
