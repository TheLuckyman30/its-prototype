import { create } from "zustand";
import { PAGES } from "@utils";
import type { JSX } from "react";

interface AppStore {
  currentPage: () => JSX.Element;
  setCurrentPage: (newPage: () => JSX.Element) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentPage: PAGES.questions,
  setCurrentPage: (newPage: () => JSX.Element) => {
    set({ currentPage: newPage });
  },
}));
