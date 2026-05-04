import { Alert } from "@mantine/core";
import { useStudentStore } from "@utils";

interface EndSectionProps {
  kcId: string;
}

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

export function EndSection({ kcId }: EndSectionProps) {
  const kcs = useStudentStore((state) => state.knowledgeComponents);
  const kc = kcs.find((kc) => kc.id === kcId);
  console.log(kc);

  if (kc) {
    let studentKnowledgeLevel: FeedbackType;
    if (kc.pKnown < 0.75) {
      studentKnowledgeLevel = knowledgeLevels.none;
    } else if (kc.pKnown < 0.9) {
      studentKnowledgeLevel = knowledgeLevels.adequate;
    } else {
      studentKnowledgeLevel = knowledgeLevels.excellent;
    }

    return (
      <Alert
        variant={"light"}
        color={studentKnowledgeLevel.color}
        title={"Feedback"}
      >
        {studentKnowledgeLevel.text}
      </Alert>
    );
  }
}
