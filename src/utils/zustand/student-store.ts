import type { KnowledgeComponent, Quiz } from "@utils";
import { create } from "zustand";
import kcs from "@data/kc.json";

interface StudentStore {
  knowledgeComponents: KnowledgeComponent[];
  quizzes: Quiz[];
  updateKc: (updatedKc: KnowledgeComponent) => void;
  addQuiz: (newQuiz: Quiz) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  knowledgeComponents: kcs,
  quizzes: [],
  updateKc: (updatedKC: KnowledgeComponent) => {
    set((state) => ({
      knowledgeComponents: state.knowledgeComponents.map((kc) =>
        updatedKC.id === kc.id ? updatedKC : kc,
      ),
    }));
  },
  addQuiz: (newQuiz: Quiz) => {
    set((state) => ({ quizzes: { ...state.quizzes, newQuiz } }));
  },
}));
