"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  itinerarySteps,
  portfolio,
  site,
  testimonials,
  TABS,
  type PortfolioItem,
  type Tab,
} from "../data/site";
import { PortfolioVideo } from "./PortfolioVideo";
import { HeaderControls } from "./HeaderControls";
import { usePreferences } from "./PreferencesProvider";

function MediaCard({
  item,
  masonry = false,
  index = 0,
}: {
  item: PortfolioItem;
  masonry?: boolean;
  index?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce || index > 3 ? ["0%", "0%"] : ["8%", "-8%"],
  );
  const imgScale = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    reduce || index > 3 ? [1, 1, 1] : [1.08, 1.02, 1.08],
  );

  const reveal = reduce
    ? undefined
    : {
        initial: { y: 16, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        viewport: { once: true, amount: 0.12, margin: "0px 0px -24px 0px" },
        transition: {
          type: "spring" as const,
          stiffness: 280,
          damping: 30,
          delay: Math.min(index * 0.03, 0.18),
        },
      };

  if (item.type === "video") {
    return (
      <motion.div
        ref={ref}
        {...reveal}
        className={masonry ? "mb-3 break-inside-avoid md:mb-4" : ""}
      >
        {/* Only the first video autoplays — big mobile win */}
        <PortfolioVideo item={item} autoPlay={index === 0} />
      </motion.div>
    );
  }

  const priority = index < 2;
  const inner = (
    <motion.div
      ref={ref}
      {...reveal}
      whileHover={reduce ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className={`group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-white/5 ${
        masonry ? "mb-3 break-inside-avoid md:mb-4" : ""
      }`}
      style={{ contentVisibility: index > 4 ? "auto" : undefined }}
    >
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4]"
        style={{ y: imgY, scale: imgScale }}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 42vw"
          quality={68}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          className="object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent p-3 opacity-100 translate-y-0 transition-all duration-300 md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:p-4">
        <span className="text-[13px] font-medium text-white drop-shadow-md md:text-[14px]">
          {item.title}
        </span>
      </div>
    </motion.div>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="block" scroll={false}>
        {inner}
      </Link>
    );
  }

  return inner;
}

function mixMedia(items: PortfolioItem[]): PortfolioItem[] {
  const images = items.filter((p) => p.type === "image");
  const videos = items.filter((p) => p.type === "video");
  const mixed: PortfolioItem[] = [];
  let ii = 0;
  let vi = 0;
  // Auto placement: ~2 photos, then 1 video, repeat
  while (ii < images.length || vi < videos.length) {
    for (let n = 0; n < 2 && ii < images.length; n++) {
      mixed.push(images[ii++]);
    }
    if (vi < videos.length) mixed.push(videos[vi++]);
  }
  return mixed;
}

