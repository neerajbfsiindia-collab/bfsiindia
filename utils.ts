import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatChange(v: number, showSign = true): string {
  const s = showSign && v > 0 ? "+" : "";
  return `${s}${v.toFixed(2)}`;
}

export function formatPct(v: number): string {
  const s = v > 0 ? "+" : "";
  return `${s}${v.toFixed(2)}%`;
}

export function formatINR(v: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(v);
}

export function timeAgo(iso: string): string {
  try {
    return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
  } catch {
    return iso;
  }
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

/** Strip "a", "the", normalize for fuzzy search */
export function normalizeQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/\b(a|the|an)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function changeColor(v: number) {
  return v >= 0 ? "text-fin-up" : "text-fin-down";
}

export function changeArrow(v: number) {
  return v >= 0 ? "↑" : "↓";
}

export function sentimentColor(s: "Bullish" | "Neutral" | "Bearish") {
  if (s === "Bullish") return "text-fin-up bg-fin-up/10";
  if (s === "Bearish") return "text-fin-down bg-fin-down/10";
  return "text-fin-gold bg-fin-gold/10";
}
