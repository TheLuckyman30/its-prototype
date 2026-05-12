interface CategoryCardProps {
  categoryName: string;
  unlocked: boolean;
}

export function CategoryCard({ categoryName, unlocked }: CategoryCardProps) {
  const condtionalClasses = unlocked
    ? "bg-blue-500 hover:scale-105 duration-75"
    : "bg-gray-500";
  return (
    <div
      className={`${condtionalClasses} w-100 h-100 font-semibold text-shadow-2xs p-2 text-center justify-center items-center flex rounded-md shadow-md text-white text-4xl cursor-pointer`}
    >
      {categoryName}
    </div>
  );
}
