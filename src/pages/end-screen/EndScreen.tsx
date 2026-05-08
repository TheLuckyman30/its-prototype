import { Alert, Button, Container, Flex } from "@mantine/core";
import { PAGES } from "@utils/constants";
import { useDecide } from "@utils/custom-hooks";
import { buildQuestions } from "@utils/helpers/build-questions";
import { useAppStore, useQuizStore } from "@utils/zustand";

export function EndScreen() {
  const { text, color } = useDecide();
  const currentKc = useQuizStore((state) => state.currentKc);
  console.log(currentKc);
  const setCurrentQuestions = useQuizStore(
    (state) => state.setCurrentQuestions,
  );
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const newQuestions = buildQuestions(currentKc.id);

  return (
    <Container>
      <Flex gap={"5rem"} direction={"column"}>
        <Alert variant={"light"} color={color} title={"End of quiz feedback"}>
          {text}
        </Alert>
        <Button
          onClick={() => {
            setCurrentQuestions(newQuestions);
            setCurrentPage(PAGES.questions);
          }}
        >
          Practice More
        </Button>
      </Flex>
    </Container>
  );
}
