// Authentication utilities (mock implementation)

import { User, UserRole } from '../data/mockData';

const AUTH_STORAGE_KEY = 'smarttrack_auth';

export interface AuthState {
  user: User | null;
  token: string | null;
}

export const login = (email: string, password: string): AuthState | null => {
  // Mock login - in production, this would make an API call
  // Demo credentials for each role:
  const mockUsers: Record<string, User> = {
    'admin@university.edu': {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'admin@university.edu',
      role: 'admin',
      department: 'Computer Science',
    },
    'lecturer@university.edu': {
      id: '2',
      name: 'Prof. Michael Chen',
      email: 'lecturer@university.edu',
      role: 'lecturer',
      department: 'Computer Science',
    },
    'advisor@university.edu': {
      id: '3',
      name: 'Dr. Emily Parker',
      email: 'advisor@university.edu',
      role: 'advisor',
      department: 'Engineering',
    },
    'student@university.edu': {
      id: '4',
      name: 'John Smith',
      email: 'student@university.edu',
      role: 'student',
      department: 'Computer Science',
    },
  };

  const user = mockUsers[email];
  
  if (user && password === 'password123') {
    const authState: AuthState = {
      user,
      token: `mock-jwt-token-${user.id}`,
    };
    
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    return authState;
  }
  
  return null;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getAuthState = (): AuthState | null => {
  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  const auth = getAuthState();
  return auth !== null && auth.user !== null;
};

export const hasRole = (role: UserRole): boolean => {
  const auth = getAuthState();
  return auth?.user?.role === role;
};

export const getCurrentUser = (): User | null => {
  const auth = getAuthState();
  return auth?.user || null;
};
