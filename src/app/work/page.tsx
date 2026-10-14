import Link from "next/link";
import type { Metadata } from "next";
import { caseStudies } from "../../lib/caseStudies";
import { BackButton } from "../../components/BackButton";

export const metadata: Metadata = {
  title: "Work · OWWCO Studio",
  description:
    "Case studies in product UX, interface design, and digital launches.",
};

export default function WorkIndexPage() {
  return (
    <div className="min-h-screen bg-white px-[20px] py-10 text-[#1f1f1f] md:px-[32px] md:py-12">
      <BackButton href="/?tab=photos" />
      <h1 className="mt-8 text-[24px] font-semibold leading-8 tracking-[-0.6px] text-[#111111] md:text-[28px]">
        Past Projects
      </h1>
      <p className="mt-2 max-w-xl text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b]">
        Selected work across brand, product, and digital launches.
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((cs) => (
          <Link
            key={cs.slug}
            href={`/?work=${cs.slug}`}
            className="group overflow-hidden rounded-2xl transition-opacity hover:opacity-90"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-gray-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cs.heroImage}
                alt={cs.client}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
            <div className="pt-3">
              <div className="flex items-center gap-2 text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C]">
                <span>{cs.category}</span>
                {cs.comingSoon && (
                  <span className="rounded-full bg-gray-50 px-2 py-0.5 text-[12px] text-[#6b6b6b]">
                    Coming soon
                  </span>
                )}
              </div>
              <h2 className="mt-1 text-[16px] font-semibold tracking-[-0.32px] text-[#111111]">
                {cs.client}
              </h2>
              <p className="mt-0.5 text-[13px] leading-[1.45] text-[#6b6b6b]">
                {cs.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
