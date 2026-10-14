import { IPodsDetailsItem, IPodsTableRow, IPodStudentsOptions } from 'src/types/pods';

export const _podsListMock: IPodsTableRow[] = [
  {
    _id: '1',
    podName: 'Pod 1',
    podDescription: 'Pod 1 description',
    mentor: 'Mentor 1',
    students: ['1', '2', '3', '4', '5'],
  },
  {
    _id: '2',
    podName: 'Pod 2',
    podDescription: 'Pod 2 description',
    mentor: 'Mentor 2',
    students: ['1', '2', '3', '4', '5'],
  },
  {
    _id: '3',
    podName: 'Pod 3',
    podDescription: 'Pod 3 description',
    mentor: 'Mentor 3',
    students: ['1', '2', '3', '4', '5'],
  },
  {
    _id: '4',
    podName: 'Pod 4',
    podDescription: 'Pod 4 description',
    mentor: 'Mentor 4',
    students: ['1', '2', '3', '4', '5'],
  },
  {
    _id: '5',
    podName: 'Pod 5',
    podDescription: 'Pod 5 description',
    mentor: 'Mentor 5',
    students: ['1', '2', '3', '4', '5'],
  },
];

export const _podsStudentsOptionsMock: IPodStudentsOptions[] = [
  { value: '1', label: 'John Doe' },
  { value: '2', label: 'Jane Doe' },
  { value: '3', label: 'John Smith' },
  { value: '4', label: 'Jane Smith' },
];

export const _podsDetailsMock: IPodsDetailsItem[] = [
  {
    _id: '1',
    img: 'https://via.placeholder.com/150',
    studentName: 'John Doe',
    schoolName: 'School 1',
    submissionsCount: 10,
  },
  {
    _id: '2',
    img: 'https://via.placeholder.com/150',
    studentName: 'Jane Doe',
    schoolName: 'School 2',
    submissionsCount: 20,
  },
  {
    _id: '3',
    img: 'https://via.placeholder.com/150',
    studentName: 'John Smith',
    schoolName: 'School 3',
    submissionsCount: 30,
  },
  {
    _id: '4',
    img: 'https://via.placeholder.com/150',
    studentName: 'Jane Smith',
    schoolName: 'School 4',
    submissionsCount: 40,
  },
  {
    _id: '5',
    img: 'https://via.placeholder.com/150',
    studentName: 'John Doe',
    schoolName: 'School 5',
    submissionsCount: 50,
  },
  {
    _id: '6',
    img: 'https://via.placeholder.com/150',
    studentName: 'Jane Doe',
    schoolName: 'School 6',
    submissionsCount: 60,
  },
];
