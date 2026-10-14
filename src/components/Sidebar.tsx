"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "../data/site";
import { CtaButtons } from "./CtaButtons";
import { PastProjects } from "./PastProjects";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { usePreferences } from "./PreferencesProvider";

export function Sidebar() {
  const { t } = usePreferences();

  return (
    <div className="no-scrollbar flex flex-col px-4 pb-8 pt-[max(16px,env(safe-area-inset-top))] md:p-[32px] lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:pb-[32px] lg:pe-5 lg:ps-8 lg:pt-[32px]">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-5 flex flex-row items-start justify-between gap-4 md:mb-6"
      >
        <Image
          src="/images/work/rio-quad/logo.png"
          alt={site.fullName}
          width={56}
          height={44}
          className="h-10 w-auto object-contain md:h-12"
          priority
        />
      </motion.div>

      <div className="flex flex-col gap-5 md:gap-6">
        <div className="flex flex-col gap-3 md:gap-4">
          <h1 className="text-[22px] font-semibold leading-[1.25] tracking-[-0.6px] text-[#111111] dark:text-white md:text-[24px] md:leading-8">
            {t.headline}
          </h1>
          <p className="text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b] dark:text-white/55">
            {t.bio1}
          </p>
          <p className="text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b] dark:text-white/55">
            {t.bio2}
          </p>
          <p className="text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b] dark:text-white/55">
            {t.bio3}
          </p>
        </div>
        <div className="hidden lg:block">
          <CtaButtons />
        </div>
      </div>

      <div className="hidden lg:contents">
        <PastProjects />
        <Testimonials />
        <Faq />
      </div>
    </div>
  );
}
