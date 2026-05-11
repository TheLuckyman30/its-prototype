import { create } from "zustand";
import { PAGES } from "../constants";
import type { JSX } from "react";

interface AppStore {
  currentPage: () => JSX.Element | null;
  setCurrentPage: (newPage: () => JSX.Element | null) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  currentPage: PAGES.questions,
  setCurrentPage: (newPage: () => JSX.Element | null) => {
    set({ currentPage: newPage });
  },
}));
