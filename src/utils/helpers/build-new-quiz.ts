import type { Category, KnowledgeComponent, Quiz } from "../interfaces";
import { buildQuestions } from "./build-questions";
import { selectKc } from "./select-kc";

export function buildNewQuiz(
  category: Category,
  kc: KnowledgeComponent,
  allKcs: KnowledgeComponent[],
  { useCurrentKc = false } = {},
) {
  let quiz: Quiz;
  if (useCurrentKc) {
    const questions = buildQuestions(kc.id);
    quiz = {
      id: 0,
      kcId: kc.id,
      categoryId: category.id,
      questions,
      qaPairs: new Map<string, string>(),
    };
  } else {
    const selectedKc = selectKc(allKcs, category);
    const questions = buildQuestions(selectedKc?.id ?? "");
    quiz = {
      id: 0,
      kcId: kc.id,
      categoryId: category.id,
      questions,
      qaPairs: new Map<string, string>(),
    };
  }

  return quiz;
}
