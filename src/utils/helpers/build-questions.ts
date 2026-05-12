import type { QuestionType } from "../interfaces";
import { getRandomElement } from "./get-random-element";
import allQuestions from "@data/questions.json";

export function buildQuestions(kcId: string) {
  const numQuestions = 4;
  let relevantQuestions: QuestionType[] = allQuestions.filter(
    (question) => question.kcId === kcId,
  );
  let quizQuestions = relevantQuestions;

  if (quizQuestions.length > numQuestions) {
    quizQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
      const question = getRandomElement(relevantQuestions);
      quizQuestions.push(question);
      relevantQuestions = relevantQuestions.filter((q) => q.id !== question.id);
    }
  }

  return quizQuestions;
}
