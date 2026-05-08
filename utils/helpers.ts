export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth-token');
}

export function setStoredToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('auth-token', token);
}

export function clearStoredToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('auth-token');
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
