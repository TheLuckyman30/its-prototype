import { Alert, Container, Flex } from "@mantine/core";
import { getQuizFeedback } from "@utils/helpers";
import { useQuizStore, useStudentStore } from "@utils/zustand";

export function EndScreen() {
  const currentKc = useQuizStore((state) => state.currentKc);
  const currentCategory = useStudentStore((state) => state.currentCategory);
  const updateCategory = useStudentStore((state) => state.updateCategory);

  const { feedback, updatedCategory } = getQuizFeedback(
    currentKc,
    currentCategory,
  );

  if (updatedCategory) {
    updateCategory(updatedCategory);
  }

  return (
    <Container>
      <Flex gap={"5rem"} direction={"column"}>
        <Alert
          variant={"light"}
          color={feedback.color}
          title={"End of quiz feedback"}
        >
          {feedback.text}
        </Alert>
      </Flex>
    </Container>
  );
}
