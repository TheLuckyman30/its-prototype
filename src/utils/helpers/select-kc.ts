import type { KnowledgeComponent, Category } from "../interfaces";
import { getRandomElement } from "./get-random-element";

export function selectKc(
  allKcs: KnowledgeComponent[],
  currentCategory: Category,
  knowledgeLevel?: string,
) {
  let selectedKcId: string;
  switch (knowledgeLevel) {
    case "adequate":
      selectedKcId = getRandomElement(
        Array.from(currentCategory.adequate.values()),
      );
      break;
    case "excellent":
      selectedKcId = getRandomElement(
        Array.from(currentCategory.excellent.values()),
      );
      break;
    default:
      selectedKcId = getRandomElement(
        Array.from(currentCategory.none.values()),
      );
  }

  const selectedKc = allKcs.find((k) => k.id === selectedKcId);

  return selectedKc;
}
