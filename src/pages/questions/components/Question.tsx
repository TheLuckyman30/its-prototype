import type { QuestionType } from "../../../utils";

interface QuestionProps {
  question: QuestionType;
}

export function Question({ question }: QuestionProps) {
  return <div>{question.question}</div>;
}
