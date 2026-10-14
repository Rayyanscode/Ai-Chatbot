import { IUserFeedback } from 'src/types/user-feedback';

// ----------------------------------------------------------------------

export const _userFeedback: IUserFeedback[] = [
  {
    _id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Primary User',
    status: 'Very Satisfied',
    feedback:
      'This game is fantastic! It really helps me improve my memory. I play it every day and can see the difference.',
    user: 'user-1',
    createdAt: '2026-05-06T15:30:00.000Z',
    updatedAt: '2026-05-06T15:30:00.000Z',
  },
  {
    _id: '2',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    role: 'Caregiver',
    status: 'Very Satisfied',
    feedback:
      "As a caregiver, this app is invaluable. I can monitor my father's progress and see how he's improving. The dashboard is very helpful!",
    user: 'user-2',
    createdAt: '2026-05-06T15:30:00.000Z',
    updatedAt: '2026-05-06T15:30:00.000Z',
  },
  {
    _id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'Primary User',
    status: 'Neutral',
    feedback:
      "I noticed that sometimes the progress charts don't update immediately after completing an exercise. Need to refresh the page.",
    user: 'user-3',
    createdAt: '2026-05-06T15:30:00.000Z',
    updatedAt: '2026-05-06T15:30:00.000Z',
  },
  {
    _id: '4',
    name: 'Mary Johnson',
    email: 'mary@example.com',
    role: 'Primary User',
    status: 'Satisfied',
    feedback:
      'Position Recall is challenging but fun. Sometimes I wish there was an easier difficulty level for beginners.',
    user: 'user-4',
    createdAt: '2026-05-06T15:30:00.000Z',
    updatedAt: '2026-05-06T15:30:00.000Z',
  },
  {
    _id: '5',
    name: 'David Thompson',
    email: 'david@example.com',
    role: 'Caregiver',
    status: 'Satisfied',
    feedback:
      'Excellent platform! My wife enjoys the exercises and I can see her progress improving week by week.',
    user: 'user-5',
    createdAt: '2026-05-06T15:30:00.000Z',
    updatedAt: '2026-05-06T15:30:00.000Z',
  },
  {
    _id: '6',
    name: 'Lisa Martinez',
    email: 'lisa@example.com',
    role: 'Primary User',
    status: 'Satisfied',
    feedback:
      'Please add a dark mode option. It would be easier on the eyes during evening exercises.',
    user: 'user-6',
    createdAt: '2026-05-06T15:30:00.000Z',
    updatedAt: '2026-05-06T15:30:00.000Z',
  },
];
