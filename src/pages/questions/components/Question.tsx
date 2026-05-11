import { useForm } from "@mantine/form";
import {
  Alert,
  Button,
  Flex,
  Grid,
  GridCol,
  Radio,
  RadioGroup,
  Text,
} from "@mantine/core";
import { calcProbOfKnown, findById } from "@utils/helpers";
import { useStudentStore } from "@utils/zustand";
import type { QuestionType } from "@utils/interfaces";

interface QuestionProps {
  question: QuestionType;
  answer: string;
  qaPairs: Map<string, string>;
  setQaPairs: (newPairs: Map<string, string>) => void;
}

export function Question({
  question,
  answer,
  qaPairs,
  setQaPairs,
}: QuestionProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { answer },
  });
  const kcs = useStudentStore((state) => state.kcs);
  const currentKcId = useStudentStore((state) => state.currentKcId);
  const updateKc = useStudentStore((state) => state.updateKc);

  const feedback = question.options[answer]?.feedback ?? "";
  const isCorrect = question.options[answer]?.isCorrect ?? false;

  const handleSubmit = ({ answer }: typeof form.values) => {
    const kc = findById(currentKcId, kcs);
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
      const updatedKc = { ...kc, pKnown: newProbOfKnown };
      updateKc(updatedKc);
    }
    const newPairs = new Map(qaPairs);
    newPairs.set(question.id, answer);
    setQaPairs(newPairs);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction={"column"} gap={"5rem"}>
        <Text size="xl" fw={500}>
          {question.question}
        </Text>
        <Alert
          hidden={!answer}
          variant="light"
          color={isCorrect ? "green" : "yellow"}
          title="Feedback"
        >
          {feedback}
        </Alert>
        <RadioGroup key={form.key("answer")} {...form.getInputProps("answer")}>
          <Grid>
            {Object.entries(question.options).map(([key, value]) => (
              <GridCol key={key} span={{ base: 12, sm: 6 }}>
                <Radio value={key} label={value.text} />
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
