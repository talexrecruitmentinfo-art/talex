export type ApplicationStatus = 'submitted' | 'reviewed' | 'shortlisted' | 'interview' | 'approved' | 'rejected';

export type Application = {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  paymentStatus: 'pending' | 'completed' | 'failed';
  appliedAt: string;
  jobTitle: string;
  company: string;
};

export type CreateApplicationRequest = {
  jobId: string;
  paymentStatus: 'pending' | 'completed';
};
