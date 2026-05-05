import type { Category, KnowledgeComponent, Quiz } from "@utils";
import { create } from "zustand";
import kcs from "@data/kc.json";
import categories from "@data/categories.json";

interface StudentStore {
  knowledgeComponents: KnowledgeComponent[];
  quizzes: Quiz[];
  currentCategory: Category;
  updateKc: (updatedKc: KnowledgeComponent) => void;
  addQuiz: (newQuiz: Quiz) => void;
  setCurrentCategory: (newCategory: Category) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  knowledgeComponents: kcs,
  quizzes: [],
  currentCategory: categories[0],
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
  setCurrentCategory: (newCategory: Category) => {
    set({ currentCategory: newCategory });
  },
}));
