import { useState } from "react";
import { Question } from "./components/Question";
import { Button } from "@mantine/core";
import questions from "../../data/questions.json";

export function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  function nextQuestion() {
    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((currVal) => currVal + 1);
    }
  }

  function prevQuestion() {
    if (currentQuestion !== 0) {
      setCurrentQuestion((currVal) => currVal - 1);
    }
  }

  return (
    <div>
      <Question question={questions[currentQuestion]} />
      <Button onClick={prevQuestion} disabled={currentQuestion === 0}>
        Prev
      </Button>
      <Button
        onClick={nextQuestion}
        disabled={currentQuestion === questions.length - 1}
      >
        Next
      </Button>
    </div>
  );
}
