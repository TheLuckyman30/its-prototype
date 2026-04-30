export interface Question {
  id: string;
  kc: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  feedback: { A: string; B: string; C: string; D: string };
  correct: string;
}
