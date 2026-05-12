import { useStudentStore } from "@utils/zustand";
import { CategoryCard } from "./components/CategoryCard";
import { Grid } from "@mantine/core";

export function Home() {
  const categories = useStudentStore((state) => state.categories);
  const allKcs = useStudentStore((state) => state.kcs);

  return (
    <Grid gap={"5rem"}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} kcs={allKcs} />
      ))}
    </Grid>
  );
}
