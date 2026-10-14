// ----------------------------------------------------------------------
// Exercise template domain types.
// The list + edit screens are fully config-driven so that swapping the
// mock data for a real API only touches `src/_mock/_exercise-template.ts`.
// ----------------------------------------------------------------------

export type ExerciseStatus = 'Active' | 'Inactive';

export type ExerciseLevel = 'Easy' | 'Medium' | 'Hard';

export type ExerciseProgressStatus = 'not_started' | 'skipped' | 'completed';

export type ExerciseSlug =
  | 'find-the-match'
  | 'word-scramble'
  | 'important-dates'
  | 'grocery-list'
  | 'position-recall'
  | 'number-sequence-memory';

/** Which data-entry table renders at the bottom of the edit screen. */
export type ExercisePoolType = 'pair' | 'word' | 'dates' | 'single' | 'image' | 'none';

// ----------------------------------------------------------------------
// List item
// ----------------------------------------------------------------------

export interface IExerciseTemplate {
  _id: string;
  slug: ExerciseSlug;
  title: string;
  icon: string;
  status: ExerciseStatus;
}

export interface IExerciseListItem {
  _id: string;
  name: string;
  isActive: boolean;
  progressStatus?: ExerciseProgressStatus;
  level?: ExerciseLevel;
  description?: string;
}

// ----------------------------------------------------------------------
// Game tutorial (shown before the exercise starts)
// ----------------------------------------------------------------------

export interface IExerciseQuickTips {
  linkText?: string;
  items: string[];
}

export interface IExerciseTutorial {
  exerciseNumber: number;
  title: string;
  slug: ExerciseSlug;
  tutorialHeading: string;
  tutorialSubtitle: string;
  videoUrl?: string;
  videoPoster?: string;
  quickTips: IExerciseQuickTips;
}

// ----------------------------------------------------------------------
// Raw API "get exercise by id" response shapes
// ----------------------------------------------------------------------

export type ApiExerciseType =
  | 'groceryList'
  | 'importantDates'
  | 'numberSequence'
  | 'positionRecall'
  | 'wordScramble'
  | 'findMatch';

export type ApiLevel = 'easy' | 'medium' | 'hard';

export interface IApiPair {
  left: string;
  right: string;
}

export interface IApiWord {
  word: string;
  level: ApiLevel;
}

export interface IApiDateOption {
  date: string;
  isCorrect: boolean;
}

export interface IApiImportantDate {
  event: string;
  options: IApiDateOption[];
}

export interface IApiMemoryCard {
  label: string;
  image?: string;
  imageIndex?: number;
}

export type ApiGameItem =
  | string
  | number
  | IApiPair
  | IApiWord
  | IApiImportantDate
  | IApiMemoryCard;

export interface IApiDifficulty {
  level: ApiLevel;
  time?: number;
  itemsShown?: number;
  minLength?: number;
  digits?: { min: number; max: number };
  grid?: { rows: number; cols: number };
  game: ApiGameItem[];
}

export interface IExerciseDetails {
  _id: string;
  name: string;
  type: ApiExerciseType;
  isActive: boolean;
  tutorial: string;
  quickNotes: string;
  difficulty: IApiDifficulty[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// ----------------------------------------------------------------------
// Difficulty / Time settings
// ----------------------------------------------------------------------

export interface IDifficultyLevel {
  level: ExerciseLevel;
  /** Single-variant label, e.g. "6 word pairs", "3x3 Grid". */
  label?: string;
  /** Min/max-variant labels, e.g. "3 Minimum" / "4 Maximum". */
  minLabel?: string;
  maxLabel?: string;
}

export interface IDifficultySettings {
  /** Overrides the default "Difficulty settings" heading. */
  title?: string;
  subtitle: string;
  variant: 'single' | 'minmax';
  levels: IDifficultyLevel[];
}

export interface ITimeLevel {
  level: ExerciseLevel;
  seconds: number;
}

export interface ITimeSettings {
  subtitle: string;
  levels: ITimeLevel[];
}

// ----------------------------------------------------------------------
// Pool meta + row shapes (the differing bottom section)
// ----------------------------------------------------------------------

export interface IExercisePoolMeta {
  type: ExercisePoolType;
  icon: string;
  title: string;
  subtitle: string;
}

export interface IPairRow {
  id: string;
  left: string;
  right: string;
}

export interface IWordRow {
  id: string;
  word: string;
  level: ExerciseLevel;
}

export interface IDateOption {
  id: string;
  label: string;
}

export interface IDatesRow {
  id: string;
  event: string;
  options: IDateOption[];
  correctOptionId: string | null;
}

export interface ISingleRow {
  id: string;
  value: string;
}

export interface IImageRow {
  id: string;
  value: string;
  image?: string;
  imageFile?: File;
}

export type ExercisePoolRow = IPairRow | IWordRow | IDatesRow | ISingleRow | IImageRow;

// ----------------------------------------------------------------------
// Full edit-screen config
// ----------------------------------------------------------------------

export interface IExerciseConfig {
  slug: ExerciseSlug;
  /** Page heading (may differ from list title, e.g. "Memory Card"). */
  heading: string;
  subheading: string;
  /** Label used in the breadcrumb trail. */
  breadcrumbLabel: string;
  status: ExerciseStatus;
  enable: {
    title: string;
    subtitle: string;
  };
  difficulty: IDifficultySettings;
  time?: ITimeSettings;
  pool?: IExercisePoolMeta;
  rows?: ExercisePoolRow[];
  footerNote: string;
}
