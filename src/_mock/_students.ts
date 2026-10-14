// import { IStudentsDetails, IStudentsTableRow, IStudentWeekSubmission } from 'src/types/students';

// export const _studentsMock: IStudentsTableRow[] = [
//   { _id: '1', name: 'John Doe', email: 'john.doe@example.com', schoolName: 'School A' },
//   { _id: '2', name: 'Jane Doe', email: 'jane.doe@example.com', schoolName: 'School B' },
//   { _id: '3', name: 'John Smith', email: 'john.smith@example.com', schoolName: 'School C' },
//   { _id: '4', name: 'Jane Smith', email: 'jane.smith@example.com', schoolName: 'School D' },
//   { _id: '5', name: 'John Doe', email: 'john.doe@example.com', schoolName: 'School A' },
//   { _id: '6', name: 'Jane Doe', email: 'jane.doe@example.com', schoolName: 'School B' },
//   { _id: '7', name: 'John Smith', email: 'john.smith@example.com', schoolName: 'School C' },
//   { _id: '8', name: 'Jane Smith', email: 'jane.smith@example.com', schoolName: 'School D' },
//   { _id: '9', name: 'John Doe', email: 'john.doe@example.com', schoolName: 'School A' },
//   { _id: '10', name: 'Jane Doe', email: 'jane.doe@example.com', schoolName: 'School B' },
//   { _id: '11', name: 'John Smith', email: 'john.smith@example.com', schoolName: 'School C' },
//   { _id: '12', name: 'Jane Smith', email: 'jane.smith@example.com', schoolName: 'School D' },
//   { _id: '13', name: 'John Doe', email: 'john.doe@example.com', schoolName: 'School A' },
//   { _id: '14', name: 'Jane Doe', email: 'jane.doe@example.com', schoolName: 'School B' },
//   { _id: '15', name: 'John Smith', email: 'john.smith@example.com', schoolName: 'School C' },
//   { _id: '16', name: 'Jane Smith', email: 'jane.smith@example.com', schoolName: 'School D' },
//   { _id: '17', name: 'John Doe', email: 'john.doe@example.com', schoolName: 'School A' },
//   { _id: '18', name: 'Jane Doe', email: 'jane.doe@example.com', schoolName: 'School B' },
//   { _id: '19', name: 'John Smith', email: 'john.smith@example.com', schoolName: 'School C' },
//   { _id: '20', name: 'Jane Smith', email: 'jane.smith@example.com', schoolName: 'School D' },
//   { _id: '21', name: 'John Doe', email: 'john.doe@example.com', schoolName: 'School A' },
//   { _id: '22', name: 'Jane Doe', email: 'jane.doe@example.com', schoolName: 'School B' },
//   { _id: '23', name: 'John Smith', email: 'john.smith@example.com', schoolName: 'School C' },
//   { _id: '24', name: 'Jane Smith', email: 'jane.smith@example.com', schoolName: 'School D' },
// ];

// export const _studentsDetailsMock: IStudentsDetails = {
//   avatar: 'https://via.placeholder.com/150',
//   name: 'John Doe',
//   email: 'john.doe@example.com',
//   guardianName: 'Jane Doe',
//   guardianEmail: 'jane.doe@example.com',
//   schoolName: 'School A',
//   grade: '10',
// };

// export const _studentWeekSubmissionsMock: IStudentWeekSubmission[] = [
//   {
//     _id: '1',
//     weekNumber: '1',
//     weekTitle: 'Week 1',
//     tasks: [
//       {
//         _id: 'task-1-1',
//         challengeType: 'MANUAL_SUBMISSION',
//         status: 'PENDING',
//         taskSubmission: {
//           title: 'Task 1',
//           instructions: 'Instructions for Task 1',
//           referenceMaterials: ['anas.pdfs'],
//         },
//       },
//       {
//         _id: 'task-1-2',
//         challengeType: 'QUIZ',
//         status: 'PENDING',
//         taskSubmission: {
//           quizType: 'QUIZ 1',
//           attempts: 0,
//           score: '0',
//           quizArray: [
//             {
//               question: 'Question 1',
//               scenario: 'Scenario 1',
//               option: {
//                 option: 'Option 1',
//                 isCorrect: true,
//               },
//             },
//           ],
//         },
//       },
//       {
//         _id: 'task-1-3',
//         challengeType: 'MANUAL_SUBMISSION',
//         status: 'PENDING',
//         taskSubmission: {
//           title: 'Task 3',
//           instructions: 'Instructions for Task 3',
//           referenceMaterials: ['anas.docs'],
//         },
//       },
//     ],
//   },
//   {
//     _id: '2',
//     weekNumber: '2',
//     weekTitle: 'Week 2',
//     tasks: [
//       {
//         _id: 'task-2-1',
//         challengeType: 'MANUAL_SUBMISSION',
//         status: 'PENDING',
//         taskSubmission: {
//           title: 'Task 2',
//           instructions: 'Instructions for Task 2',
//           referenceMaterials: ['https://www.google.com'],
//         },
//       },
//       {
//         _id: 'task-2-2',
//         challengeType: 'QUIZ',
//         status: 'PENDING',
//         taskSubmission: {
//           quizType: 'QUIZ 2',
//           attempts: 0,
//           score: '0',
//           quizArray: [
//             {
//               question: 'Question 2',
//               scenario: 'Scenario 2',
//               option: {
//                 option: 'Option 2',
//                 isCorrect: true,
//               },
//             },
//             {
//               question: 'Question 3',
//               scenario: 'Scenario 3',
//               option: {
//                 option: 'Option 3',
//                 isCorrect: true,
//               },
//             },
//             {
//               question: 'Question 4',
//               scenario: 'Scenario 4',
//               option: {
//                 option: 'Option 4',
//                 isCorrect: true,
//               },
//             },
//           ],
//         },
//       },
//       {
//         _id: 'task-2-3',
//         challengeType: 'MANUAL_SUBMISSION',
//         status: 'PENDING',
//         taskSubmission: {
//           title: 'Task 3',
//           instructions: 'Instructions for Task 3',
//           referenceMaterials: ['https://www.google.com'],
//         },
//       },
//     ],
//   },
// ];
