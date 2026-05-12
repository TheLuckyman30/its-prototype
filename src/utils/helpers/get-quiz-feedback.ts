import { isNoneLevel, isAdequateLevel, isExcellentLevel } from "../constants";
import { buildNewQuiz } from "./build-new-quiz";
import type { Category, KnowledgeComponent } from "../interfaces";

const options = [
  {
    type: "no-understanding",
    text: "It seems like you struggled with the concepts of this lesson. Please complete more practice problems before continuing.",
    color: "red",
    condition: (pKnown: number) => isNoneLevel(pKnown),
    flags: { useCurrentKc: true },
  },
  {
    type: "adequate-understanding",
    text: "You have done a good job on this lesson. It looks like you did struggle with some parts of the lesson, so we recommend getting more practice in. However, you may move onto the next lesson.",
    color: "yellow",
    condition: (pKnown: number) => isAdequateLevel(pKnown),
    flags: {},
  },
  {
    type: "excellent-understanding",
    text: "Excellent work! You can continue practicing if you wish, but you may move onto the next lesson.",
    color: "green",
    condition: (pKnown: number) => isExcellentLevel(pKnown),
    flags: {},
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
    flags: { useAdequate: true },
  },
  {
    type: "enough-excellent",
    text: "Congratualtions! You completed the lesson! You may practice any of the concepts, or you can move onto the next category.",
    color: "green",
    condition: (currentCategory: Category) => {
      return currentCategory.adequate.size < currentCategory.excellent.size;
    },
    flags: {},
  },
];

type Options = (typeof options)[number] | (typeof options2)[number];

export function getQuizFeedback(
  allKcs: KnowledgeComponent[],
  currentKc: KnowledgeComponent,
  currentCategory: Category,
) {
  let text: string = "";
  let color: string = "";

  let option: Options | undefined;
  if (currentCategory.none.size) {
    option = options.find((op) => op.condition(currentKc.pKnown));
  } else {
    option = options2.find((op) => op.condition(currentCategory));
  }

  if (option) {
    text = option.text ?? "";
    color = option.color ?? "";
  }

  const { quiz, selectedKc } = buildNewQuiz(
    currentCategory,
    currentKc,
    allKcs,
    option?.flags,
  );

  return { feedback: { text, color }, quiz, selectedKc };
}
