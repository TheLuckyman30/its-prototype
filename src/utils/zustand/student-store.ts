import type { Category, KnowledgeComponent, Quiz } from "../interfaces";
import { create } from "zustand";
import kcs from "@data/kc.json";
import categories from "@data/categories.json";

interface StudentStore {
  knowledgeComponents: KnowledgeComponent[];
  categories: Category[];
  quizzes: Quiz[];
  currentCategory: Category;
  updateKc: (updatedKc: KnowledgeComponent) => void;
  updateCategory: (updatedCategory: Category) => void;
  addQuiz: (newQuiz: Quiz) => void;
  setCurrentCategory: (newCategory: Category) => void;
}

export const useStudentStore = create<StudentStore>((set) => ({
  knowledgeComponents: kcs,
  categories: categories,
  quizzes: [],
  currentCategory: categories[0],
  updateKc: (updatedKC: KnowledgeComponent) => {
    set((state) => ({
      knowledgeComponents: state.knowledgeComponents.map((kc) =>
        updatedKC.id === kc.id ? updatedKC : kc,
      ),
    }));
  },
  updateCategory: (updatedCategory: Category) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        updatedCategory.id === category.id ? updatedCategory : category,
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
