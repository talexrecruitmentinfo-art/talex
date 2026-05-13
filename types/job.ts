export type Job = {
  id: string;
  _id?: string;
  title: string;
  company: string;
  salary: string;
  province: string;
  category: string;
  experience: string;
  deadline: string;
  type: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
  applications?: number;
  status?: string;
  sponsored: boolean;
};
