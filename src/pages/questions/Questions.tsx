import { useState } from "react";
import { Question } from "./components/Question";
import { Container, Flex, Pagination } from "@mantine/core";
import { useStudentStore } from "@utils";
import questions from "@data/questions.json";

export function Questions() {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const qaPairs = useStudentStore((state) => state.qaPairs);

  const currentQuestion = questions[activeQuestion - 1];
  const questionElement = (
    <Question
      key={currentQuestion.id}
      question={currentQuestion}
      answer={qaPairs.get(currentQuestion.id) ?? ""}
    />
  );

  return (
    <Container>
      <Flex gap={"5rem"} direction={"column"}>
        {questionElement}
        <Pagination
          total={questions.length}
          value={activeQuestion}
          onChange={setActiveQuestion}
        />
      </Flex>
    </Container>
  );
}
