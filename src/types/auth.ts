export interface UserProfile {
  username: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  realmRoles: string[];
  clientRoles: string[];
}

export type AuthStatus = 'initializing' | 'authenticated' | 'unauthenticated' | 'error';

export interface AuthContextValue {
  status: AuthStatus;
  authenticated: boolean;
  user: UserProfile | null;
  sessionExpired: boolean;
  login: () => void;
  logout: () => void;
  hasRealmRole: (role: string) => boolean;
  dismissSessionExpired: () => void;
}
