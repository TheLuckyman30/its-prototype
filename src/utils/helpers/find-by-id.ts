export function findById<T extends { id: string }>(
  targetId: string,
  objects: T[],
) {
  return objects.find((obj) => obj.id === targetId);
}
