import { IExerciseTemplate, IExerciseTutorial } from 'src/types/exercise-template';

import { _exerciseTemplates } from './_exercise-template';

// ----------------------------------------------------------------------
// Tutorial content shown before each exercise game starts.
// Swap `getExerciseTutorial` body with a real API call later.
// ----------------------------------------------------------------------

const TUTORIAL_BY_SLUG: Record<
  string,
  Omit<IExerciseTutorial, 'exerciseNumber' | 'title' | 'slug' | 'tutorialHeading'>
> = {
  'grocery-list': {
    tutorialSubtitle: 'Below is a small question to show you exactly what to do.',
    quickTips: {
      linkText: 'Check out this quick example!',
      items: [
        'Memorize the items before the timer ends, then recall them in the correct order. Give it a look...',
        "Each level gets progressively more challenging. When you're ready, we'll start your real challenge!",
      ],
    },
  },
  'position-recall': {
    tutorialSubtitle: 'Below is a solved question to show you exactly what to do.',
    quickTips: {
      linkText: 'Check out this quick example!',
      items: [
        'Match all the items with their corresponding words before the timer ends. Give it a look...',
        'Grids get larger as difficulty level gets progressively more challenging.  When you are ready, we will start your real challenge!',
      ],
    },
  },
  'word-scramble': {
    tutorialSubtitle: 'Below is a solved question to show you exactly what to do.',
    quickTips: {
      linkText: 'Check out this quick example!',
      items: [
        "Think about common words that use these letters. Try different combinations in your mind first. \n Don't worry if you dont get it right away, practice helps!",
        'Each level gets progressively more challenging.  Longer words appear as difficulty increases. \n When you are ready, we will start your real challenge!',
      ],
    },
  },
  'number-sequence-memory': {
    tutorialSubtitle: 'Below is a solved question to show you exactly what to do.',
    quickTips: {
      linkText: 'Check out this quick example!',
      items: [
        'Focus on remembering both the number and its position. Give it a look...',
        'Each level gets progressively more challenging.  When you are ready, we will start your real challenge!',
      ],
    },
  },
  'important-dates': {
    tutorialSubtitle: 'Below is a solved question to show you exactly what to do.',
    quickTips: {
      linkText: 'Check out this quick example!',
      items: [
        "Associate the event with the date in your mind. Think about the significance of each date. \n Don't worry if you don't get it right, practice helps!",
        'Each level gets progressively more challenging. When you are ready, we will start your real challenge!',
      ],
    },
  },
  'find-the-match': {
    tutorialSubtitle: 'Below is a solved question to show you exactly what to do.',
    quickTips: {
      linkText: 'Check out this quick example!',
      items: [
        'Match the words with their corresponding action. Give it a look..',
        'Each level gets progressively more challenging.  When you are ready, we will start your real challenge!',
      ],
    },
  },
};

const DEFAULT_TUTORIAL: Omit<
  IExerciseTutorial,
  'exerciseNumber' | 'title' | 'slug' | 'tutorialHeading'
> = {
  tutorialSubtitle: 'Below is a short guide to show you exactly what to do.',
  quickTips: {
    linkText: 'Check out this quick example!',
    items: [
      'Follow the on-screen instructions carefully during each round.',
      'Each level gets progressively more challenging as you improve.',
    ],
  },
};

export function getExerciseTemplate(idOrSlug: string): IExerciseTemplate | undefined {
  return _exerciseTemplates.find((item) => item._id === idOrSlug || item.slug === idOrSlug);
}

export function getExerciseTutorial(idOrSlug: string): IExerciseTutorial | undefined {
  const template = getExerciseTemplate(idOrSlug);
  if (!template) return undefined;

  const exerciseNumber = _exerciseTemplates.findIndex((item) => item._id === template._id) + 1;
  const content = TUTORIAL_BY_SLUG[template.slug] ?? DEFAULT_TUTORIAL;

  return {
    exerciseNumber,
    title: template.title,
    slug: template.slug,
    tutorialHeading: `Exercise ${exerciseNumber}: Tutorial (${template.title})`,
    ...content,
  };
}

export function getNextExerciseTemplate(idOrSlug: string): IExerciseTemplate | undefined {
  const current = getExerciseTemplate(idOrSlug);
  if (!current) return undefined;

  const index = _exerciseTemplates.findIndex((item) => item._id === current._id);
  return _exerciseTemplates[index + 1];
}
