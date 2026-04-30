import { useState } from "react";
import { type Question } from "../../utils";
import questions from "../../data/questions.json";

export function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0],
  );

  return <div>Questions Page</div>;
}
