import type { Category, KnowledgeComponent } from "../interfaces";

const isExcellentLevel = (pKnown: number) => pKnown >= 0.9;
const isAdequateLevel = (pKnown: number) => pKnown >= 0.75 && pKnown < 0.9;

const options = [
  {
    type: "no-understanding",
    text: "It seems like you struggled with the concepts of this lesson. Please complete more practice problems before continuing.",
    color: "red",
    condition: (pKnown: number) => {
      return pKnown < 0.75;
    },
  },
  {
    type: "adequate-understanding",
    text: "You have done a good job on this lesson. It looks like you did struggle with some parts of the lesson, so we recommend getting more practice in. However, you may move onto the next lesson.",
    color: "yellow",
    condition: (pKnown: number) => {
      return pKnown >= 0.75 && pKnown < 0.9;
    },
  },
  {
    type: "excellent-understanding",
    text: "Excellent work! You can continue practicing if you wish, but you may move onto the next lesson.",
    color: "green",
    condition: (pKnown: number) => {
      return pKnown >= 0.9;
    },
  },
];

const options2 = [
  {
    type: "not-enough-excellent",
    text: "It looks like you still need some practice with most of the concepts. You must do some more practice before moving onto the next category.",
    color: "yellow",
    condition: (currentCategory: Category) => {
      return currentCategory.adequate.size >= currentCategory.excellent.size;
    },
  },
  {
    type: "enough-excellent",
    text: "Congratualtions! You completed the lesson! You may practice any of the concepts, or you can move onto the next category.",
    color: "green",
    condition: (currentCategory: Category) => {
      return currentCategory.adequate.size < currentCategory.excellent.size;
    },
  },
];

export function getQuizFeedback(
  currentKc: KnowledgeComponent,
  currentCategory: Category,
) {
  let updatedCategory: Category | null = null;
  let text: string = "";
  let color: string = "";

  const noneSet = new Set(currentCategory.none);
  const adequateSet = new Set(currentCategory.adequate);
  const excellentSet = new Set(currentCategory.excellent);
  if (isExcellentLevel(currentKc.pKnown)) {
    noneSet.delete(currentKc.id);
    adequateSet.delete(currentKc.id);
    excellentSet.add(currentKc.id);
    updatedCategory = {
      ...currentCategory,
      none: noneSet,
      adequate: adequateSet,
      excellent: excellentSet,
    };
  } else if (isAdequateLevel(currentKc.pKnown)) {
    noneSet.delete(currentKc.id);
    adequateSet.add(currentKc.id);
    excellentSet.delete(currentKc.id);
    updatedCategory = {
      ...currentCategory,
      none: noneSet,
      adequate: adequateSet,
      excellent: excellentSet,
    };
  }

  let option: Partial<{ text: string; color: string }> | undefined;
  if (currentCategory.none.size) {
    option = options.find((op) => op.condition(currentKc.pKnown));
  } else {
    option = options2.find((op) =>
      op.condition(updatedCategory ?? currentCategory),
    );
  }

  if (option) {
    text = option.text ?? "";
    color = option.color ?? "";
  }

  return { feedback: { text, color }, updatedCategory };
}
