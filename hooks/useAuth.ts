'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';

interface UseAuthReturn {
  user: any;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: any;
  register: any;
  logout: any;
  clearError: any;
  isReady: boolean;
  isAuthenticated: boolean;
}

export function useAuth(): UseAuthReturn {
  const [isClient, setIsClient] = useState(false);
  const auth = useAuthStore();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return {
      ...auth,
      isReady: false,
      isAuthenticated: false,
    } as UseAuthReturn;
  }

  return {
    ...auth,
    isReady: true,
    isAuthenticated: !!auth.user,
  } as UseAuthReturn;
}
