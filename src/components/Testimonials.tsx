"use client";

import { useEffect, useState } from "react";
import { featuredTestimonials as testimonials } from "../data/site";
import { usePreferences } from "./PreferencesProvider";

export function Testimonials() {
  const { t: copy } = usePreferences();
  const [index, setIndex] = useState(0);
  const review = testimonials[index];

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-12 flex flex-col gap-4">
      <p className="text-[13px] font-medium tracking-[-0.32px] text-[#8C8C8C] dark:text-white/45">
        {copy.ridersSay}
      </p>
      <div className="relative min-h-[180px]">
        <blockquote className="text-[15px] leading-[1.55] tracking-[-0.32px] text-[#1f1f1f] dark:text-white/90">
          &ldquo; {review.text} &rdquo;
        </blockquote>
        <div className="mt-4 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={review.image}
            alt={review.name}
            width={28}
            height={28}
            className="size-7 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <span className="text-[13px] font-medium tracking-[-0.32px] text-[#1f1f1f] dark:text-white">
              {review.name}
            </span>
            <span className="text-[13px] tracking-[-0.32px] text-[#8C8C8C] dark:text-white/45">
              {review.title}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 overflow-hidden rounded-full transition-all ${
                i === index ? "w-6 bg-[#FF2B00]" : "w-1.5 bg-gray-300 dark:bg-white/25"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() =>
            setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
          }
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
        >
          <ChevronLeft />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M15 18l-6-6 6-6"
        stroke="#1f1f1f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 18l6-6-6-6"
        stroke="#1f1f1f"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
