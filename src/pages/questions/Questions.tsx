import { useState } from "react";
import { Question } from "./components/Question";
import { Button, Container, Flex, Pagination } from "@mantine/core";
import { useStudentStore } from "@utils";
import { EndSection } from "./components/EndSection";
import questions from "@data/questions.json";

export function Questions() {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [showEndScreen, setShowEndScreen] = useState<boolean>(false);
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
      {!showEndScreen ? (
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
                onClick={() => setShowEndScreen(true)}
                disabled={!answeredAllQuestions}
              >
                End Screen
              </Button>
            )}
          </Flex>
        </Flex>
      ) : (
        <EndSection kcId={currentQuestion.kcId} />
      )}
    </Container>
  );
}
