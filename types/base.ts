export type CuriculaData = {
  id: number;
  year: number;
};

export type DepartementsData = {
  id: number;
  code: string;
  name: string;
};

export type MajorsData = {
  id: number;
  name: string;
  departements: string;
};
