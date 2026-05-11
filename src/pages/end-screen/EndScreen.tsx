import { Alert, Container, Flex } from "@mantine/core";
import { findById, getQuizFeedback } from "@utils/helpers";
import { useStudentStore } from "@utils/zustand";

export function EndScreen() {
  const { kcs, categories, currentKcId, currentCategoryId, updateCategory } =
    useStudentStore();
  const kc = findById(currentKcId, kcs);
  const currentCategory = findById(currentCategoryId, categories);

  if (!kc || !currentCategory) return null;

  const { feedback, updatedCategory } = getQuizFeedback(kc, currentCategory);

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
