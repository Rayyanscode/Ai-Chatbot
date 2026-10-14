import { IExerciseConfig, IExerciseTemplate } from 'src/types/exercise-template';

// ----------------------------------------------------------------------
// NOTE: Static placeholder data. This file is the single integration point
// for the real API. The list view consumes `_exerciseTemplates`, the edit
// view consumes `getExerciseConfig(id)`. Swap the bodies of these with real
// fetch hooks and nothing else in the UI layer needs to change.
// ----------------------------------------------------------------------

export const _exerciseTemplates: IExerciseTemplate[] = [
  {
    _id: '1',
    slug: 'grocery-list',
    title: 'Grocery List',
    icon: 'garden:puzzle-piece-stroke-12',
    status: 'Active',
  },
  {
    _id: '2',
    slug: 'position-recall',
    title: 'Position Recall',
    icon: 'mdi:grid',
    status: 'Active',
  },
  {
    _id: '3',
    slug: 'word-scramble',
    title: 'Word Unscramble',
    icon: 'iconoir:text',
    status: 'Active',
  },
  {
    _id: '4',
    slug: 'number-sequence-memory',
    title: 'Number Sequence Memory',
    icon: 'garden:puzzle-piece-stroke-12',
    status: 'Active',
  },
  {
    _id: '5',
    slug: 'important-dates',
    title: 'Important Dates',
    icon: 'lucide:calendar',
    status: 'Active',
  },
  {
    _id: '6',
    slug: 'find-the-match',
    title: 'Find The Match',
    icon: 'garden:puzzle-piece-stroke-12',
    status: 'Active',
  },
];

// ----------------------------------------------------------------------
// Shared bits reused across configs
// ----------------------------------------------------------------------

const DEFAULT_TIME = {
  subtitle: "Every level has it's own fixed time.",
  levels: [
    { level: 'Easy' as const, seconds: 45 },
    { level: 'Medium' as const, seconds: 35 },
    { level: 'Hard' as const, seconds: 25 },
  ],
};

// ----------------------------------------------------------------------
// Per-exercise edit configs, keyed by slug
// ----------------------------------------------------------------------

