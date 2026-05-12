import { CATEGORY_MAP } from "@utils/constants";
import type {
  Category,
  KnowledgeComponent,
  QuestionType,
  Quiz,
} from "../interfaces";
import { buildQuestions } from "./build-questions";
import { selectKc } from "./select-kc";
import { findById } from "./find-by-id";

export function buildNewQuiz(
  category: Category,
  kc: KnowledgeComponent,
  allKcs: KnowledgeComponent[],
  categories: Category[],
  { useCurrentKc = false, useAdequate = false, useNewCategory = false } = {},
) {
  let quiz: Quiz | null = null;
  let questions: QuestionType[] = [];
  let selectedKc: KnowledgeComponent | undefined = undefined;
  let selectedCategory: Category | undefined = category;

  if (useCurrentKc) {
    selectedKc = kc;
    questions = buildQuestions(kc.id);
  } else if (useAdequate) {
    selectedKc = selectKc(allKcs, category, "adequate");
    questions = buildQuestions(selectedKc?.id ?? "");
  } else if (useNewCategory) {
    selectedCategory = findById(CATEGORY_MAP[category.id], categories);
    if (selectedCategory) {
      selectedKc = selectKc(allKcs, selectedCategory);
      questions = buildQuestions(selectedKc?.id ?? "");
    }
  } else {
    selectedKc = selectKc(allKcs, category);
    questions = buildQuestions(selectedKc?.id ?? "");
  }

  if (selectedKc && selectedCategory) {
    quiz = {
      id: 0,
      kcId: selectedKc.id,
      categoryId: selectedCategory.id,
      questions,
      qaPairs: new Map<string, string>(),
    };
  }

  return { quiz, selectedKc, selectedCategory };
}
