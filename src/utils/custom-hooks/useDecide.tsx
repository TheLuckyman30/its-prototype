import { useQuizStore, useStudentStore } from "../zustand";

export function useDecide() {
  const currentKc = useQuizStore((state) => state.currentKc);
  const currentCategory = useStudentStore((state) => state.currentCategory);
  const updateCategory = useStudentStore((state) => state.updateCategory);

  let text: string;
  let color: string;

  if (currentKc.pKnown > 0.9) {
    text =
      "Excellent work! You can continue practicing if you wish, but you may move onto the next lesson.";
    color = "green";
    const updatedCategory = {
      ...currentCategory,
      kcsUnderstanding: {
        ...currentCategory.kcsUnderstanding,
        none: currentCategory.kcsUnderstanding.none.filter(
          (kcId) => kcId !== currentKc.id,
        ),
        excellent: [
          ...currentCategory.kcsUnderstanding.excellent,
          currentKc.id,
        ],
      },
    };
    updateCategory(updatedCategory);
  } else if (currentKc.pKnown > 0.75) {
    text =
      "You have done a good job on this lesson. It looks like you did struggle with some parts of the lesson, so we recommend getting more practice in. However, you may move onto the next lesson.";
    color = "yellow";
    const updatedCategory = {
      ...currentCategory,
      kcsUnderstanding: {
        ...currentCategory.kcsUnderstanding,
        none: currentCategory.kcsUnderstanding.none.filter(
          (kcId) => kcId !== currentKc.id,
        ),
        adequate: [...currentCategory.kcsUnderstanding.adequate, currentKc.id],
      },
    };
    updateCategory(updatedCategory);
  } else {
    text =
      "It seems like you struggled with the concepts of this lesson. Please complete more practice problems before continuing.";
    color = "red";
  }

  if (!currentCategory.kcsUnderstanding.none.length) {
    if (
      currentCategory.kcsUnderstanding.adequate.length <
      currentCategory.kcsUnderstanding.excellent.length
    ) {
      text = `Congratualtions! You completed ${currentCategory.title}! You may practice any of the concepts, or you can move onto the next category.`;
      color = "green";
    } else {
      text = `It looks like you still need some practice with most of the concepts. You must do some more practice before moving onto the next category`;
      color = "yellow";
    }
  }

  return { text, color };
}
