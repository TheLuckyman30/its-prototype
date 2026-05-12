import { useQuizStore, useAppStore, useStudentStore } from "@utils/zustand";
import { useEffect } from "react";
import { buildQuestions } from "@utils/helpers";
import "./App.css";

function App() {
  const currentKcId = useStudentStore((state) => state.currentKcId);
  const Page = useAppStore((state) => state.currentPage);
  const setQuiz = useQuizStore((state) => state.setQuiz);
  useEffect(() => {
    const quizQuestions = buildQuestions(currentKcId);
    const defaultQuiz = {
      id: 0,
      kcId: "kc-1",
      categoryId: "cat-1",
      questions: quizQuestions,
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
