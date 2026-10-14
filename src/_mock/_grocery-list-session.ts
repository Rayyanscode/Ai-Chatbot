import { ExerciseLevel } from 'src/types/exercise-template';

import { getExerciseTutorial } from './_exercise-game';

// ----------------------------------------------------------------------
// Grocery List game session — swap with API when ready.
// ----------------------------------------------------------------------

const STUDY_SECONDS: Record<ExerciseLevel, number> = {
  Easy: 45,
  Medium: 35,
  Hard: 25,
};

const ITEM_COUNT: Record<ExerciseLevel, number> = {
  Easy: 5,
  Medium: 5,
  Hard: 8,
};

const ITEM_POOL = [
  'Milk',
  'Yogurt',
  'Sugar',
  'Rice',
  'Spice',
  'Bread',
  'Eggs',
  'Butter',
  'Chicken',
  'Salt',
];

const ROUND_ITEM_OFFSETS = [0, 3];

export function getGroceryListRoundCount() {
  return ROUND_ITEM_OFFSETS.length;
}

function getItemsForRound(level: ExerciseLevel, roundIndex: number) {
  const count = ITEM_COUNT[level];
  const offset = ROUND_ITEM_OFFSETS[roundIndex] ?? 0;
  const items: string[] = [];

  for (let i = 0; i < count; i += 1) {
    items.push(ITEM_POOL[(offset + i) % ITEM_POOL.length]);
  }

  return items;
}

export function getGroceryListSession(
  idOrSlug: string,
  level: ExerciseLevel = 'Medium',
  roundIndex = 0
) {
  const tutorial = getExerciseTutorial(idOrSlug);
  if (!tutorial || tutorial.slug !== 'grocery-list') return undefined;

  if (roundIndex < 0 || roundIndex >= ROUND_ITEM_OFFSETS.length) return undefined;

  return {
    exerciseNumber: tutorial.exerciseNumber,
    title: tutorial.title,
    level,
    studySeconds: STUDY_SECONDS[level],
    items: getItemsForRound(level, roundIndex),
    roundIndex,
    totalRounds: ROUND_ITEM_OFFSETS.length,
  };
}
