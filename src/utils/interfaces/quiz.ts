import type { QuestionType } from "./question-type";

export interface Quiz {
  id: string;
  questions: QuestionType[];
  qaPairs: Map<string, string>;
}
