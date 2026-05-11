import { useQuizStore, useAppStore } from "@utils/zustand";
import questions from "@data/questions.json";
import "./App.css";

function App() {
  const Page = useAppStore((state) => state.currentPage);

  return (
    <main className="flex justify-center items-center h-screen w-full">
      <Page />
    </main>
  );
}

export default App;
