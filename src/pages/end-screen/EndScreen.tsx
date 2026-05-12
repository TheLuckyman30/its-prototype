import { Alert, Button, Flex } from "@mantine/core";
import { PAGES } from "@utils/constants";
import { findById, getQuizFeedback } from "@utils/helpers";
import { useAppStore, useQuizStore, useStudentStore } from "@utils/zustand";

export function EndScreen() {
  const {
    kcs,
    categories,
    currentKcId,
    currentCategoryId,
    setCurrentCategory,
    setCurrentKc,
    updateCategory,
  } = useStudentStore();
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const kc = findById(currentKcId, kcs);
  const currentCategory = findById(currentCategoryId, categories);

  if (!kc || !currentCategory) return null;

  const { feedback, quiz, selectedCategory, selectedKc } = getQuizFeedback(
    kcs,
    categories,
    kc,
    currentCategory,
  );

  const handleSubmit = () => {
    if (quiz) {
      setCurrentPage(PAGES.questions);
    } else {
      setCurrentPage(PAGES.questions); // Change this to home page when implemented
      if (selectedCategory) {
        updateCategory({ ...selectedCategory, unlocked: true });
      }
    }
    setQuiz(quiz);
    setCurrentKc(selectedKc?.id ?? "");
    setCurrentCategory(selectedCategory?.id ?? "");
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
