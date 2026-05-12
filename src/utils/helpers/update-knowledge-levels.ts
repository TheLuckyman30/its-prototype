import { isAdequateLevel, isExcellentLevel } from "../constants";
import type { Category, KnowledgeComponent } from "../interfaces";

export function updateKnowledgeLevels(
  currentCategory: Category,
  currentKc: KnowledgeComponent,
) {
  let updatedCategory: Category | null = null;

  const noneSet = new Set(currentCategory.none);
  const adequateSet = new Set(currentCategory.adequate);
  const excellentSet = new Set(currentCategory.excellent);
  if (isExcellentLevel(currentKc.pKnown)) {
    noneSet.delete(currentKc.id);
    adequateSet.delete(currentKc.id);
    excellentSet.add(currentKc.id);
    updatedCategory = {
      ...currentCategory,
      none: noneSet,
      adequate: adequateSet,
      excellent: excellentSet,
    };
  } else if (isAdequateLevel(currentKc.pKnown)) {
    noneSet.delete(currentKc.id);
    adequateSet.add(currentKc.id);
    excellentSet.delete(currentKc.id);
    updatedCategory = {
      ...currentCategory,
      none: noneSet,
      adequate: adequateSet,
      excellent: excellentSet,
    };
  }

  return updatedCategory ?? currentCategory;
}
