"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { site } from "../data/site";
import { usePreferences } from "./PreferencesProvider";

const WA_NUMBER = "212629516370";

type BookingContextValue = {
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

const EXPERIENCE_KEYS = ["quads", "buggies", "sunset", "private"] as const;
const EXTRA_KEYS = [
  "pickup",
  "dropoff",
  "photos",
  "tea",
  "privateGuide",
] as const;

const EXPERIENCE_IMAGES: Record<(typeof EXPERIENCE_KEYS)[number], string> = {
  quads: "/images/work/rio-quad/shot-08.jpg",
  buggies: "/images/work/rio-quad/shot-01.jpg",
  sunset: "/images/work/rio-quad/shot-02.jpg",
  private: "/images/work/rio-quad/shot-06.jpg",
};

const HERO_IMAGES = [
  "/images/work/rio-quad/shot-01.jpg",
  "/images/work/rio-quad/shot-02.jpg",
  "/images/work/rio-quad/shot-08.jpg",
] as const;

type ExperienceKey = (typeof EXPERIENCE_KEYS)[number];
type ExtraKey = (typeof EXTRA_KEYS)[number];

const STEPS = 5;

export function BookingProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const openBooking = useCallback(() => {
    router.push("/book");
  }, [router]);
  const value = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

/** Full-page booking flow · /book */
export function BookingPage() {
  const router = useRouter();
  const { t } = usePreferences();
  const b = t.booking;

  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [people, setPeople] = useState(2);
  const [experience, setExperience] = useState<ExperienceKey>("quads");
  const [extras, setExtras] = useState<ExtraKey[]>(["pickup"]);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const toggleExtra = (key: ExtraKey) => {
    setExtras((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const canNext =
    step === 0
      ? name.trim().length >= 2
      : step === 1
        ? people >= 1
        : step === 2
          ? !!experience
          : step === 3
            ? true
            : !!date;

  const sendWhatsApp = () => {
    const expLabel = b.experiences[experience];
    const extraLabels = extras.map((k) => b.extras[k]).join(", ") || "—";
    const msg = [
      "Hi Rio Quad. I'd like to book a tour.",
      `Name: ${name.trim()}`,
      `People: ${people}`,
      `Experience: ${expLabel}`,
      `Include: ${extraLabels}`,
      `Date: ${date}`,
      ...(notes.trim() ? [`Notes: ${notes.trim()}`] : []),
    ].join("\n");
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const onPrimary = () => {
    if (step < STEPS - 1) {
      if (!canNext) return;
      setStep((s) => s + 1);
      return;
    }
    if (!canNext) return;
    sendWhatsApp();
  };

  const onBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
      return;
    }
    router.push("/");
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background dark:bg-[#0c0c0c]">
      <header className="mx-auto flex w-full max-w-lg items-center justify-between px-5 pb-2 pt-[max(16px,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
          aria-label={site.fullName}
        >
          <Image
            src="/images/work/rio-quad/logo.png"
            alt={site.fullName}
            width={40}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 pb-3">
        <div className="mt-2 grid grid-cols-3 gap-1.5 overflow-hidden rounded-2xl">
          {HERO_IMAGES.map((src) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt=""
              className="h-[88px] w-full object-cover sm:h-[120px]"
            />
          ))}
        </div>

        <div className="pt-5">
          <h1
            id="booking-title"
            className="text-[26px] font-semibold tracking-[-0.5px] text-[#111] dark:text-white"
          >
            {b.title}
          </h1>
          <p className="mt-1 text-[14px] text-[#8C8C8C] dark:text-white/45">
            {b.subtitle}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all ${
                i === step
                  ? "w-5 bg-[#FF2B00]"
                  : i < step
                    ? "w-3 bg-[#FF2B00]/70"
                    : "w-2 bg-black/10 dark:bg-white/15"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 min-h-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              {step === 0 ? (
                <Field label={b.name}>
                  <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={b.namePlaceholder}
                    className={inputClass}
                    autoComplete="name"
                  />
                </Field>
              ) : null}

              {step === 1 ? (
                <Field label={b.people}>
                  <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-3 py-2 dark:bg-white/5">
                    <button
                      type="button"
                      className={stepperBtn}
                      onClick={() => setPeople((n) => Math.max(1, n - 1))}
                      aria-label="−"
                    >
                      −
                    </button>
                    <span className="text-[22px] font-semibold tabular-nums text-[#111] dark:text-white">
                      {people}
                    </span>
                    <button
                      type="button"
                      className={stepperBtn}
                      onClick={() => setPeople((n) => Math.min(20, n + 1))}
                      aria-label="+"
                    >
                      +
                    </button>
                  </div>
                </Field>
              ) : null}

              {step === 2 ? (
                <Field label={b.experience}>
                  <div className="flex flex-col gap-2">
                    {EXPERIENCE_KEYS.map((key) => {
                      const active = experience === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setExperience(key)}
                          className={`flex items-center gap-3 overflow-hidden rounded-2xl p-2 pe-4 text-left transition-colors ${
                            active
                              ? "bg-[#FF2B00] text-white"
                              : "bg-gray-50 text-[#111] dark:bg-white/5 dark:text-white"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={EXPERIENCE_IMAGES[key]}
                            alt=""
                            className="h-14 w-14 shrink-0 rounded-xl object-cover"
                          />
                          <span className="text-[15px] font-medium">
                            {b.experiences[key]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Field>
              ) : null}

              {step === 3 ? (
                <Field label={b.includes}>
                  <div className="flex flex-col gap-2">
                    {EXTRA_KEYS.map((key) => {
                      const on = extras.includes(key);
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => toggleExtra(key)}
                          className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors ${
                            on
                              ? "bg-[#FF2B00]/10 text-[#111] ring-1 ring-[#FF2B00]/40 dark:bg-[#FF2B00]/15 dark:text-white"
                              : "bg-gray-50 text-[#111] dark:bg-white/5 dark:text-white"
                          }`}
                        >
                          <span>{b.extras[key]}</span>
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                              on
                                ? "bg-[#FF2B00] text-white"
                                : "bg-black/5 text-transparent dark:bg-white/10"
                            }`}
                          >
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </Field>
              ) : null}

              {step === 4 ? (
                <div className="flex flex-col gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={EXPERIENCE_IMAGES[experience]}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl object-cover"
                  />
                  <Field label={b.date}>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={inputClass}
                      min={new Date().toISOString().slice(0, 10)}
                    />
                  </Field>
                  <Field label={b.notes}>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={b.notesPlaceholder}
                      rows={3}
                      className={`${inputClass} h-auto resize-none py-3`}
                    />
                  </Field>
                  <p className="text-[12px] leading-[1.45] text-[#8C8C8C] dark:text-white/40">
                    {name.trim()} · {people} · {b.experiences[experience]}
                    {extras.length
                      ? ` · ${extras.map((k) => b.extras[k]).join(", ")}`
                      : ""}
                    {notes.trim() ? ` · ${notes.trim()}` : ""}
                  </p>
                </div>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-lg gap-2 px-5 pb-[max(16px,env(safe-area-inset-bottom))] pt-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-gray-100 text-[15px] font-semibold text-[#111] dark:bg-white/10 dark:text-white"
        >
          {b.back}
        </button>
        <button
          type="button"
          onClick={onPrimary}
          disabled={!canNext}
          className="inline-flex h-12 flex-[1.4] items-center justify-center rounded-full bg-[#FF2B00] text-[15px] font-semibold text-white disabled:opacity-40"
        >
          {step === STEPS - 1 ? b.send : b.next}
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[13px] font-medium text-[#8C8C8C] dark:text-white/45">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "h-12 w-full rounded-2xl border-0 bg-gray-50 px-4 text-[16px] text-[#111] outline-none ring-0 placeholder:text-[#8C8C8C] focus:bg-gray-100 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:bg-white/10";

const stepperBtn =
  "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[20px] font-medium text-[#111] shadow-sm dark:bg-white/10 dark:text-white";
