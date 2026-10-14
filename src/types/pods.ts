export type IPodsTableRow = {
  _id: string;
  podName: string;
  podDescription: string;
  mentor: string;
  students: string[];
};

export type IPodsTableSearch = {
  search: string;
};

export type IPodStudentsOptions = {
  _id?: string;
  label: string;
  value: string;
};

export type IPodItem = {
  _id?: string;
  podName: string;
  podDescription: string;
  mentor: string;
  students: IPodStudentsOptions[];
};

export type IPodsDetailsItem = {
  _id: string;
  img: string;
  studentName: string;
  schoolName: string;
  submissionsCount: number;
};

export type IPodPayload = {
  _id?: string;
  podName: string;
  podDescription: string;
  mentor: string;
  students: string[];
};
