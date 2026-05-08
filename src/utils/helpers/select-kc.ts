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
        currentCategory.kcsUnderstanding.adequate,
      );
      break;
    case "excellent":
      selectedKcId = getRandomElement(
        currentCategory.kcsUnderstanding.excellent,
      );
      break;
    default:
      selectedKcId = getRandomElement(currentCategory.kcsUnderstanding.none);
  }

  const selectedKc = allKcs.find((k) => k.id === selectedKcId);

  return selectedKc;
}
