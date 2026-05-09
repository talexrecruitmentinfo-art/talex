export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
}

export function clearStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
}

export function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function formatCurrency(amount: number, currency: string = 'KES'): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-KE').format(
    typeof date === 'string' ? new Date(date) : date
  );
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function calculateProfileCompletion(profile: Record<string, any>): number {
  const requiredFields = [
    'fullName',
    'dateOfBirth',
    'nationality',
    'phone',
    'email',
    'address',
  ];

  const completedFields = requiredFields.filter((field) => 
    profile[field] && profile[field].toString().trim() !== ''
  ).length;

  return Math.round((completedFields / requiredFields.length) * 100);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getErrorMessage(error: unknown, fallback = 'An unexpected error occurred.'): string {
  if (!isRecord(error)) return fallback;

  const response = error.response;
  if (isRecord(response)) {
    const data = response.data;
    if (isRecord(data)) {
      const message = data.message;
      if (typeof message === 'string') return message;
    }
  }

  const message = error.message;
  if (typeof message === 'string') return message;

  return fallback;
}

/**
 * Download offer letter PDF for an application
 */
export function downloadOfferLetter(applicationId: string): void {
  if (typeof window === 'undefined') return;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://backendtalex.onrender.com/api';
  const url = `${apiUrl}/applications/${applicationId}/offer-letter`;
  window.open(url, '_blank');
}

/**
 * Pipeline stage labels and colors
 */
export const pipelineStages = {
  applied: { label: 'Applied', color: 'text-slate-600 bg-slate-50', icon: '📝' },
  review: { label: 'In Review', color: 'text-blue-600 bg-blue-50', icon: '👁️' },
  interview: { label: 'Interview', color: 'text-purple-600 bg-purple-50', icon: '📞' },
  offer: { label: 'Offer', color: 'text-orange-600 bg-orange-50', icon: '🎁' },
  hired: { label: 'Hired', color: 'text-green-600 bg-green-50', icon: '✅' },
  rejected: { label: 'Rejected', color: 'text-red-600 bg-red-50', icon: '❌' },
};

/**
 * Get pipeline stage display info
 */
export function getPipelineStageInfo(stage?: string) {
  return pipelineStages[stage as keyof typeof pipelineStages] || pipelineStages.applied;
}
