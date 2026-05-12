import type { Category, KnowledgeComponent, Quiz } from "../interfaces";
import { create } from "zustand";
import kcs from "@data/kc.json";
import categories from "@data/categories.json";

interface StudentStore {
  kcs: KnowledgeComponent[];
  categories: Category[];
  currentKcId: string;
  currentCategoryId: string;
  quizzes: Quiz[];
  updateKc: (updatedKc: KnowledgeComponent) => void;
  updateCategory: (updatedCategory: Category) => void;
  setCurrentKc: (newCategory: string) => void;
  setCurrentCategory: (newCategory: string) => void;
  addQuiz: (newQuiz: Quiz) => void;
}

function formatedCategories() {
  const newCategories = categories.map((category) => {
    return {
      ...category,
      none: new Set<string>(category.none),
      adequate: new Set<string>(category.adequate),
      excellent: new Set<string>(category.excellent),
    };
  });

  return newCategories;
}

export const useStudentStore = create<StudentStore>((set) => ({
  kcs,
  categories: formatedCategories(),
  currentKcId: kcs[0].id,
  currentCategoryId: categories[0].id,
  quizzes: [],
  updateKc: (updatedKC: KnowledgeComponent) => {
    set((state) => ({
      kcs: state.kcs.map((kc) => (updatedKC.id === kc.id ? updatedKC : kc)),
    }));
  },
  updateCategory: (updatedCategory: Category) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        updatedCategory.id === category.id ? updatedCategory : category,
      ),
    }));
  },
  setCurrentKc: (newKc: string) => {
    set({ currentKcId: newKc });
  },
  setCurrentCategory: (newCategory: string) => {
    set({ currentCategoryId: newCategory });
  },
  addQuiz: (newQuiz: Quiz) => {
    set((state) => ({ quizzes: { ...state.quizzes, newQuiz } }));
  },
}));
