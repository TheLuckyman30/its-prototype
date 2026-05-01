export interface QuestionType {
  id: number;
  kc: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  feedback: { A: string; B: string; C: string; D: string };
  correct: string;
}
