import { Alert, Container, Flex } from "@mantine/core";
import { PAGES } from "@utils/constants";
import { findById, getQuizFeedback } from "@utils/helpers";
import { useAppStore, useQuizStore, useStudentStore } from "@utils/zustand";

export function EndScreen() {
  const { kcs, categories, currentKcId, currentCategoryId } = useStudentStore();
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const kc = findById(currentKcId, kcs);
  const currentCategory = findById(currentCategoryId, categories);

  if (!kc || !currentCategory) return null;

  const { feedback, newQuiz } = getQuizFeedback(kcs, kc, currentCategory);

  return (
    <Container>
      <Flex gap={"5rem"} direction={"column"}>
        <Alert
          onClick={() => {
            setQuiz(newQuiz);
            setCurrentPage(PAGES.questions);
          }}
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
