interface Option {
  text: string;
  feedback: string;
  isCorrect: boolean;
}

export interface QuestionType {
  id: string;
  kcId: string;
  question: string;
  options: { [key: string]: Option };
  pSlip: number;
  pGuess: number;
}
