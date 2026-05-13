export type ApplicationStatus = 'submitted' | 'reviewed' | 'shortlisted' | 'interview' | 'accepted' | 'rejected' | 'pending';

export type PipelineStage = 'applied' | 'review' | 'interview' | 'offer' | 'hired' | 'rejected';

export type Applicant = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  resume?: string | null;
};

export type JobInfo = {
  id: string;
  title: string;
  company?: string;
};

export type Application = {
  id: string;
  _id?: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  pipelineStage?: PipelineStage;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  appliedAt: string;
  createdAt?: string;
  jobTitle?: string;
  company?: string;
  applicant?: Applicant;
  job?: JobInfo;
};

export type CreateApplicationRequest = {
  jobId: string;
  paymentId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
};
