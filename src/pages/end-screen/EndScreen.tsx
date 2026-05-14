import { Alert, Button, Flex } from "@mantine/core";
import { CATEGORY_MAP, PAGES } from "@utils/constants";
import { findById, getQuizFeedback } from "@utils/helpers";
import { useAppStore, useQuizStore, useStudentStore } from "@utils/zustand";

export function EndScreen() {
  const {
    kcs,
    categories,
    currentKcId,
    currentCategoryId,
    setCurrentKc,
    updateCategory,
  } = useStudentStore();
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const kc = findById(currentKcId, kcs);
  const currentCategory = findById(currentCategoryId, categories);

  if (!kc || !currentCategory) return null;

  const { feedback, quiz, selectedKc } = getQuizFeedback(
    kcs,
    kc,
    currentCategory,
  );

  const handleSubmit = () => {
    if (quiz) {
      setCurrentKc(selectedKc?.id ?? "");
      setQuiz(quiz);
      setCurrentPage(PAGES.questions);
    } else {
      const nextCategoryId = CATEGORY_MAP[currentCategoryId];
      const nextCategory = findById(nextCategoryId, categories);
      if (nextCategory) {
        updateCategory({ ...nextCategory, unlocked: true });
      }
      setCurrentPage(PAGES.home);
    }
  };

  return (
    <Flex gap={"5rem"} direction={"column"}>
      <Alert
        variant={"light"}
        color={feedback.color}
        title={"End of quiz feedback"}
      >
        {feedback.text}
      </Alert>
      <Flex justify={"start"}>
        <Button onClick={handleSubmit}>Next</Button>
      </Flex>
    </Flex>
  );
}
