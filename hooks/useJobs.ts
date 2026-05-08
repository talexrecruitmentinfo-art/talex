'use client';

import { useJobStore } from '@/store/jobStore';
import { useEffect } from 'react';

export function useJobs() {
  const store = useJobStore();

  useEffect(() => {
    store.fetchJobs();
  }, []);

  return store;
}
