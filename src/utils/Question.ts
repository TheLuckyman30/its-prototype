export interface QuestionType {
  id: number;
  kc: string;
  question: string;
  options: { [key: string]: string };
  feedback: { [key: string]: string };
  correct: string;
}
