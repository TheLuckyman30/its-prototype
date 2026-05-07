import { useQuizStore } from "@utils";
import { useAppStore } from "./utils/zustand/app-store";
import questions from "@data/questions.json";
import "./App.css";

function App() {
  const Page = useAppStore((state) => state.currentPage);
  const setCurrentQuestions = useQuizStore(
    (state) => state.setCurrentQuestions,
  );

  setCurrentQuestions(questions);

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Page />
    </main>
  );
}

export default App;
