import { Alert } from "@mantine/core";
import { useDecide } from "@utils/custom-hooks";

export function EndScreen() {
  const { text, color } = useDecide();

  return (
    <Alert variant={"light"} color={color} title={"End of quiz feedback"}>
      {text}
    </Alert>
  );
}
