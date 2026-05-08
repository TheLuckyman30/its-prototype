import { useQuizStore, useAppStore } from "@utils/zustand";
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
