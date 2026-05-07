import { Alert } from "@mantine/core";
import { useQuizStore } from "@utils";

interface FeedbackType {
  text: string;
  color: string;
}

interface KnowledgeLevels {
  none: FeedbackType;
  adequate: FeedbackType;
  excellent: FeedbackType;
}

const knowledgeLevels: KnowledgeLevels = {
  none: {
    text: "It seems like you struggled with the concepts of this lesson. Please complete more practice problems before continuing.",
    color: "red",
  },
  adequate: {
    text: "You have done a good job on this lesson. It looks like you did struggle with some parts of the lesson, so we recommend getting more practice in. However, you may move onto the next lesson.",
    color: "yellow",
  },
  excellent: {
    text: "Excellent work! You can continue practicing if you wish, but you may move onto the next lesson.",
    color: "green",
  },
};

export function EndScreen() {
  const currentKc = useQuizStore((state) => state.currentKc);

  let studentKnowledgeLevel: FeedbackType;
  if (currentKc.pKnown < 0.75) {
    studentKnowledgeLevel = knowledgeLevels.none;
  } else if (currentKc.pKnown < 0.9) {
    studentKnowledgeLevel = knowledgeLevels.adequate;
  } else {
    studentKnowledgeLevel = knowledgeLevels.excellent;
  }

  return (
    <Alert
      variant={"light"}
      color={studentKnowledgeLevel.color}
      title={"End of quiz feedback"}
    >
      {studentKnowledgeLevel.text}
    </Alert>
  );
}
