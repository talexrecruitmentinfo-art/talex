export type Profile = {
  userId: string;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  phone: string;
  email: string;
  address: string;
  educationLevel: string;
  school: string;
  course: string;
  graduationYear: string;
  experience: number;
  currentRole: string;
  company: string;
  bio: string;
  cv: string | null;
  passport: string | null;
  certificates: string[];
  completionPercentage: number;
};

export type UpdateProfileRequest = Partial<Omit<Profile, 'userId' | 'completionPercentage'>>;
