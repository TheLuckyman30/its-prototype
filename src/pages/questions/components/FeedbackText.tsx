import { Alert } from "@mantine/core";

interface FeedbackTextProps {
  feedback: string;
  answer: string;
  isCorrect: boolean;
}

export function FeedbackText({
  feedback,
  answer,
  isCorrect,
}: FeedbackTextProps) {
  return (
    <Alert
      hidden={!answer}
      variant="light"
      color={isCorrect ? "green" : "yellow"}
      withCloseButton
      title="Feedback"
    >
      {feedback}
    </Alert>
  );
}
