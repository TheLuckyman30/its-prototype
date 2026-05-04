import { useForm } from "@mantine/form";
import { calcProbOfKnown, useStudentStore, type QuestionType } from "@utils";
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
  const feedback = question.options[answer]?.feedback ?? "";
  const isCorrect = question.options[answer]?.isCorrect ?? false;

  const handleSubmit = ({ answer }: typeof form.values) => {
    const kc = knowledgeComponents.find((kc) => kc.id === question.kcId);
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
