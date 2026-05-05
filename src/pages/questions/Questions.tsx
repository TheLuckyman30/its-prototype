import { useState } from "react";
import { Question } from "./components/Question";
import { Button, Container, Flex, Pagination } from "@mantine/core";
import { EndSection } from "./components/EndSection";
import questions from "@data/questions.json";

export function Questions() {
  const [activeQuestion, setActiveQuestion] = useState<number>(1);
  const [showEndScreen, setShowEndScreen] = useState<boolean>(false);
  const [qaPairs, setQaPairs] = useState<Map<string, string>>(
    new Map<string, string>(),
  );

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
