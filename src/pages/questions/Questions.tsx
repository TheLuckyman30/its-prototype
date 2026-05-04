import { useState } from "react";
import { Question } from "./components/Question";
import { Container, Flex, Pagination } from "@mantine/core";
import { useStudentStore } from "@utils";
import questions from "@data/questions.json";
import { EndSection } from "./components/EndSection";

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

  const questionIds = questions.map((question) => question.id);
  const answeredAllQuestions = questionIds.reduce((acc, id) => {
    return acc && qaPairs.has(id);
  }, true);

  return (
    <Container>
      <Flex gap={"5rem"} direction={"column"}>
        {questionElement}
        <Pagination
          total={questions.length}
          value={activeQuestion}
          onChange={setActiveQuestion}
        />
        {answeredAllQuestions && <EndSection kcId={currentQuestion.kcId} />}
      </Flex>
    </Container>
  );
}
