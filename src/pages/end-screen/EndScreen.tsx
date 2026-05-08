import { Alert } from "@mantine/core";
import {
  useQuizStore,
  useStudentStore,
  type Category,
  type KnowledgeComponent,
} from "@utils";

function decide(kc: KnowledgeComponent, caterogry: Category) {
  let text: string;
  let color: string;

  if (kc.pKnown > 0.9) {
    text =
      "Excellent work! You can continue practicing if you wish, but you may move onto the next lesson.";
    color = "green";
  } else if (kc.pKnown > 0.75) {
    text =
      "You have done a good job on this lesson. It looks like you did struggle with some parts of the lesson, so we recommend getting more practice in. However, you may move onto the next lesson.";
    color = "yellow";
  } else {
    text =
      "It seems like you struggled with the concepts of this lesson. Please complete more practice problems before continuing.";
    color = "red";
  }

  if (!caterogry.kcsUnderstanding.none.length) {
    if (
      caterogry.kcsUnderstanding.adequate.length <
      caterogry.kcsUnderstanding.excellent.length
    ) {
      text = `Congratualtions! You completed ${caterogry.title}! You may practice any of the concepts, or you can move onto the next category.`;
      color = "green";
    } else {
      text = `It looks like you still need some practice with most of the concepts. You must do some more practice before moving onto the next category`;
      color = "yellow";
    }
  } else {
  }
}

export function EndScreen() {
  const currentKc = useQuizStore((state) => state.currentKc);
  const currentCategory = useStudentStore((state) => state.currentCategory);

  return (
    <Alert
      variant={"light"}
      color={"green"}
      title={"End of quiz feedback"}
    ></Alert>
  );
}
