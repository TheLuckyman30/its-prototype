import type { QuestionType } from "@utils";

export interface Quiz {
  id: string;
  questions: QuestionType[];
  qaPairs: Map<string, string>;
}
