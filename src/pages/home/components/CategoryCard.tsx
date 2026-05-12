import { PAGES } from "@utils/constants";
import { buildQuestions, selectKc } from "@utils/helpers";
import type { Category, KnowledgeComponent } from "@utils/interfaces";
import { useAppStore, useQuizStore } from "@utils/zustand";

interface CategoryCardProps {
  category: Category;
  kcs: KnowledgeComponent[];
}

export function CategoryCard({ category, kcs }: CategoryCardProps) {
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const condtionalClasses = category.unlocked
    ? "bg-blue-500 hover:scale-105 duration-75"
    : "bg-gray-500";

  const handleClick = () => {
    const selectedKc = selectKc(kcs, category);
    if (selectedKc) {
      const quizQuestions = buildQuestions(selectedKc.id);
      const newQuiz = {
        id: 0,
        kcId: selectedKc.id,
        categoryId: category.id,
        questions: quizQuestions,
        qaPairs: new Map<string, string>(),
      };
      setQuiz(newQuiz);
      setCurrentPage(PAGES.questions);
    }
  };

  return (
    <div
      className={`${condtionalClasses} w-100 h-100 font-semibold text-shadow-2xs p-2 text-center justify-center items-center flex rounded-md shadow-md text-white text-4xl cursor-pointer`}
      onClick={handleClick}
    >
      {category.title}
    </div>
  );
}
