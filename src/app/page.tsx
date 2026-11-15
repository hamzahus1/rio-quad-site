import { Suspense } from "react";
import type { Metadata } from "next";
import { HomePage } from "../components/HomePage";
import { GeoAnswerBlock } from "../components/GeoAnswerBlock";
import { absoluteUrl, SEO } from "../lib/seo";

export const metadata: Metadata = {
  title: SEO.titleDefault,
  description: SEO.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: SEO.titleDefault,
    description: SEO.description,
    url: absoluteUrl("/"),
  },
};

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
      {/* SSR citable facts for ChatGPT / Perplexity (after hero so design stays brand-first) */}
      <GeoAnswerBlock />
    </>
  );
}
