import type { KnowledgeComponent, QuestionType } from "../interfaces";
import { create } from "zustand";
import kcs from "@data/kc.json";

interface QuizStore {
  currentQuestions: QuestionType[];
  currentKc: KnowledgeComponent;
  setCurrentQuestions: (newQuestions: QuestionType[]) => void;
  setCurrentKc: (newKc: KnowledgeComponent) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuestions: [],
  currentKc: kcs[0],
  setCurrentQuestions: (newQuestions: QuestionType[]) => {
    set({ currentQuestions: newQuestions });
  },
  setCurrentKc: (newKc: KnowledgeComponent) => {
    set({ currentKc: newKc });
  },
}));
