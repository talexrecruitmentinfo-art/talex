import { jobs } from '@/constants/jobs';

export const jobService = {
  list: async () => {
    return Promise.resolve(jobs);
  },
  findById: async (id: string) => {
    return Promise.resolve(jobs.find((job) => job.id === id));
  },
};
