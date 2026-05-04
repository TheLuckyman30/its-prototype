import { Questions } from "./pages";
import { useState, type JSX } from "react";
import "./App.css";

interface Page {
  name: string;
  element: JSX.Element;
}

const pages: Page[] = [{ name: "Question", element: <Questions /> }];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(pages[0]);

  return (
    <main className="flex justify-center items-center h-screen w-full">
      {currentPage.element}
    </main>
  );
}

export default App;
