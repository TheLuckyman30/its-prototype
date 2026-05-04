export function calcProbOfKnown(
  pKnown: number,
  pwillLearn: number,
  pSlip: number,
  pGuess: number,
  isCorrect: boolean,
) {
  let pLearned: number = 0;

  if (isCorrect) {
    const top = pKnown * (1 - pSlip);
    const bottom = pKnown * (1 - pSlip) + (1 - pKnown) * pGuess;
    pLearned = top / bottom;
  } else {
    const top = pKnown * pSlip;
    const bottom = pKnown * pSlip + (1 - pKnown) * (1 - pGuess);
    pLearned = top / bottom;
  }

  const newPKnown = pLearned + (1 - pLearned) * pwillLearn;

  return newPKnown;
}