function PhotosView() {
  const intro = portfolio.find((p) => p.src.includes("/intro.mp4"));
  const mixed = mixMedia(
    portfolio.filter(
      (p) =>
        p.tags.includes("Photos") &&
        (p.type === "image" || p.type === "video") &&
        p.src !== intro?.src,
    ),
  );

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {intro ? <MediaCard item={intro} /> : null}
      <div className="columns-2 gap-2 sm:gap-3 md:gap-4 lg:columns-3">
        {mixed.map((item, i) => (
          <MediaCard
            key={item.src + item.title}
            item={item}
            masonry
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function ExperienceView() {
  const { t, tf } = usePreferences();
  const steps = itinerarySteps.map((step, i) => ({
    n: i + 1,
    image: step.image,
    ...t.itinerary[step.key],
  }));

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl bg-gray-50 px-5 py-6 md:px-6 dark:bg-white/5">
        <h2 className="text-[22px] font-semibold tracking-[-0.5px] text-[#111] dark:text-white">
          {t.experienceTitle}
        </h2>
        <p className="mt-2 max-w-2xl text-[15px] leading-[1.55] tracking-[-0.32px] text-[#6b6b6b] dark:text-white/60">
          {tf(t.experienceBody, { hours: site.hours })}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/book"
            className="inline-flex h-[34px] items-center rounded-full bg-[#FF2B00] px-4 text-[13px] font-semibold text-white hover:bg-[#e52600]"
          >
            {t.bookTour}
          </a>
          <a
            href={site.googleLocationUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[34px] items-center rounded-full bg-white px-4 text-[13px] font-semibold text-[#1f1f1f] dark:bg-white/10 dark:text-white"
          >
            {t.locationCta}
          </a>
        </div>
      </div>

      <ol className="relative ms-2 list-none ps-7 md:ms-4 md:ps-10">
        <span
          aria-hidden
          className="absolute bottom-3 start-[9px] top-3 w-px bg-[#D1D5DB] md:start-[15px] dark:bg-white/15"
        />
        {steps.map((step, i) => (
          <motion.li
            key={step.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: i * 0.05,
              type: "spring",
              stiffness: 280,
              damping: 28,
            }}
            className={`relative ${i < steps.length - 1 ? "mb-4 md:mb-5" : ""}`}
          >
            <span className="absolute -start-7 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#111] text-[12px] font-semibold text-white md:-start-10 md:top-4 md:h-7 md:w-7 md:text-[13px] dark:bg-white dark:text-[#111]">
              {step.n}
            </span>
            <article className="overflow-hidden rounded-xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] dark:bg-white/[0.06] dark:shadow-none dark:ring-1 dark:ring-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={step.image}
                alt={step.title}
                className="aspect-[16/10] w-full object-cover sm:aspect-[16/9]"
                loading="lazy"
              />
              <div className="p-3.5 sm:p-4 md:p-5">
                <h3 className="text-[15px] font-semibold tracking-[-0.35px] text-[#111] dark:text-white sm:text-[16px] md:text-[17px]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.55] tracking-[-0.2px] text-[#6b6b6b] sm:text-[14px] dark:text-white/55">
                  {step.body}
                </p>
                <p className="mt-3 text-[13px] font-semibold tracking-[-0.25px] text-[#111] sm:text-[14px] dark:text-white">
                  {step.minutes}
                </p>
                <p className="mt-1.5 text-[12px] font-medium tracking-[-0.2px] text-[#FF2B00] sm:text-[13px]">
                  {step.included}
                </p>
              </div>
            </article>
          </motion.li>
        ))}
      </ol>

      <div>
        <h2 className="text-[20px] font-semibold tracking-[-0.45px] text-[#111] dark:text-white md:text-[22px]">
          {t.includedTitle}
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {t.includedItems.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl bg-gray-50 px-4 py-3 text-[14px] font-medium tracking-[-0.25px] text-[#111] dark:bg-white/5 dark:text-white"
            >
              <span className="mt-0.5 text-[#FF2B00]" aria-hidden>
                •
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ReviewsView() {
  const { t, tf } = usePreferences();

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <div className="rounded-2xl bg-gray-50 px-5 py-5 dark:bg-white/5">
        <p className="text-[13px] font-medium text-[#8C8C8C] dark:text-white/45">
          {t.googleReviews}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <p className="text-[28px] font-semibold tracking-[-0.6px] text-[#111] dark:text-white">
            {site.rating}
          </p>
          <div
            className="flex items-center gap-0.5"
            aria-label={`${site.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(Number(site.rating))} />
            ))}
          </div>
          <span className="text-[16px] font-medium text-[#8C8C8C] dark:text-white/45">
            {tf(t.reviewsCount, { count: site.reviewCount })}
          </span>
        </div>
        <a
          href={site.googleReviewsUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex text-[13px] font-semibold text-[#1f1f1f] underline decoration-gray-300 underline-offset-2 dark:text-white dark:decoration-white/20"
        >
          {t.readOnMaps}
        </a>
      </div>

      <div className="columns-2 gap-2 sm:gap-3 md:gap-4 lg:columns-3">
        {testimonials.map((rev) => {
          const photos: string[] =
            "photos" in rev && Array.isArray((rev as { photos?: unknown }).photos)
              ? [...((rev as { photos: readonly string[] }).photos)]
              : [];
          return (
            <motion.blockquote
              key={rev.name + rev.text.slice(0, 24)}
              initial={{ y: 18, opacity: 0, filter: "blur(8px)" }}
              whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="mb-3 break-inside-avoid overflow-hidden rounded-2xl bg-gray-50 md:mb-4 dark:bg-white/5"
            >
              {photos.length === 1 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photos[0]}
                  alt={`Photo from ${rev.name}'s review`}
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
              ) : null}
              {photos.length > 1 ? (
                <div className="grid grid-cols-2 gap-0.5">
                  {photos.slice(0, 4).map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt={`Photo from ${rev.name}'s review`}
                      className={`w-full object-cover ${
                        photos.length === 3 && src === photos[0]
                          ? "col-span-2 aspect-[16/10]"
                          : "aspect-square"
                      }`}
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : null}

              <div className="p-4">
                <p className="text-[14px] leading-[1.55] tracking-[-0.32px] text-[#1f1f1f] dark:text-white/90">
                  “ {rev.text} ”
                </p>
                <footer className="mt-3 flex items-center gap-2.5 text-[13px] text-[#8C8C8C] dark:text-white/45">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rev.image}
                    alt={rev.name}
                    className="size-8 shrink-0 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span>
                    <span className="font-medium text-[#1f1f1f] dark:text-white">
                      {rev.name}
                    </span>
                    <span className="mx-1.5">·</span>
                    {rev.title}
                  </span>
                </footer>
              </div>
            </motion.blockquote>
          );
        })}
      </div>
    </div>
  );
}

export function PortfolioGallery({
  selectedTag,
  onTagChange,
}: {
  selectedTag: Tab;
  onTagChange: (tag: Tab) => void;
}) {
  const { t } = usePreferences();

  return (
    <div className="flex min-w-0 flex-1 flex-col px-3 pb-4 pt-2 md:py-[32px] md:pe-[32px] md:ps-4 lg:ps-5 lg:pt-[32px]">
      <div className="sticky top-0 z-30 -mx-3 mb-3 flex items-center justify-between gap-2 bg-background/85 px-3 py-2.5 backdrop-blur-xl sm:gap-3 md:-ms-4 md:-me-8 md:mb-4 md:ps-4 md:pe-8 md:py-3 lg:-ms-5 lg:ps-5">
        <div className="scrollbar-hide min-w-0 flex-1 overflow-x-auto">
          <div className="inline-flex w-max gap-0.5 rounded-full bg-gray-100 p-1 dark:bg-white/10 sm:gap-1">
            {TABS.map((tab) => {
              const active = tab === selectedTag;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onTagChange(tab)}
                  className={`inline-flex min-h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-medium tracking-[-0.32px] transition-colors sm:min-h-0 sm:px-3 sm:py-1.5 ${
                    active
                      ? "bg-white text-[#1f1f1f] shadow-sm dark:bg-[#1f1f1f] dark:text-white dark:shadow-none"
                      : "text-[#8C8C8C] hover:text-[#1f1f1f] dark:text-white/50 dark:hover:text-white"
                  }`}
                >
                  {t.tabs[tab]}
                </button>
              );
            })}
          </div>
        </div>
        <HeaderControls />
      </div>

      <div className="w-full min-w-0">
        {selectedTag === "Photos" ? <PhotosView /> : null}
        {selectedTag === "Experience" ? <ExperienceView /> : null}
        {selectedTag === "Reviews" ? <ReviewsView /> : null}
      </div>
    </div>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden
      className={filled ? "text-[#FBBC04]" : "text-[#D1D5DB] dark:text-white/20"}
    >
      <path
        fill="currentColor"
        d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"
      />
    </svg>
  );
}
