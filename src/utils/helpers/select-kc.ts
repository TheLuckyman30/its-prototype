import type { KnowledgeComponent, Category } from "../interfaces";
import { getRandomElement } from "./get-random-element";

export function selectKc(
  allKcs: KnowledgeComponent[],
  category: Category,
  knowledgeLevel?: string,
) {
  let selectedKcId: string;
  switch (knowledgeLevel) {
    case "adequate":
      selectedKcId = getRandomElement(Array.from(category.adequate.values()));
      break;
    case "excellent":
      selectedKcId = getRandomElement(Array.from(category.excellent.values()));
      break;
    default:
      selectedKcId = getRandomElement(Array.from(category.none.values()));
  }

  const selectedKc = allKcs.find((k) => k.id === selectedKcId);

  return selectedKc;
}
