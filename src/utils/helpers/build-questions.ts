import { getRandomElement, type QuestionType } from "@utils";
import allQuestions from "@data/questions.json";

export function buildQuestions(currentKcId: string) {
  const numQuestions = 4;
  let relevantQuestions: QuestionType[] = allQuestions.filter(
    (question) => question.kcId === currentKcId,
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
