export function getRandomElement<T>(array: Array<T>) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
