import { useForm } from "@mantine/form";
import { calcProbOfKnown, useStudentStore, type QuestionType } from "@utils";
import {
  Button,
  Flex,
  Grid,
  GridCol,
  Radio,
  RadioGroup,
  Text,
} from "@mantine/core";
import { FeedbackText } from "./FeedbackText";

interface QuestionProps {
  question: QuestionType;
  answer: string;
}

export function Question({ question, answer }: QuestionProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { answer },
  });
  const { knowledgeComponents, qaPairs, updateKc, setQaPairs } =
    useStudentStore();

  const handleSubmit = ({ answer }: typeof form.values) => {
    const newPairs = new Map(qaPairs);
    const kc = knowledgeComponents.find((kc) => kc.id === question.kcIds[0]);
    if (kc) {
      const { pKnown, pWillLearn } = kc;
      const { pGuess, pSlip } = question;
      const isCorrect = question.options[answer].isCorrect;
      const newProbOfKnown = calcProbOfKnown(
        pKnown,
        pWillLearn,
        pSlip,
        pGuess,
        isCorrect,
      );
      const newKc = { ...kc, pKnown: newProbOfKnown };
      updateKc(newKc);
    }
    newPairs.set(question.id, answer);
    setQaPairs(newPairs);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={"5rem"}>
        <Text size="xl" fw={500}>
          {question.question}
        </Text>
        <FeedbackText
          feedback={question.options[answer]?.feedback ?? ""}
          answer={answer}
          isCorrect={question.options[answer]?.isCorrect ?? false}
        />
        <RadioGroup key={form.key("answer")} {...form.getInputProps("answer")}>
          <Grid>
            {Object.entries(question.options).map(([key, value]) => (
              <GridCol span={{ base: 12, sm: 6 }}>
                <Radio key={key} value={key} label={value.text} />
              </GridCol>
            ))}
          </Grid>
        </RadioGroup>
        <Flex justify="start">
          <Button type="submit">Submit</Button>
        </Flex>
      </Flex>
    </form>
  );
}
