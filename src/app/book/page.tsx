import type { Metadata } from "next";
import { BookingPage } from "../../components/BookingModal";
import { absoluteUrl } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Book a Quad or Buggy Tour",
  description:
    "Book your Rio Quad tour in Agadir / Tamraght. Choose date, group size, quad or buggy, extras — then confirm on WhatsApp in minutes.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Book a Quad or Buggy Tour | Rio Quad",
    description:
      "Reserve guided quad and buggy rides near Agadir and Tamraght. Fast WhatsApp booking.",
    url: absoluteUrl("/book"),
  },
  robots: { index: true, follow: true },
};

export default function BookRoute() {
  return <BookingPage />;
}
