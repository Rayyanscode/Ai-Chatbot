export type FeedbackRole = 'Primary User' | 'Caregiver';

export type SatisfactionLevel =
  | 'Very Satisfied'
  | 'Satisfied'
  | 'Neutral'
  | 'Dissatisfied'
  | 'Very Dissatisfied';

export interface IUserFeedback {
  _id: string;
  name: string;
  email: string;
  role: FeedbackRole;
  status: SatisfactionLevel;
  feedback: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
