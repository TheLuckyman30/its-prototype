import type {
  Category,
  KnowledgeComponent,
  QuestionType,
  Quiz,
} from "../interfaces";
import { buildQuestions } from "./build-questions";
import { selectKc } from "./select-kc";

export function buildNewQuiz(
  category: Category,
  kc: KnowledgeComponent,
  allKcs: KnowledgeComponent[],
  { useCurrentKc = false, useAdequate = false } = {},
) {
  let quiz: Quiz | null = null;
  let questions: QuestionType[] = [];
  let selectedKc: KnowledgeComponent | undefined = undefined;

  if (useCurrentKc) {
    selectedKc = kc;
    questions = buildQuestions(kc.id);
  } else if (useAdequate) {
    selectedKc = selectKc(allKcs, category, "adequate");
    questions = buildQuestions(selectedKc?.id ?? "");
  } else {
    selectedKc = selectKc(allKcs, category);
    questions = buildQuestions(selectedKc?.id ?? "");
  }

  if (selectedKc) {
    quiz = {
      id: 0,
      kcId: selectedKc.id,
      categoryId: category.id,
      questions,
      qaPairs: new Map<string, string>(),
    };
  }

  return { quiz, selectedKc };
}
