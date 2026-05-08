import { useState } from "react";
import { Question } from "./components/Question";
import { Button, Container, Flex, Pagination } from "@mantine/core";
import { useAppStore, useQuizStore } from "@utils/zustand";
import { PAGES } from "@utils/constants";

export function Questions() {
  const questions = useQuizStore((state) => state.currentQuestions);
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [qaPairs, setQaPairs] = useState<Map<string, string>>(
    new Map<string, string>(),
  );
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);

  const currentQuestion = questions[activeQuestion - 1];
  const questionElement = (
    <Question
      key={currentQuestion.id}
      question={currentQuestion}
      answer={qaPairs.get(currentQuestion.id) ?? ""}
      qaPairs={qaPairs}
      setQaPairs={setQaPairs}
    />
  );
  const answeredAllQuestions = qaPairs.size === questions.length;

  return (
    <Container>
      <Flex gap={"5rem"} direction={"column"}>
        {questionElement}
        <Flex justify={"space-between"}>
          <Pagination
            total={questions.length}
            value={activeQuestion}
            onChange={setActiveQuestion}
          />
          {activeQuestion === questions.length && (
            <Button
              disabled={!answeredAllQuestions}
              onClick={() => setCurrentPage(PAGES.endScreen)}
            >
              End Screen
            </Button>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
