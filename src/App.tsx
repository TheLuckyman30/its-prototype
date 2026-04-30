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

  return <div>{currentPage.element}</div>;
}

export default App;
