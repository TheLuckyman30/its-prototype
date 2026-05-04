import { useForm } from "@mantine/form";
import type { QuestionType } from "@utils";
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
  qaPairs: Map<number, string>;
  setQaPairs: (newPairs: Map<number, string>) => void;
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

  const handleSubmit = ({ answer }: typeof form.values) => {
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
        <FeedbackText
          feedback={question.feedback}
          answer={answer}
          correct={question.correct}
        />
        <RadioGroup key={form.key("answer")} {...form.getInputProps("answer")}>
          <Grid>
            {Object.entries(question.options).map(([key, value]) => (
              <GridCol span={{ base: 12, sm: 6 }}>
                <Radio key={key} value={key} label={value} />
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
