export type UserData = {
  id: number;
  full_name: string;
  myits_id: string;
  department: string;
  major: string;
  semester: number | null;
};

export type StudentsData = {
  id: number;
  name: string;
  nim: string;
  majorId: number;
};

export type LecturersData = {
  id: number;
  nip: number;
  name: string;
  nmajorId: number;
};
