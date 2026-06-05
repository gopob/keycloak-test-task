import { useEffect, type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { ROUTES } from '../../constants/routes';
import { LoadingState } from '../feedback/LoadingState';

export interface ProtectedRouteProps {
  children: ReactElement;
  requiredRole?: string;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps): JSX.Element {
  const { status, authenticated, login, hasRealmRole } = useAuth();

  useEffect(() => {
    if (status !== 'initializing' && !authenticated) {
      login();
    }
  }, [status, authenticated, login]);

  if (status === 'initializing') {
    return <LoadingState />;
  }

  if (!authenticated) {
    return <LoadingState label="Перенаправление на страницу входа..." />;
  }

  if (requiredRole && !hasRealmRole(requiredRole)) {
    return <Navigate to={ROUTES.FORBIDDEN} replace />;
  }

  return children;
}
