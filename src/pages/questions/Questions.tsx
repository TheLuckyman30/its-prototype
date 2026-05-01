import { useState } from "react";
import { Question } from "./components/Question";
import { Button, Container, Flex, Group } from "@mantine/core";
import questions from "../../data/questions.json";

export function Questions() {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [qaPairs, setQaPairs] = useState<Map<number, string>>(
    new Map<number, string>(),
  );
  const currentQuestion = questions[questionIndex];

  const nextQuestion = () => {
    if (questionIndex !== questions.length - 1) {
      setQuestionIndex((currVal) => currVal + 1);
    }
  };
  const prevQuestion = () => {
    if (questionIndex !== 0) {
      setQuestionIndex((currVal) => currVal - 1);
    }
  };

  return (
    <Container>
      <Flex gap={"5rem"} direction={"column"}>
        <Question
          key={currentQuestion.id}
          question={currentQuestion}
          answer={qaPairs.get(currentQuestion.id) ?? ""}
          qaPairs={qaPairs}
          setQaPairs={setQaPairs}
        />
        <Group>
          <Button onClick={prevQuestion} disabled={questionIndex === 0}>
            Prev
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={questionIndex === questions.length - 1}
          >
            Next
          </Button>
        </Group>
      </Flex>
    </Container>
  );
}
