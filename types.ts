// ── Market ────────────────────────────────────────────────────────────────────
export interface MarketIndex {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePct: number;
  high: number;
  low: number;
  prevClose: number;
  sparkline?: number[];
}

export interface SectorCard {
  id: string;
  name: string;
  change: number;
  sentiment: "Bullish" | "Neutral" | "Bearish";
  insight: string;
  sparkline: number[];
  topStocks: string[];
}

// ── News ──────────────────────────────────────────────────────────────────────
export type NewsFilter =
  | "all" | "banking" | "nbfc" | "fintech" | "insurance"
  | "mutual-funds" | "capital-markets" | "rbi" | "ipo" | "economy";

export interface NewsItem {
  id: string;
  title: string;
  synopsis: string;
  source: "LiveMint" | "Economic Times" | "BusinessLine" | "Financial Express" | "NDTV Profit";
  sourceUrl: string;
  category: NewsFilter;
  publishedAt: string;     // ISO string
  imageUrl?: string;
  bookmarked?: boolean;
}

// ── Leadership ────────────────────────────────────────────────────────────────
export type LeaderRole = "MD" | "COO" | "DMD" | "ED" | "CFO" | "Board";

export interface Leader {
  id: string;
  name: string;
  role: LeaderRole;
  organization: string;
  orgType: "Bank" | "NBFC" | "Insurance" | "Fintech" | "MF" | "Capital Markets";
  shortBio: string;
  experience: string;
  previousOrgs: string[];
  tenure: string;
  appointedDate?: string;
  retirementDate?: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
}

// ── Regulatory ────────────────────────────────────────────────────────────────
export type Regulator = "RBI" | "SEBI" | "IRDAI" | "PFRDA" | "Finance Ministry";

export interface Circular {
  id: string;
  regulator: Regulator;
  title: string;
  summary: string;
  whyItMatters: string;
  effectiveDate: string;
  issuedDate: string;
  url: string;
  tags: string[];
}

// ── Brief ─────────────────────────────────────────────────────────────────────
export interface MorningBrief {
  date: string;
  topNews: string[];
  rbiUpdate: string;
  marketSummary: string;
  bfsiFunding: string;
  leadershipChanges: string;
}
