import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { site } from "../data/site";
import { PreferencesProvider } from "../components/PreferencesProvider";
import { BookingProvider } from "../components/BookingModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.fullName}`,
  description:
    "Guided quad and buggy tours from Agadir / Tamraght. Beach, dunes, sunset rides. Book on WhatsApp. Open daily 09:00-21:00.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/images/work/rio-quad/logo.png", type: "image/png" },
    ],
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
      </head>
      <body
        className={`${inter.variable} ${cairo.variable} bg-background text-foreground antialiased`}
      >
        <PreferencesProvider>
          <BookingProvider>{children}</BookingProvider>
        </PreferencesProvider>
      </body>
    </html>
  );
}
