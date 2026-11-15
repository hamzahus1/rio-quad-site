"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PortfolioItem } from "../data/site";

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/** Portfolio video: muted autoplay optional + title + slim custom bar */
export function PortfolioVideo({
  item,
  autoPlay = false,
}: {
  item: PortfolioItem;
  autoPlay?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrubbingRef = useRef(false);
  const [playing, setPlaying] = useState(autoPlay);
  const [muted, setMuted] = useState(true);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (!scrubbingRef.current) setCurrent(v.currentTime);
    };
    const onMeta = () => setDuration(v.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("durationchange", onMeta);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);

    let observer: IntersectionObserver | undefined;
    if (autoPlay) {
      // Only load/play when in view — big speed win on mobile
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            void v.play().catch(() => setPlaying(false));
          } else {
            v.pause();
          }
        },
        { rootMargin: "120px", threshold: 0.15 },
      );
      observer.observe(v);
    } else {
      v.pause();
      setPlaying(false);
    }

    return () => {
      observer?.disconnect();
      v.pause();
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("durationchange", onMeta);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, [autoPlay]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) void v.play();
    else v.pause();
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const seek = useCallback(
    (ratio: number) => {
      const v = videoRef.current;
      if (!v || !duration) return;
      const t = Math.min(1, Math.max(0, ratio)) * duration;
      v.currentTime = t;
      setCurrent(t);
    },
    [duration],
  );

  const onBarPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    seek((e.clientX - rect.left) / rect.width);
  };

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-[#111]">
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        autoPlay={autoPlay}
        muted
        loop
        playsInline
        preload="none"
        className="h-auto w-full cursor-pointer object-cover"
        onClick={togglePlay}
      />

      {/* Title. Ligthart / OmniSocials overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-black/55 via-black/20 to-transparent px-4 pb-10 pt-4 md:px-5 md:pt-5">
        <p className="text-[13px] font-medium tracking-[-0.2px] text-white drop-shadow md:text-[14px]">
          {item.title}
        </p>
      </div>

      {/* Custom control bar */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent px-2.5 pb-2.5 pt-8 sm:px-3 sm:pb-3 md:px-4 md:pb-3.5">
        <div className="flex items-center gap-1.5 text-white sm:gap-2.5">
          <button
            type="button"
            aria-label={playing ? "Pause" : "Play"}
            onClick={togglePlay}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-white/10 sm:h-7 sm:w-7"
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>

          <span className="hidden shrink-0 tabular-nums text-[11px] font-medium tracking-tight text-white/90 min-[380px]:inline md:text-[12px]">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          <div
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.floor(duration)}
            aria-valuenow={Math.floor(current)}
            tabIndex={0}
            className="group/bar relative mx-0.5 h-6 flex-1 cursor-pointer sm:mx-1 sm:h-5"
            onPointerDown={(e) => {
              scrubbingRef.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              onBarPointer(e);
            }}
            onPointerMove={(e) => {
              if (e.buttons === 1) onBarPointer(e);
            }}
            onPointerUp={() => {
              scrubbingRef.current = false;
            }}
            onPointerCancel={() => {
              scrubbingRef.current = false;
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") seek((current + 2) / duration);
              if (e.key === "ArrowLeft") seek((current - 2) / duration);
            }}
          >
            <div className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-white/25">
              <div
                className="relative h-full rounded-full bg-white"
                style={{ width: `${progress}%` }}
              >
                <span className="absolute -right-1.5 top-1/2 size-3 -translate-y-1/2 rounded-full bg-white opacity-100 shadow sm:opacity-0 sm:transition-opacity sm:group-hover/bar:opacity-100 sm:group-active/bar:opacity-100" />
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-white/10 sm:h-7 sm:w-7"
          >
            {muted ? <MuteIcon /> : <VolumeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z" />
    </svg>
  );
}

function VolumeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 010 7" />
      <path d="M18.5 5.5a9 9 0 010 13" />
    </svg>
  );
}

function MuteIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 5L6 9H2v6h4l5 4V5z" />
      <path d="M23 9l-6 6M17 9l6 6" />
    </svg>
  );
}
