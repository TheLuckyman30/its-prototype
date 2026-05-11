import { EndScreen, Questions } from "@pages";

export const PAGES = { questions: Questions, endScreen: EndScreen };

export const CATEGORY_MAP: Record<string, string> = {
  "cat-1": "cat-2",
  "cat-2": "cat-3",
};

export type Pages = typeof PAGES;
