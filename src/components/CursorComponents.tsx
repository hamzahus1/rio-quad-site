"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, usePresence } from "framer-motion";

function CursorMark({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 4l7.5 16.5L13 14l6.5-1.5L4 4z" fill="currentColor" />
    </svg>
  );
}

function Stage({
  children,
  tone = "light",
  tall = false,
}: {
  children: React.ReactNode;
  tone?: "light" | "soft" | "softBlue" | "dark";
  tall?: boolean;
}) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl transition-all duration-200">
      <div
        className={`relative flex w-full justify-center ${
          tone === "dark"
            ? "bg-[#0a0a0a]"
            : tone === "softBlue"
              ? "bg-gray-100"
              : tone === "soft"
                ? "bg-gradient-to-br from-gray-50 to-gray-100"
                : "border border-gray-200 bg-white"
        } ${
          tall
            ? "min-h-[760px] items-start"
            : "min-h-[640px] items-center p-4 py-10 md:aspect-[16/10] md:min-h-0 md:py-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ─── 1. Workflow carousel (WorkflowsEmptyState) ─── */

type WorkflowCard = {
  title: string;
  subtitle: string;
  done: number;
  total: number;
  nextLabel: string;
  icons: string[];
};

const WORKFLOWS: WorkflowCard[] = [
  {
    title: "Agent · Auth refactor",
    subtitle: "Edits middleware + session",
    done: 12,
    total: 20,
    nextLabel: "in 2h",
    icons: ["⚡", "🔐"],
  },
  {
    title: "Composer · Rate limit",
    subtitle: "Applies automatically",
    done: 34,
    total: 50,
    nextLabel: "in 45m",
    icons: ["✦", "⏱"],
  },
  {
    title: "Inline · Type fixes",
    subtitle: "1 pass per weekday",
    done: 7,
    total: 20,
    nextLabel: "in 1h",
    icons: ["⌘", "K"],
  },
  {
    title: "Agent · Tests",
    subtitle: "Runs on new files",
    done: 21,
    total: 25,
    nextLabel: "in 3h",
    icons: ["🧪", "✓"],
  },
  {
    title: "Agent · Docs sync",
    subtitle: "Applies automatically",
    done: 18,
    total: 24,
    nextLabel: "in 90m",
    icons: ["📄", "↻"],
  },
];

const X_POS = { "-1": -348, "0": 0, "1": 348 } as const;
const SCALE = { "-1": 0.92, "0": 1, "1": 0.92 } as const;
const OPACITY = { "-1": 0.55, "0": 1, "1": 0.55 } as const;

function ProgressBar({
  percent,
  play,
  paused,
}: {
  percent: number;
  play: boolean;
  paused: boolean;
}) {
  return (
    <div
      className={`flex h-2 w-full overflow-hidden rounded-[3px] transition-colors duration-500 ${
        paused ? "bg-gray-200" : "bg-[#0F97FD]/25"
      }`}
    >
      <motion.div
        className={`h-full rounded-[3px] ${paused ? "bg-gray-400" : "bg-[#0F97FD]"}`}
        initial={false}
        animate={{ width: play ? `${percent}%` : "0%" }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: play ? 0.24 : 0,
        }}
      />
    </div>
  );
}

function WorkflowCardUI({
  card,
  skeleton,
}: {
  card: WorkflowCard;
  skeleton: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const percent = Math.round((card.done / card.total) * 100);

  return (
    <div className="group flex w-[340px] flex-col">
      <div className="relative z-10 overflow-hidden rounded-2xl bg-white shadow-[0_2px_2px_rgba(0,0,0,0.03),0_4px_10px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] transition-shadow duration-300 group-hover:ring-black/[0.06]">
        <div className="flex flex-col gap-3.5 px-4 pb-4 pt-5">
          <div className="flex w-full items-start justify-between">
            <div className="flex items-center gap-1.5">
              {card.icons.map((ic) => (
                <span
                  key={ic}
                  className={`grid size-[26px] place-items-center rounded-lg bg-gray-100 text-[12px] transition-opacity ${
                    paused || skeleton ? "opacity-50" : ""
                  }`}
                >
                  {skeleton ? "" : ic}
                </span>
              ))}
              <span className="ml-1 flex size-[26px] items-center justify-center rounded-lg bg-[#1f1f1f] text-white">
                <CursorMark className="h-3 w-3" />
              </span>
            </div>
            <span
              className={`relative flex shrink-0 items-center overflow-hidden rounded-full px-2 py-0.5 text-xs font-medium transition-colors ${
                paused
                  ? "bg-gray-100 text-gray-500"
                  : "bg-[#e4f5ea] text-[#0c8d3b]"
              }`}
            >
              {skeleton ? "····" : paused ? "Paused" : "Active"}
            </span>
          </div>

          <div className="flex w-full items-end justify-between">
            <div className="mt-1.5 flex flex-col">
              <p
                className={`text-sm font-semibold tracking-[-0.01em] text-gray-900 transition-opacity ${
                  paused ? "opacity-50" : ""
                }`}
              >
                {skeleton ? "············" : card.title}
              </p>
              <p
                className={`flex h-[20px] items-center text-[13px] text-gray-500 transition-opacity ${
                  paused ? "opacity-50" : ""
                }`}
              >
                {skeleton ? "········" : card.subtitle}
              </p>
            </div>
            <div
              className={`flex h-[20px] items-center justify-center gap-0.5 rounded-md px-[5px] text-[13px] transition-colors ${
                paused ? "bg-gray-500/10" : "bg-[#0F97FD]/10"
              }`}
            >
              <span
                className={`font-medium ${paused ? "text-gray-500" : "text-[#0566b0]"}`}
              >
                {card.done}
              </span>
              <span
                className={`font-medium ${paused ? "text-gray-500/50" : "text-[#0566b0]/50"}`}
              >
                /
              </span>
              <span
                className={`font-medium ${paused ? "text-gray-500/50" : "text-[#0566b0]/50"}`}
              >
                {card.total}
              </span>
            </div>
          </div>

          <ProgressBar percent={percent} play={!skeleton} paused={paused} />
        </div>
      </div>

      <div className="relative -mt-[18px] rounded-b-2xl bg-[#F6F6F6] pb-[9px] pl-4 pr-2.5 pt-[26px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <span className="grid size-3.5 place-items-center text-[11px]">
              {paused ? "⏸" : "⏱"}
            </span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={paused ? "paused" : card.nextLabel}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                className="relative top-[0.5px] text-[13px] font-medium"
              >
                {paused ? "Paused" : `Next: ${card.nextLabel}`}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={paused ? "Resume workflow" : "Pause workflow"}
              onClick={() => setPaused((p) => !p)}
              className="grid size-7 place-items-center rounded-lg bg-white text-gray-400 shadow-[0_2px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04] transition hover:text-gray-600"
            >
              {paused ? "▶" : "⏸"}
            </button>
            <button
              type="button"
              aria-label="Settings"
              className="grid size-7 place-items-center rounded-lg bg-white text-gray-400 shadow-[0_2px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]"
            >
              ⚙
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CursorComposer() {
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) return;
    const id = setInterval(() => setIndex((i) => i + 1), 3000);
    return () => clearInterval(id);
  }, [hovering]);

  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 1000);
    return () => clearTimeout(t);
  }, [index]);

  const len = WORKFLOWS.length;
  const positions: Record<number, -1 | 0 | 1> = {
    [((index - 1) % len + len) % len]: -1,
    [index % len]: 0,
    [(index + 1) % len]: 1,
  };

  return (
    <Stage tone="light">
      <section className="flex w-full items-center justify-center px-4 py-16 md:py-24">
        <motion.div
          className="flex w-full max-w-[774px] flex-col items-center gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className="relative flex h-[240px] w-full items-center justify-center overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 18%, black 82%, transparent 100%)",
            }}
          >
            <AnimatePresence initial={false}>
              {WORKFLOWS.map((card, i) => {
                if (!(i in positions)) return null;
                const pos = positions[i];
                return (
                  <motion.div
                    key={`${card.title}-${i}`}
                    className="absolute"
                    style={{ zIndex: pos === 0 ? 10 : 1 }}
                    initial={{ x: 480, scale: 0.85, opacity: 0 }}
                    animate={{
                      x: X_POS[String(pos) as "-1" | "0" | "1"],
                      scale: SCALE[String(pos) as "-1" | "0" | "1"],
                      opacity: OPACITY[String(pos) as "-1" | "0" | "1"],
                    }}
                    exit={{ x: -480, scale: 0.85, opacity: 0 }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
                  >
                    <WorkflowCardUI
                      card={card}
                      skeleton={pos === 1 || (pos === 0 && !ready)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <motion.div
            className="flex max-w-[400px] flex-col items-center gap-1"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h2 className="text-center text-xl font-semibold text-gray-900">
              Automate your agent workflows
            </h2>
            <p className="max-w-[420px] text-center text-[14px] leading-relaxed text-gray-500">
              Create a workflow to run Cursor agents across files on a schedule.
              Pause, resume, ship.
            </p>
          </motion.div>

          <motion.button
            type="button"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="mt-1 h-[36px] rounded-full bg-[#1f1f1f] px-5 text-[13px] font-semibold text-white"
          >
            Create Workflow
          </motion.button>
        </motion.div>
      </section>
    </Stage>
  );
}

/* ─── 2. Live chat (ChipsChatPreview parity) ─── */

type ChatMsg = {
  id: string;
  username: string;
  body: string;
  level?: number;
  replies?: number;
};

const CHAT_USERS = [
  "NightfallOwl",
  "Mirage",
  "Kagari",
  "RoyalFlush",
  "Luna_77",
  "ChipKing",
  "Sn0wflake",
  "VelvetRose",
  "Jkrightnow",
  "Trav",
  "TravYagoon",
  "Nic543",
  "Talkdh",
] as const;

const CHAT_POOL: Omit<ChatMsg, "id">[] = [
  {
    username: "NightfallOwl",
    body: "anyone else still chasing the crash after that last run? my brain literally will not let me log off",
    level: 42,
    replies: 2,
  },
  {
    username: "Mirage",
    body: "same. I said one more round like 45 mins ago",
    level: 18,
  },
  { username: "Kagari", body: "classic", level: 31, replies: 4 },
  {
    username: "RoyalFlush",
    body: "just got off a 200x on gates of olympus, still shaking",
    level: 55,
    replies: 2,
  },
  {
    username: "Luna_77",
    body: "stop it. I just deposited and zeus is ghosting me tonight",
    level: 12,
  },
  {
    username: "ChipKing",
    body: "patience pays. I grinded that game for an hour before anything came through",
    level: 67,
  },
  {
    username: "Sn0wflake",
    body: "is the rain still happening at the top of the hour?",
    level: 24,
  },
  {
    username: "VelvetRose",
    body: "should be, I see the timer ticking",
    level: 19,
  },
  {
    username: "Jkrightnow",
    body: "I'm an insomniac so I know all about the weird sleep schedules and no sleep at all",
    level: 33,
    replies: 1,
  },
  { username: "Trav", body: "send tip when", level: 8 },
  {
    username: "TravYagoon",
    body: "lol same, my sleep schedule hasn't made sense in years at this point",
    level: 29,
  },
  {
    username: "Nic543",
    body: "Haha, I use to haven't really done it in a long time! So don't feel bad xd",
    level: 14,
    replies: 1,
  },
  {
    username: "Talkdh",
    body: "Well I'd love to watch your stream next time you're on",
    level: 21,
  },
  { username: "Talkdh", body: "Thats what raccooon says...", level: 21 },
  { username: "Talkdh", body: "Btw - Lunnaaaa", level: 21 },
  { username: "ChipKing", body: "Howdy chippers", level: 67 },
  {
    username: "Mirage",
    body: "cursor just shipped the refactor. who wants review?",
    level: 18,
  },
  {
    username: "Kagari",
    body: "drop the PR link, I'm on it",
    level: 31,
    replies: 2,
  },
];

const INITIAL_CHAT: ChatMsg[] = CHAT_POOL.slice(0, 8).map((m, i) => ({
  ...m,
  id: `init-${i}`,
}));

type ChatHandle = {
  injectRandom: () => void;
  levelUp: () => void;
  reset: () => void;
};

function hue(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

const ChatColumn = forwardRef<
  ChatHandle,
  { autoIncoming: boolean; className?: string }
>(function ChatColumn({ autoIncoming, className = "" }, ref) {
  const [messages, setMessages] = useState<ChatMsg[]>(INITIAL_CHAT);
  const [levels, setLevels] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = { You: 7 };
    for (const m of INITIAL_CHAT) if (m.level) map[m.username] = m.level;
    return map;
  });
  const [flash, setFlash] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [scope, setScope] = useState<"Public" | "Mods">("Public");
  const [scopeOpen, setScopeOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const seq = useRef(0);

  const push = useCallback((msg: Omit<ChatMsg, "id">) => {
    seq.current += 1;
    setMessages((prev) => {
      const next = [
        ...prev,
        { ...msg, id: `m-${Date.now()}-${seq.current}` },
      ];
      return next.length > 40 ? next.slice(next.length - 40) : next;
    });
  }, []);

  const injectRandom = useCallback(() => {
    const pick = CHAT_POOL[Math.floor(Math.random() * CHAT_POOL.length)];
    push(pick);
  }, [push]);

  const levelUp = useCallback(() => {
    const last = [...messages].reverse().find((m) => m.username !== "You");
    const target = last?.username ?? CHAT_USERS[0];
    setLevels((prev) => {
      const next = (prev[target] ?? 1) + 1;
      setFlash(target);
      return { ...prev, [target]: next };
    });
  }, [messages]);

  const reset = useCallback(() => {
    setMessages(INITIAL_CHAT);
    const map: Record<string, number> = { You: 7 };
    for (const m of INITIAL_CHAT) if (m.level) map[m.username] = m.level;
    setLevels(map);
    setFlash(null);
    setDraft("");
  }, []);

  useImperativeHandle(ref, () => ({ injectRandom, levelUp, reset }), [
    injectRandom,
    levelUp,
    reset,
  ]);

  useEffect(() => {
    if (!autoIncoming) return;
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const n = Math.random();
      const delay =
        n < 0.15
          ? 1200 + 1800 * Math.random()
          : n < 0.7
            ? 2800 + 3200 * Math.random()
            : 5000 + 4000 * Math.random();
      timer = setTimeout(() => {
        if (!cancelled) {
          injectRandom();
          tick();
        }
      }, delay);
    };
    tick();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [autoIncoming, injectRandom]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!flash) return;
    const t = setTimeout(() => setFlash(null), 1400);
    return () => clearTimeout(t);
  }, [flash]);

  const send = () => {
    const body = draft.trim();
    if (!body) return;
    push({ username: "You", body, level: levels.You ?? 7 });
    setDraft("");
  };

  return (
    <div
      className={`relative flex w-[min(100%,380px)] flex-col overflow-hidden rounded-[22px] bg-[#0B1A10] text-white ${className}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <button
          type="button"
          className="text-[12px] font-medium text-white/60 transition hover:text-white"
        >
          ← Back to lobby
        </button>
        <div className="relative">
          <button
            type="button"
            aria-expanded={scopeOpen}
            onClick={() => setScopeOpen((o) => !o)}
            className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white/80"
          >
            {scope} ▾
          </button>
          {scopeOpen && (
            <div className="absolute right-0 top-8 z-20 overflow-hidden rounded-xl bg-[#13281a] py-1 shadow-xl ring-1 ring-white/10">
              {(["Public", "Mods"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setScope(s);
                    setScopeOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-[12px] hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div
        ref={listRef}
        className="scrollbar-hide flex-1 space-y-2.5 overflow-y-auto px-3 py-3"
      >
        <AnimatePresence initial={false}>
          {messages.map((m) => {
            const lvl = levels[m.username] ?? m.level ?? 1;
            const glowing = flash === m.username;
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-2"
              >
                <button
                  type="button"
                  aria-label={`Open ${m.username}'s profile`}
                  className="mt-0.5 h-7 w-7 shrink-0 rounded-full ring-1 ring-white/15"
                  style={{
                    background: `hsl(${hue(m.username)} 45% 38%)`,
                  }}
                />
                <div className="min-w-0 flex-1">
                  <div className="mb-0.5 flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      className={`text-[12px] font-semibold transition ${
                        glowing ? "text-[#FBB90B]" : "text-white/90"
                      }`}
                    >
                      {m.username}
                    </button>
                    <span
                      className={`rounded px-1 py-px text-[10px] font-bold tabular-nums ${
                        glowing
                          ? "bg-gradient-to-t from-[#ED9801] to-[#FBB90B] text-black"
                          : "bg-white/10 text-white/55"
                      }`}
                    >
                      Lv {lvl}
                    </span>
                    {m.replies ? (
                      <button
                        type="button"
                        className="rounded-full bg-white/5 px-1.5 text-[10px] font-medium text-white/45 hover:bg-white/10"
                      >
                        {m.replies}
                      </button>
                    ) : null}
                  </div>
                  <p className="text-[13px] leading-snug text-white/75">
                    {m.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 ring-1 ring-white/10">
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Type to chat here..."
            className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-white/35"
          />
          <button
            type="button"
            onClick={send}
            className="rounded-full bg-[#F54E00] px-3 py-1 text-[11px] font-bold text-black"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
});

function ChatControls({
  autoIncoming,
  onToggleAuto,
  onInjectMessage,
  onLevelUp,
  onReset,
}: {
  autoIncoming: boolean;
  onToggleAuto: () => void;
  onInjectMessage: () => void;
  onLevelUp: () => void;
  onReset: () => void;
}) {
  return (
    <div className="grid w-[280px] max-w-full grid-cols-2 gap-1.5 rounded-2xl border border-black/10 bg-white p-1.5 text-[12px] font-semibold text-gray-800 shadow-[0_4px_16px_rgba(0,0,0,0.08)] md:flex md:w-auto md:items-center md:rounded-full md:px-2 md:py-1.5">
      <button
        type="button"
        onClick={onToggleAuto}
        aria-pressed={autoIncoming}
        className={`flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1 transition-colors ${
          autoIncoming
            ? "bg-[#1D631A] text-white"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${
            autoIncoming ? "bg-[#7FE07F]" : "bg-gray-400"
          }`}
          aria-hidden
        />
        Auto chat {autoIncoming ? "on" : "off"}
      </button>
      <button
        type="button"
        onClick={onInjectMessage}
        className="rounded-full bg-gray-100 px-2.5 py-1 transition-colors hover:bg-gray-200"
      >
        + Message
      </button>
      <button
        type="button"
        onClick={onLevelUp}
        className="rounded-full bg-gradient-to-t from-[#ED9801] to-[#FBB90B] px-2.5 py-1 text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] transition-transform hover:brightness-105 active:scale-[0.97]"
      >
        Level up
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full bg-gray-100 px-2.5 py-1 transition-colors hover:bg-gray-200"
      >
        Reset
      </button>
    </div>
  );
}

export function CursorInlineEdit() {
  const chatRef = useRef<ChatHandle>(null);
  const [auto, setAuto] = useState(true);

  return (
    <Stage tone="soft" tall>
      <div className="flex w-full flex-col items-center gap-6 px-4 pb-10 pt-10 md:pt-14">
        <ChatColumn
          ref={chatRef}
          autoIncoming={auto}
          className="h-[640px] shadow-[0_18px_60px_rgba(0,0,0,0.20)]"
        />
        <ChatControls
          autoIncoming={auto}
          onToggleAuto={() => setAuto((a) => !a)}
          onInjectMessage={() => chatRef.current?.injectRandom()}
          onLevelUp={() => chatRef.current?.levelUp()}
          onReset={() => chatRef.current?.reset()}
        />
      </div>
    </Stage>
  );
}

/* ─── 3. Get Started checklist ─── */

type Step = {
  id: string;
  label: string;
  completed: boolean;
  detail: string;
};

const INITIAL_STEPS: Step[] = [
  {
    id: "composer",
    label: "Open Composer",
    completed: true,
    detail: "Cmd+I · describe the change you want Cursor to make.",
  },
  {
    id: "plan",
    label: "Review the plan",
    completed: false,
    detail: "Confirm files + approach before applying edits.",
  },
  {
    id: "accept",
    label: "Accept edits",
    completed: false,
    detail: "Cmd+Enter per file · keep what you like.",
  },
  {
    id: "checks",
    label: "Run checks",
    completed: false,
    detail: "Typecheck + tests in the agent terminal.",
  },
  {
    id: "commit",
    label: "Commit",
    completed: false,
    detail: "Ship the PR when the bar is green.",
  },
];

export function CursorAgentChecklist() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [height, setHeight] = useState(56);
  const bodyRef = useRef<HTMLDivElement>(null);

  const done = steps.filter((s) => s.completed).length;
  const total = steps.length;
  const allDone = done === total;
  const circumference = 2 * Math.PI * 11;
  const offset = circumference - (done / total) * circumference;
  const active = activeId ? steps.find((s) => s.id === activeId) : null;

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) {
      setHeight(56);
      return;
    }
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setHeight(56 + el.scrollHeight);
    const id = setTimeout(() => requestAnimationFrame(measure), 40);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      clearTimeout(id);
      ro.disconnect();
    };
  }, [open, activeId, steps]);

  useEffect(() => {
    if (!open || activeId) return;
    const id = setInterval(() => {
      setSteps((prev) => {
        const nextIncomplete = prev.findIndex((s) => !s.completed);
        if (nextIncomplete === -1) {
          return INITIAL_STEPS.map((s, i) => ({
            ...s,
            completed: i === 0,
          }));
        }
        return prev.map((s, i) =>
          i === nextIncomplete ? { ...s, completed: true } : s
        );
      });
    }, 1800);
    return () => clearInterval(id);
  }, [open, activeId]);

  return (
    <Stage tone="soft">
      <div className="flex w-full items-center justify-center px-4 py-10 md:py-0">
        <motion.div
          className="relative w-[340px] overflow-hidden bg-white"
          style={{
            borderRadius: 28,
            boxShadow: open
              ? "0 0 0 1px rgba(0,0,0,0.08), 0 4px 8px 0px rgba(22, 25, 29, 0.06), 0 12px 32px rgba(0,0,0,0.08)"
              : hovered
                ? "0 0 0 1px rgba(0,0,0,0.08), 0 4px 8px 0px rgba(22, 25, 29, 0.06), 0 8px 20px rgba(0,0,0,0.06)"
                : "0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px 0px rgba(22, 25, 29, 0.04)",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{ height }}
          transition={{ height: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } }}
        >
          <button
            type="button"
            onClick={() => {
              setOpen((o) => !o);
              setActiveId(null);
            }}
            aria-label={`Get Started ${done} of ${total} Completed`}
            className="group relative z-0 flex w-full cursor-pointer items-center gap-2 bg-white px-4"
            style={{ height: 56 }}
          >
            <svg width={29} height={29} viewBox="0 0 29 29" className="shrink-0">
              <circle
                cx={14.5}
                cy={14.5}
                r={11}
                fill="none"
                stroke="#DCECFD"
                strokeWidth={3.5}
              />
              <motion.circle
                cx={14.5}
                cy={14.5}
                r={11}
                fill="none"
                stroke="#3FA8F8"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: offset }}
                transform={`rotate(-90 ${14.5} ${14.5})`}
                transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
              />
            </svg>
            <span className="flex-1 text-left text-[15px] font-semibold text-gray-800">
              {allDone ? "All done!" : "Get Started"}
            </span>
            <span className="text-[13px] text-gray-400">
              {done} of {total} Completed
            </span>
            <motion.span
              className="mx-1 inline-flex text-gray-400"
              animate={{ rotate: open ? 90 : 0 }}
            >
              ›
            </motion.span>
          </button>

          <div ref={bodyRef}>
            {open && (
              <div className="px-3 pb-3">
                <AnimatePresence mode="wait" initial={false}>
                  {active ? (
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="rounded-2xl bg-gray-50 p-4"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveId(null)}
                        className="mb-2 text-[12px] font-medium text-gray-500"
                      >
                        ← Back
                      </button>
                      <p className="text-[15px] font-semibold text-gray-900">
                        {active.label}
                      </p>
                      <p className="mt-1 text-[13px] leading-relaxed text-gray-500">
                        {active.detail}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSteps((prev) =>
                            prev.map((s) =>
                              s.id === active.id
                                ? { ...s, completed: true }
                                : s
                            )
                          );
                          setActiveId(null);
                        }}
                        className="mt-4 h-[34px] rounded-full bg-[#1f1f1f] px-4 text-[13px] font-semibold text-white"
                      >
                        Mark complete
                      </button>
                    </motion.div>
                  ) : (
                    <motion.ul
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-1"
                    >
                      {steps.map((step) => (
                        <li key={step.id}>
                          <button
                            type="button"
                            onClick={() => setActiveId(step.id)}
                            className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-gray-50"
                          >
                            <span
                              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                                step.completed
                                  ? "bg-[#3FA8F8] text-white"
                                  : "border border-gray-200 text-transparent"
                              }`}
                            >
                              {step.completed ? "✓" : "·"}
                            </span>
                            <span
                              className={`text-[13px] font-medium ${
                                step.completed
                                  ? "text-gray-400 line-through"
                                  : "text-gray-800"
                              }`}
                            >
                              {step.label}
                            </span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Stage>
  );
}

/* ─── 4. Toasts showcase (ToastsShowcase) ─── */

const TOAST_STATES = [
  { key: "success", label: "Success" },
  { key: "info", label: "Informative" },
  { key: "error", label: "Error" },
] as const;

type ToastKey = (typeof TOAST_STATES)[number]["key"];

const TOAST_COPY: Record<
  ToastKey,
  { variant: ToastKey; title: string; description: string }
> = {
  success: {
    variant: "success",
    title: "Saved",
    description: "all changes synced",
  },
  info: {
    variant: "info",
    title: "Preview mode",
    description: "read-only",
  },
  error: {
    variant: "error",
    title: "Upload failed",
    description: "check your connection",
  },
};

function ToastCard({
  toast,
  onDismiss,
}: {
  toast: { id: string; variant: ToastKey; title: string; description: string };
  onDismiss: () => void;
}) {
  const [present, safeToRemove] = usePresence();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (present) {
      const id = requestAnimationFrame(() => setExpanded(true));
      return () => cancelAnimationFrame(id);
    }
    setExpanded(false);
    const t = setTimeout(() => safeToRemove?.(), 340);
    return () => clearTimeout(t);
  }, [present, safeToRemove]);

  const colors =
    toast.variant === "success"
      ? "bg-[#E8F8EE] text-[#0c8d3b] ring-[#0c8d3b]/15"
      : toast.variant === "error"
        ? "bg-[#FDECEC] text-[#C62828] ring-[#C62828]/15"
        : "bg-[#EEF5FF] text-[#0566b0] ring-[#0566b0]/15";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{
        opacity: expanded ? 1 : 0,
        y: expanded ? 0 : -8,
        scale: expanded ? 1 : 0.98,
      }}
      exit={{ opacity: 0, y: -10, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
      className={`pointer-events-auto flex min-w-[260px] items-start gap-3 rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ${colors}`}
    >
      <span className="mt-0.5 text-[14px] font-bold">
        {toast.variant === "success"
          ? "✓"
          : toast.variant === "error"
            ? "!"
            : "i"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-[#1f1f1f]">{toast.title}</p>
        <p className="text-[12px] text-[#6b6b6b]">{toast.description}</p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-[12px] text-gray-400 hover:text-gray-600"
      >
        ✕
      </button>
    </motion.div>
  );
}

export function CursorToastsShowcase() {
  const [toasts, setToasts] = useState<
    { id: string; variant: ToastKey; title: string; description: string }[]
  >([]);
  const [active, setActive] = useState<ToastKey>("error");
  const id = useId();
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>[]>>({});

  const clearTimers = useCallback((toastId: string) => {
    timers.current[toastId]?.forEach(clearTimeout);
    delete timers.current[toastId];
  }, []);

  const dismiss = useCallback(
    (toastId: string, delay = 0) => {
      const t = setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== toastId));
        clearTimers(toastId);
      }, delay);
      timers.current[toastId] = [...(timers.current[toastId] ?? []), t];
    },
    [clearTimers]
  );

  const show = useCallback(
    (key: ToastKey) => {
      setActive(key);
      const copy = TOAST_COPY[key];
      const toastId = "showcase-toast";
      clearTimers(toastId);
      setToasts((prev) => {
        const next = { ...copy, id: toastId };
        return prev.some((t) => t.id === toastId)
          ? prev.map((t) => (t.id === toastId ? next : t))
          : [next];
      });
      dismiss(toastId, 3200);
    },
    [clearTimers, dismiss]
  );

  useEffect(() => {
    show("error");
    return () => {
      Object.values(timers.current).forEach((arr) => arr.forEach(clearTimeout));
    };
  }, [show]);

  return (
    <Stage tone="soft">
      <div className="relative h-full min-h-[560px] w-full overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-12 z-20 flex max-w-[min(96%,520px)] -translate-x-1/2 flex-col items-center gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {toasts.map((t) => (
              <ToastCard
                key={t.id}
                toast={t}
                onDismiss={() => dismiss(t.id)}
              />
            ))}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div
            role="tablist"
            aria-label="Toast state"
            className="inline-flex items-center gap-0.5 rounded-full bg-black/[0.045] p-1"
          >
            {TOAST_STATES.map((s) => {
              const selected = active === s.key;
              return (
                <button
                  key={s.key}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => show(s.key)}
                  className={`relative isolate rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors duration-150 ${
                    selected
                      ? "text-[#1F1F1F]"
                      : "text-[#6E6E6E] hover:text-[#1F1F1F]"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId={`toast-state-indicator-${id}`}
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.05)]"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 34,
                        mass: 0.7,
                      }}
                    />
                  )}
                  <span className="relative">{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Stage>
  );
}

/* ─── Borrow panel (from DeFi demo video) ─── */

type Asset = {
  id: "USDC" | "USDG" | "GHO";
  symbol: string;
  available: number;
  apy: number;
  icon: string;
};

const ASSETS: Asset[] = [
  {
    id: "USDC",
    symbol: "USDC",
    available: 15000,
    apy: 2.94,
    icon: "/icons/crypto/usdc.png",
  },
  {
    id: "USDG",
    symbol: "USDG",
    available: 8500,
    apy: 4.12,
    icon: "/icons/crypto/usdg.svg",
  },
  {
    id: "GHO",
    symbol: "GHO",
    available: 12000,
    apy: 3.48,
    icon: "/icons/crypto/gho.svg",
  },
];

function formatAmount(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function AssetIcon({ asset, size = 22 }: { asset: Asset; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.icon}
      alt=""
      width={size}
      height={size}
      className="shrink-0 rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
}

function SwapArrows({ className = "" }: { className?: string }) {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 12 14"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M3.5 1.5V12.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M1.5 3.5L3.5 1.5L5.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12.5V1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6.5 10.5L8.5 12.5L10.5 10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

export function CursorBorrowPanel() {
  const [assetId, setAssetId] = useState<Asset["id"]>("USDC");
  const [amount, setAmount] = useState(15000);
  const [open, setOpen] = useState(false);
  const [pressedMax, setPressedMax] = useState(false);
  const asset = ASSETS.find((a) => a.id === assetId)!;
  const rootRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const aliveRef = useRef(true);

  const pauseDemo = useCallback(() => {
    pausedRef.current = true;
  }, []);

  // Smooth demo: type amounts, open menu, switch assets (pauses on user touch)
  useEffect(() => {
    aliveRef.current = true;

    const wait = async (ms: number) => {
      const step = 50;
      let left = ms;
      while (left > 0 && aliveRef.current) {
        if (pausedRef.current) {
          await sleep(120);
          continue;
        }
        await sleep(Math.min(step, left));
        left -= step;
      }
    };

    const typeTo = async (target: number) => {
      const digits = String(target);
      let built = "";
      for (const d of digits) {
        if (!aliveRef.current) return;
        while (pausedRef.current && aliveRef.current) await sleep(120);
        built += d;
        setAmount(Number(built));
        await wait(90);
      }
    };

    const run = async () => {
      await wait(900);
      while (aliveRef.current) {
        setOpen(false);
        setAssetId("USDC");
        setAmount(0);
        await wait(350);
        await typeTo(1574);
        await wait(700);
        setAmount(0);
        await wait(200);
        await typeTo(15000);
        await wait(600);
        setOpen(true);
        await wait(900);
        setAssetId("USDG");
        setOpen(false);
        setAmount(0);
        await wait(250);
        await typeTo(8500);
        await wait(800);
        setOpen(true);
        await wait(900);
        setAssetId("GHO");
        setOpen(false);
        setAmount(0);
        await wait(250);
        await typeTo(4200);
        await wait(1000);
        setAssetId("USDC");
        setAmount(15000);
        await wait(1600);
      }
    };

    void run();
    return () => {
      aliveRef.current = false;
    };
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const setMax = () => {
    pauseDemo();
    setPressedMax(true);
    setAmount(asset.available);
    window.setTimeout(() => setPressedMax(false), 180);
  };

  const onAmountChange = (raw: string) => {
    pauseDemo();
    const cleaned = raw.replace(/[^0-9]/g, "");
    const n = cleaned === "" ? 0 : Number(cleaned);
    setAmount(Math.min(n, asset.available * 2));
  };

  const usdLabel = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  return (
    <Stage tone="softBlue">
      <div className="flex w-full items-center justify-center px-4 py-10 md:py-0">
        <div
          ref={rootRef}
          className="relative w-full max-w-[440px]"
          onPointerDown={pauseDemo}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="rounded-[28px] bg-white p-3 shadow-[0_16px_48px_rgba(15,23,42,0.07)] md:p-4"
          >
            {/* nested shell like the video */}
            <div className="relative rounded-[22px] bg-gray-100/80 p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-[#8B95A8]">Borrow</p>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amount === 0 ? "" : formatAmount(amount)}
                    placeholder="0"
                    onChange={(e) => onAmountChange(e.target.value)}
                    className="mt-2 w-full min-w-0 bg-transparent text-[44px] font-semibold leading-none tracking-[-1.6px] text-[#0F172A] caret-[#5B8DEF] outline-none placeholder:text-[#C5CDD8] md:text-[48px]"
                    aria-label="Borrow amount"
                  />
                  <button
                    type="button"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] text-[#8B95A8] transition hover:text-[#5B667A]"
                  >
                    <SwapArrows className="text-[#A0AAB8]" />
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={usdLabel}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18 }}
                        className="tabular-nums"
                      >
                        {usdLabel}
                      </motion.span>
                    </AnimatePresence>
                  </button>
                </div>

                <div className="relative shrink-0 pt-1">
                  <motion.button
                    type="button"
                    onClick={() => {
                      pauseDemo();
                      setOpen((o) => !o);
                    }}
                    aria-expanded={open}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition hover:bg-white/90"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={asset.id}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.16 }}
                        className="inline-flex"
                      >
                        <AssetIcon asset={asset} size={22} />
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-[14px] font-semibold tracking-[-0.2px] text-[#0F172A]">
                      {asset.symbol}
                    </span>
                    <SwapArrows className="text-[#A0AAB8]" />
                  </motion.button>

                  <div className="mt-3 flex items-center justify-end gap-2 text-[12px] text-[#8B95A8]">
                    <span>
                      Available:{" "}
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={asset.available}
                          initial={{ opacity: 0, y: 3 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -3 }}
                          transition={{ duration: 0.16 }}
                          className="inline-block tabular-nums text-[#0F172A]"
                        >
                          {formatAmount(asset.available)}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="h-3 w-px bg-[#D5DBE6]" />
                    <motion.button
                      type="button"
                      onClick={setMax}
                      animate={{ scale: pressedMax ? 0.94 : 1 }}
                      className="inline-flex items-center gap-1.5 font-medium text-[#5B8DEF] transition hover:text-[#3B6FD9]"
                    >
                      <span
                        className="inline-flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#5B8DEF]/12 text-[8px] font-bold text-[#5B8DEF]"
                        aria-hidden
                      >
                        %
                      </span>
                      Max
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {open && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 460,
                          damping: 28,
                        }}
                        className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[156px] overflow-hidden rounded-2xl bg-white p-1.5 shadow-[0_18px_44px_rgba(15,23,42,0.14)]"
                      >
                        {ASSETS.map((a) => {
                          const selected = a.id === assetId;
                          return (
                            <button
                              key={a.id}
                              type="button"
                              onClick={() => {
                                pauseDemo();
                                setAssetId(a.id);
                                setAmount((prev) => Math.min(prev || a.available, a.available));
                                setOpen(false);
                              }}
                              className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left transition ${
                                selected ? "bg-gray-100" : "hover:bg-gray-50"
                              }`}
                            >
                              <AssetIcon asset={a} size={22} />
                              <span className="flex-1 text-[14px] font-semibold tracking-[-0.2px] text-[#0F172A]">
                                {a.symbol}
                              </span>
                              {selected ? (
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                  aria-hidden
                                  className="text-[#5B8DEF]"
                                >
                                  <path
                                    d="M3 7.2L5.8 10L11 4"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : null}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
                <span className="text-[13px] text-[#8B95A8]">Borrow APY</span>
                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold tabular-nums tracking-[-0.2px] text-[#0F172A]">
                  <span
                    className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#F5C542] text-[9px] font-bold text-[#111]"
                    aria-hidden
                  >
                    ✦
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={asset.apy}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      {asset.apy.toFixed(2)}%
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Stage>
  );
}

/* ─── Command menu / context menu ─── */

type CmdItem = {
  id: string;
  label: string;
  shortcut?: string;
  icon: "check" | "mail" | "video" | "lock" | "cut" | "copy" | "dup" | "trash" | "none";
  tone?: "default" | "accent" | "muted" | "danger";
  trailing?: "info";
  indent?: boolean;
};

const CMD_SECTIONS: CmdItem[][] = [
  [
    { id: "yes", label: "Yes", shortcut: "⌘Y", icon: "check", tone: "accent", indent: true },
    { id: "no", label: "No", shortcut: "⌘N", icon: "none", indent: true },
    { id: "maybe", label: "Maybe", shortcut: "⌘M", icon: "none", indent: true },
  ],
  [
    { id: "email", label: "Email participant", shortcut: "⌘E", icon: "mail" },
    { id: "meet", label: "Join Google Meet meeting", shortcut: "⌘J", icon: "video" },
  ],
  [
    { id: "lock", label: "Lock event", icon: "lock", tone: "muted", trailing: "info" },
  ],
  [
    { id: "cut", label: "Cut", shortcut: "⌘X", icon: "cut" },
    { id: "copy", label: "Copy", shortcut: "⌘C", icon: "copy" },
    { id: "dup", label: "Duplicate", shortcut: "⌘D", icon: "dup" },
  ],
  [
    { id: "delete", label: "Delete", shortcut: "⌫", icon: "trash", tone: "danger" },
  ],
];

function CmdIcon({ name, className }: { name: CmdItem["icon"]; className?: string }) {
  const c = className ?? "h-[15px] w-[15px]";
  switch (name) {
    case "check":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3.5 8.2 6.4 11l6.1-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "mail":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="2" y="3.5" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="m2.5 4.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "video":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="1.5" y="4" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="m10.5 7 3.5-2v6L10.5 9" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );
    case "lock":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="3.5" y="7" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "cut":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <circle cx="4.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="11.5" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M6 11 13 3M10 11 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "copy":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="5" y="5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3.5 11V3.5A1.5 1.5 0 0 1 5 2h6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "dup":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <rect x="4.5" y="4.5" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M8.5 7.5v3M7 9h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M3.5 10.5V3.5A1.5 1.5 0 0 1 5 2h6" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "trash":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" aria-hidden>
          <path d="M3 4.5h10M6 4.5V3.2A1.2 1.2 0 0 1 7.2 2h1.6A1.2 1.2 0 0 1 10 3.2V4.5M4.5 4.5l.7 8.2A1.2 1.2 0 0 0 6.4 14h3.2a1.2 1.2 0 0 0 1.2-1.3l.7-8.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    default:
      return <span className={c} aria-hidden />;
  }
}

export function CursorCommandMenu() {
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState("yes");
  const [flash, setFlash] = useState<string | null>(null);

  const flat = useMemo(
    () =>
      CMD_SECTIONS.flat().filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query]
  );

  const sections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CMD_SECTIONS;
    return CMD_SECTIONS.map((s) =>
      s.filter((item) => item.label.toLowerCase().includes(q))
    ).filter((s) => s.length > 0);
  }, [query]);

  useEffect(() => {
    if (query) return;
    const order = CMD_SECTIONS.flat().map((i) => i.id);
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % order.length;
      setActiveId(order[i]);
    }, 1600);
    return () => clearInterval(id);
  }, [query]);

  useEffect(() => {
    if (!flat.some((i) => i.id === activeId) && flat[0]) {
      setActiveId(flat[0].id);
    }
  }, [flat, activeId]);

  const run = (id: string) => {
    setActiveId(id);
    setFlash(id);
    setTimeout(() => setFlash(null), 500);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = flat.findIndex((i) => i.id === activeId);
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = flat[(idx + 1) % flat.length];
      if (next) setActiveId(next.id);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = flat[(idx - 1 + flat.length) % flat.length];
      if (next) setActiveId(next.id);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (flat[idx]) run(flat[idx].id);
    }
  };

  return (
    <Stage tone="soft">
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 md:py-0">
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 28 }}
          className="w-full max-w-[320px] overflow-hidden rounded-[14px] border border-black/[0.08] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.10),0_2px_8px_rgba(0,0,0,0.04)]"
          onKeyDown={onKeyDown}
        >
          <div className="border-b border-black/[0.06] px-3.5 py-2.5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="w-full bg-transparent text-[14px] text-[#1f1f1f] outline-none placeholder:text-[#A3A3A3]"
              aria-label="Ask anything"
            />
          </div>

          <div className="max-h-[420px] overflow-y-auto py-1.5">
            {sections.length === 0 && (
              <p className="px-3.5 py-6 text-center text-[13px] text-[#8C8C8C]">
                No results
              </p>
            )}
            {sections.map((section, si) => (
              <div key={si}>
                {si > 0 && <div className="my-1.5 border-t border-black/[0.06]" />}
                <ul className="px-1.5">
                  {section.map((item) => {
                    const active = activeId === item.id;
                    const isAccent =
                      item.tone === "accent" ||
                      (active && item.tone !== "danger" && item.tone !== "muted");
                    const isDanger = item.tone === "danger";
                    const isMuted = item.tone === "muted";
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          disabled={isMuted}
                          onMouseEnter={() => !isMuted && setActiveId(item.id)}
                          onClick={() => !isMuted && run(item.id)}
                          className={`flex w-full items-center gap-2.5 rounded-[8px] px-2.5 py-[7px] text-left text-[13.5px] transition-colors ${
                            item.indent ? "pl-3" : ""
                          } ${
                            active && !isMuted
                              ? isDanger
                                ? "bg-red-50"
                                : "bg-[#EEF5FF]"
                              : "bg-transparent"
                          } ${flash === item.id ? "scale-[0.99]" : ""} ${
                            isMuted ? "cursor-default opacity-55" : ""
                          }`}
                        >
                          <span
                            className={`flex h-4 w-4 shrink-0 items-center justify-center ${
                              isDanger
                                ? "text-[#E5484D]"
                                : isAccent && active
                                  ? "text-[#2B7FFF]"
                                  : isMuted
                                    ? "text-[#A3A3A3]"
                                    : "text-[#5C5C5C]"
                            }`}
                          >
                            {item.icon !== "none" && <CmdIcon name={item.icon} />}
                          </span>
                          <span
                            className={`min-w-0 flex-1 truncate font-medium tracking-[-0.2px] ${
                              isDanger
                                ? "text-[#E5484D]"
                                : isAccent && active
                                  ? "text-[#2B7FFF]"
                                  : isMuted
                                    ? "text-[#8C8C8C]"
                                    : "text-[#1f1f1f]"
                            }`}
                          >
                            {item.label}
                          </span>
                          {item.trailing === "info" ? (
                            <span
                              className="flex h-4 w-4 items-center justify-center rounded-full border border-[#CFCFCF] text-[10px] font-semibold text-[#8C8C8C]"
                              aria-hidden
                            >
                              i
                            </span>
                          ) : item.shortcut ? (
                            <span className="shrink-0 text-[12px] tabular-nums text-[#A3A3A3]">
                              {item.shortcut}
                            </span>
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
        <p className="mt-6 text-center text-[13px] text-[#8C8C8C]">
          Command menu · type to filter · ↑↓ Enter
        </p>
      </div>
    </Stage>
  );
}

