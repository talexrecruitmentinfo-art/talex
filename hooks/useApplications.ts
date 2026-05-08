'use client';

import { useApplicationStore } from '@/store/applicationStore';
import { useEffect } from 'react';

export function useApplications() {
  const store = useApplicationStore();

  useEffect(() => {
    store.fetchApplications();
  }, []);

  return store;
}
