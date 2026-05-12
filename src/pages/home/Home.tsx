import { useStudentStore } from "@utils/zustand";
import { CategoryCard } from "./components/CategoryCard";
import { Grid } from "@mantine/core";

export function Home() {
  const categories = useStudentStore((state) => state.categories);

  return (
    <Grid gap={"5rem"}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          categoryName={category.title}
          unlocked={category.unlocked}
        />
      ))}
    </Grid>
  );
}
