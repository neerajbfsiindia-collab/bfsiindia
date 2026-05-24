import { initializeApp, getApps } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  increment,
  Timestamp,
} from "firebase/firestore";
import type { Leader, Circular } from "./types";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── Leadership ─────────────────────────────────────────────────────────────────
export async function searchLeaders(q: string): Promise<Leader[]> {
  const snap = await getDocs(collection(db, "leaders"));
  const all  = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Leader));
  const lq   = q.toLowerCase();
  return all.filter(
    (l) =>
      l.name.toLowerCase().includes(lq) ||
      l.organization.toLowerCase().includes(lq) ||
      l.role.toLowerCase() === lq
  );
}

export async function getLeader(id: string): Promise<Leader | null> {
  const snap = await getDoc(doc(db, "leaders", id));
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Leader) : null;
}

// ── Regulatory ─────────────────────────────────────────────────────────────────
export async function getCirculars(regulator?: string): Promise<Circular[]> {
  const col = collection(db, "circulars");
  const q   = regulator
    ? query(col, where("regulator", "==", regulator))
    : col;
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Circular));
}

// ── Visitor Counter ────────────────────────────────────────────────────────────
const today = () => new Date().toISOString().split("T")[0];

export async function incrementVisitorCount(): Promise<void> {
  const ref = doc(db, "analytics", `visitors-${today()}`);
  await setDoc(ref, { count: increment(1), date: today() }, { merge: true });
}

export async function getVisitorCount(): Promise<number> {
  const ref  = doc(db, "analytics", `visitors-${today()}`);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data().count as number) : 0;
}

// ── Bookmarks (localStorage fallback) ─────────────────────────────────────────
export function getBookmarks(): string[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("bfsi-bookmarks") || "[]");
}

export function toggleBookmark(id: string): boolean {
  const bm  = getBookmarks();
  const idx = bm.indexOf(id);
  if (idx > -1) { bm.splice(idx, 1); } else { bm.push(id); }
  localStorage.setItem("bfsi-bookmarks", JSON.stringify(bm));
  return idx === -1;
}
