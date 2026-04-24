export interface LadderItem {
  emoji: string;
  label: string;
}

export const ALL_ITEMS: LadderItem[] = [
  { emoji: "🧾", label: "Old receipts" },
  { emoji: "🖊️", label: "Broken pens" },
  { emoji: "📰", label: "Old magazines" },
  { emoji: "👕", label: "Clothes that don't fit" },
  { emoji: "🎁", label: "Gifts never used" },
  { emoji: "📦", label: "Empty boxes" },
  { emoji: "🔋", label: "Old cables" },
  { emoji: "🧸", label: "Old toys" },
  { emoji: "💊", label: "Expired medicines" },
  { emoji: "📚", label: "Books I'll never read" },
  { emoji: "👟", label: "Old shoes" },
  { emoji: "🗂️", label: "Old paperwork" },
  { emoji: "💿", label: "Old CDs or DVDs" },
  { emoji: "🪴", label: "Broken household items" },
  { emoji: "📷", label: "Duplicate printed photos" },
];

export interface SessionData {
  step: number;
  beforeAnxiety: number;
  afterAnxiety: number;
  action: string;
  date: string;
}

export interface LadderData {
  items: LadderItem[];
  currentStep: number;
  sessions: SessionData[];
}

export const STORAGE_KEY = "discard_ladder";

export function loadLadder(): LadderData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return null;
}

export function saveLadder(data: LadderData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
