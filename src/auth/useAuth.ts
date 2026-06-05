import { useContext } from 'react';
import type { AuthContextValue } from '../types/auth';
import { AuthContext } from './AuthContext';

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
