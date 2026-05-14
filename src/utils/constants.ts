import { EndScreen, Home, Questions } from "@pages";

export const PAGES = { questions: Questions, endScreen: EndScreen, home: Home };

export const CATEGORY_MAP: Record<string, string> = {
  "cat-1": "cat-2",
  "cat-2": "cat-3",
};

export type Pages = typeof PAGES;

export const isExcellentLevel = (pKnown: number) => pKnown >= 0.9;

export const isAdequateLevel = (pKnown: number) =>
  pKnown >= 0.75 && pKnown < 0.9;

export const isNoneLevel = (pKnown: number) => pKnown < 0.75;
