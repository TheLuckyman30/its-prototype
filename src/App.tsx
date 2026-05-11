import { useQuizStore, useAppStore } from "@utils/zustand";
import questions from "@data/questions.json";
import "./App.css";
import { useEffect } from "react";

function App() {
  const Page = useAppStore((state) => state.currentPage);
  const setQuiz = useQuizStore((state) => state.setQuiz);
  useEffect(() => {
    const defaultQuiz = {
      id: 0,
      kcId: "kc-1",
      categoryId: "cat-1",
      questions,
      qaPairs: new Map<string, string>(),
    };

    setQuiz(defaultQuiz);
  }, [setQuiz]);

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Page />
    </main>
  );
}

export default App;
