export type CaregiverStatus = 'Approved' | 'Pending';

export interface ICaregiver {
  _id: string;
  name: string;
  status: CaregiverStatus;
}