const EXERCISE_CONFIGS: Record<string, IExerciseConfig> = {
  'find-the-match': {
    slug: 'find-the-match',
    heading: 'Find The Match',
    subheading: 'Add word pairs - system handles shuffling and layout',
    breadcrumbLabel: 'Find The Match',
    status: 'Active',
    enable: {
      title: 'Enable Game for Primary Users',
      subtitle: 'Disabled games will not be accessible to Primary Users.',
    },
    difficulty: {
      subtitle: 'Number of pairs shown per level',
      variant: 'single',
      levels: [
        { level: 'Easy', label: '6 word pairs' },
        { level: 'Medium', label: '8+ word pairs' },
        { level: 'Hard', label: '8+ word pairs' },
      ],
    },
    pool: {
      type: 'pair',
      icon: 'boxicons:cart',
      title: 'Pair Pool',
      subtitle:
        'Enter word pairs (e.g. Apple → Fruit) or upload image pairs. System shuffles and presents them.',
    },
    rows: [
      { id: 'r1', left: 'Apple', right: 'Fruit' },
      { id: 'r2', left: 'Dog', right: 'Animal' },
      { id: 'r3', left: '', right: '' },
      { id: 'r4', left: '', right: '' },
      { id: 'r5', left: '', right: '' },
    ],
    footerNote:
      'System controls: card placement, shuffle logic, line-drawing mechanic, scoring - not editable here.',
  },

  'word-scramble': {
    slug: 'word-scramble',
    heading: 'Word Scramble',
    subheading: 'Add words — system scramble them automatically',
    breadcrumbLabel: 'Word Scramble',
    status: 'Active',
    enable: {
      title: 'Enable Game for Primary Users',
      subtitle: 'Disabled games will not be accessible to Primary Users.',
    },
    difficulty: {
      subtitle: 'Word length controls difficulty automatically.',
      variant: 'single',
      levels: [
        { level: 'Easy', label: '4 per words' },
        { level: 'Medium', label: '4+ Alphabets Words' },
        { level: 'Hard', label: '6+ Alphabets Words' },
      ],
    },
    pool: {
      type: 'word',
      icon: 'boxicons:cart',
      title: 'Word Pool',
      subtitle:
        'Add everyday words. System automatically assigns them to the correct difficulty by letter count and scrambles them each session.',
    },
    rows: [
      { id: 'r1', word: 'Cat', level: 'Easy' },
      { id: 'r2', word: 'Lion', level: 'Medium' },
      { id: 'r3', word: 'Giraffe', level: 'Hard' },
      { id: 'r4', word: 'Sun', level: 'Easy' },
      { id: 'r5', word: 'Eagle', level: 'Medium' },
    ],
    footerNote: 'scrambling logic, word selection randomness, scoring — not editable here.',
  },

  'important-dates': {
    slug: 'important-dates',
    heading: 'Important Dates',
    subheading: 'Manage event + date pairs for recall exercises',
    breadcrumbLabel: 'Important dates',
    status: 'Active',
    enable: {
      title: 'Enable Game for Primary Users',
      subtitle: 'Inactive games will not be visible to Primary Users',
    },
    difficulty: {
      subtitle: 'Number of dates shown per level',
      variant: 'single',
      levels: [
        { level: 'Easy', label: '2 Imp. Dates' },
        { level: 'Medium', label: '4 Imp. Dates' },
        { level: 'Hard', label: '6 Imp. Dates' },
      ],
    },
    time: DEFAULT_TIME,
    pool: {
      type: 'dates',
      icon: 'boxicons:cart',
      title: 'Important Dates - Event + date pool',
      subtitle:
        'Add real events and their dates. System presents them as multiple-choice recall exercises.',
    },
    rows: [
      {
        id: 'r1',
        event: 'Declaration of America Independence  (USA)',
        options: [
          { id: 'o1', label: 'On July 4, 2026' },
          { id: 'o2', label: 'On June 4, 2026' },
          { id: 'o3', label: 'On April 4, 2026' },
        ],
        correctOptionId: 'o1',
      },
      {
        id: 'r2',
        event: "St. Patrick's Day.",
        options: [
          { id: 'o1', label: 'On July 22, 2025' },
          { id: 'o2', label: 'On May 17, 2026' },
          { id: 'o3', label: 'On July 14, 2022' },
        ],
        correctOptionId: 'o2',
      },
      {
        id: 'r3',
        event: '',
        options: [
          { id: 'o1', label: 'On July 4, 2026' },
          { id: 'o2', label: 'On July 4, 2026' },
          { id: 'o3', label: 'On July 4, 2026' },
        ],
        correctOptionId: null,
      },
      {
        id: 'r4',
        event: '',
        options: [
          { id: 'o1', label: 'On July 4, 2026' },
          { id: 'o2', label: 'On July 4, 2026' },
          { id: 'o3', label: 'On July 4, 2026' },
        ],
        correctOptionId: null,
      },
    ],
    footerNote: 'System controls: option shuffling, scoring — not editable here.',
  },

  'grocery-list': {
    slug: 'grocery-list',
    heading: 'Grocery List',
    subheading: 'Manage item pool — system picks items randomly each session',
    breadcrumbLabel: 'Grocery list',
    status: 'Active',
    enable: {
      title: 'Enable Game for Primary Users',
      subtitle: 'Inactive games will not be visible to Primary Users',
    },
    difficulty: {
      subtitle: 'Number of items shown per level',
      variant: 'single',
      levels: [
        { level: 'Easy', label: '5 Grocery List' },
        { level: 'Medium', label: '8 Grocery List' },
        { level: 'Hard', label: '10 Grocery List' },
      ],
    },
    time: DEFAULT_TIME,
    pool: {
      type: 'single',
      icon: 'boxicons:cart',
      title: 'Grocery List',
      subtitle:
        'Add real everyday grocery items. System picks randomly — user never sees the same list twice.',
    },
    rows: [
      { id: 'r1', value: 'Milk' },
      { id: 'r2', value: 'Bread' },
      { id: 'r3', value: 'Eggs' },
      { id: 'r4', value: 'Butter' },
    ],
    footerNote: 'System controls: randomization, selection logic, scoring — not editable here.',
  },

  'position-recall': {
    slug: 'position-recall',
    heading: 'Memory Card',
    subheading: 'Configure display time — system generates all content',
    breadcrumbLabel: 'Position recall',
    status: 'Active',
    enable: {
      title: 'Enable Game for Primary Users',
      subtitle: 'Inactive games will not be visible to Primary Users',
    },
    difficulty: {
      subtitle: 'The grid dimensions shown to the user per level',
      variant: 'single',
      levels: [
        { level: 'Easy', label: '3x3 Grid' },
        { level: 'Medium', label: '4x3 Grid' },
        { level: 'Hard', label: '4x4 Grid' },
      ],
    },
    time: DEFAULT_TIME,
    pool: {
      type: 'image',
      icon: 'boxicons:cart',
      title: 'Memory Card',
      subtitle:
        'Add image(s) with the corresponding words. The system randomizes selection so users get a different set each time.',
    },
    rows: [
      { id: 'r1', value: 'African Firefinch', image: '' },
      { id: 'r2', value: 'Andean Swift', image: '' },
      { id: 'r3', value: '', image: '' },
      { id: 'r4', value: '', image: '' },
    ],
    footerNote: 'System controls: randomization, selection logic, scoring — not editable here.',
  },

  'number-sequence-memory': {
    slug: 'number-sequence-memory',
    heading: 'Number Sequence Memory',
    subheading: 'Configure parameters only — system generates all numbers automatically',
    breadcrumbLabel: 'Number sequence memory',
    status: 'Active',
    enable: {
      title: 'Enable Game for Primary Users',
      subtitle: 'Inactive games will not be visible to Primary Users',
    },
    difficulty: {
      title: 'Difficulty settings — digit count',
      subtitle: 'Set the min and max number of digits per difficulty level',
      variant: 'minmax',
      levels: [
        { level: 'Easy', minLabel: '3-Minimum', maxLabel: '4-Maximum' },
        { level: 'Medium', minLabel: '4-Minimum', maxLabel: '6-Maximum' },
        { level: 'Hard', minLabel: '6-Minimum', maxLabel: '8-Maximum' },
      ],
    },
    time: DEFAULT_TIME,
    pool: { type: 'none', icon: '', title: '', subtitle: '' },
    footerNote:
      'Actual number generation, Sequence randomization, Scoring logic — not editable here.',
  },
};

// ----------------------------------------------------------------------
// Lookups (swap these two with API calls)
// ----------------------------------------------------------------------

export function getExerciseConfig(idOrSlug: string): IExerciseConfig | undefined {
  if (EXERCISE_CONFIGS[idOrSlug]) {
    return EXERCISE_CONFIGS[idOrSlug];
  }

  const template = _exerciseTemplates.find((item) => item._id === idOrSlug);
  return template ? EXERCISE_CONFIGS[template.slug] : undefined;
}
