import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { PreferencesProvider } from "../components/PreferencesProvider";
import { BookingProvider } from "../components/BookingModal";
import { JsonLd } from "../components/JsonLd";
import { SEO, SITE_URL, absoluteUrl } from "../lib/seo";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.titleDefault,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  applicationName: "Rio Quad",
  authors: [{ name: "Rio Quad", url: SITE_URL }],
  creator: "Rio Quad",
  publisher: "Rio Quad",
  category: "travel",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: SEO.locale,
    url: SITE_URL,
    siteName: "Rio Quad",
    title: SEO.titleDefault,
    description: SEO.description,
    images: [
      {
        url: absoluteUrl(SEO.ogImage),
        width: 1200,
        height: 630,
        alt: "Rio Quad — guided quad and buggy tours in Agadir and Tamraght",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.titleDefault,
    description: SEO.description,
    images: [absoluteUrl(SEO.ogImage)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg?v=3", type: "image/svg+xml" },
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/icon.png?v=3", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png?v=3", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico?v=3"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0c" },
  ],
};

const themeBoot = `(function(){try{var r=document.documentElement;var t=localStorage.getItem('rio-theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;var supported=['en','fr','es','de','ar','zh'];var l=localStorage.getItem('rio-locale');if(!l||supported.indexOf(l)<0){var langs=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language];l='en';for(var i=0;i<langs.length;i++){var tag=(langs[i]||'').toLowerCase();var base=tag.split('-')[0];if(base==='zh'){l='zh';break}if(supported.indexOf(base)>=0){l=base;break}}try{localStorage.setItem('rio-locale',l)}catch(e){}}r.lang=l;r.dir=l==='ar'?'rtl':'ltr'}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <link rel="preconnect" href={SITE_URL} />
      </head>
      <body
        className={`${inter.variable} ${cairo.variable} bg-background text-foreground antialiased`}
      >
        <JsonLd />
        <PreferencesProvider>
          <BookingProvider>{children}</BookingProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
