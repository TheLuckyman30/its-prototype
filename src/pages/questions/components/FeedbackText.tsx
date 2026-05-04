import { Alert } from "@mantine/core";

interface FeedbackTextProps {
  feedback: { [key: string]: string };
  answer: string;
  correct: string;
}

export function FeedbackText({ feedback, answer, correct }: FeedbackTextProps) {
  const message = answer ? feedback[answer] : "";
  return (
    <Alert
      hidden={!answer}
      variant="light"
      color={answer === correct ? "green" : "yellow"}
      withCloseButton
      title="Feedback"
    >
      {message}
    </Alert>
  );
}
