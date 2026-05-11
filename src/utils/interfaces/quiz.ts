import type { QuestionType } from "./question-type";

export interface Quiz {
  id: number;
  kcId: string;
  categoryId: string;
  questions: QuestionType[];
  qaPairs: Map<string, string>;
}
