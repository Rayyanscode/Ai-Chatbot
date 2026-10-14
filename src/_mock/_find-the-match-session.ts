import { ExerciseLevel } from 'src/types/exercise-template';

import { getExerciseTutorial } from './_exercise-game';

// ----------------------------------------------------------------------
// Find The Match game session — swap with API when ready.
// ----------------------------------------------------------------------

const PLAY_SECONDS: Record<ExerciseLevel, number> = {
  Easy: 45,
  Medium: 35,
  Hard: 25,
};

const MATCH_PAIRS = [
  { left: 'Coffee', right: 'Drinking' },
  { left: 'Book', right: 'Reading' },
  { left: 'Football', right: 'Playing' },
  { left: 'Lunch', right: 'Eating' },
];

function shuffleItems<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function getFindTheMatchRoundCount() {
  return 1;
}

export function getFindTheMatchSession(idOrSlug: string, level: ExerciseLevel = 'Easy') {
  const tutorial = getExerciseTutorial(idOrSlug);
  if (!tutorial || tutorial.slug !== 'find-the-match') return undefined;

  const rightItems = shuffleItems(MATCH_PAIRS.map((pair) => pair.right));

  return {
    exerciseNumber: tutorial.exerciseNumber,
    title: tutorial.title,
    level,
    playSeconds: PLAY_SECONDS[level],
    pairs: MATCH_PAIRS,
    rightItems,
    roundIndex: 0,
    totalRounds: 1,
  };
}
