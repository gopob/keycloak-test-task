import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { AuthContextValue, AuthStatus, UserProfile } from '../types/auth';
import type { AppTokenParsed } from '../types/keycloak';
import { env } from '../config/env';
import {
  keycloak,
  KEYCLOAK_INIT_OPTIONS,
  TOKEN_MIN_VALIDITY_SECONDS,
  TOKEN_REFRESH_INTERVAL_MS,
} from '../config/keycloak';
import { parseUserProfile } from '../utils/parseToken';
import { ErrorState } from '../components/feedback/ErrorState';
import { LoadingState } from '../components/feedback/LoadingState';
import { AuthContext } from './AuthContext';
import { createTokenRefresher, type TokenRefresher } from './tokenManager';

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [status, setStatus] = useState<AuthStatus>('initializing');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initStarted = useRef(false);
  const refresherRef = useRef<TokenRefresher | null>(null);

  useEffect(() => {
    if (initStarted.current) {
      return;
    }
    initStarted.current = true;

    const syncSession = () => {
      setUser(
        parseUserProfile(keycloak.tokenParsed as AppTokenParsed | undefined, env.keycloakClientId)
      );
    };

    const clearSession = () => {
      refresherRef.current?.stop();
      setUser(null);
    };

    const handleSessionExpired = () => {
      clearSession();
      setStatus('unauthenticated');
      setSessionExpired(true);
    };

    const refresher = createTokenRefresher(keycloak, {
      minValiditySeconds: TOKEN_MIN_VALIDITY_SECONDS,
      intervalMs: TOKEN_REFRESH_INTERVAL_MS,
      onRefreshed: syncSession,
      onExpired: handleSessionExpired,
    });
    refresherRef.current = refresher;

    keycloak.onAuthLogout = () => {
      clearSession();
      setStatus('unauthenticated');
    };
    keycloak.onTokenExpired = () => {
      keycloak.updateToken(TOKEN_MIN_VALIDITY_SECONDS).then(syncSession, handleSessionExpired);
    };

    keycloak
      .init(KEYCLOAK_INIT_OPTIONS)
      .then((authenticated) => {
        if (authenticated) {
          syncSession();
          setStatus('authenticated');
          refresher.start();
        } else {
          setStatus('unauthenticated');
        }
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error('Keycloak initialization failed'));
        setStatus('error');
      });

    return () => {
      refresherRef.current?.stop();
      refresherRef.current = null;
      keycloak.onAuthLogout = undefined;
      keycloak.onTokenExpired = undefined;
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const authenticated = status === 'authenticated';
    return {
      status,
      authenticated,
      user,
      sessionExpired,
      login: () =>
        keycloak.login({
          redirectUri: window.location.origin + window.location.pathname,
        }),
      logout: () => keycloak.logout({ redirectUri: window.location.origin }),
      hasRealmRole: (role: string) => keycloak.hasRealmRole(role),
      dismissSessionExpired: () => setSessionExpired(false),
    };
  }, [status, user, sessionExpired]);

  if (status === 'initializing') {
    return <LoadingState label="Подключение к Keycloak..." />;
  }

  if (status === 'error') {
    return (
      <ErrorState
        title="Ошибка аутентификации"
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
