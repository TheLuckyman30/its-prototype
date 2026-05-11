import { create } from "zustand";
import type { Quiz } from "../interfaces";

interface QuizStore {
  quiz: Quiz | null;
  setQuiz: (newQuiz: Quiz | null) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quiz: null,
  setQuiz: (newQuiz: Quiz | null) => {
    set({ quiz: newQuiz });
  },
}));
