import type Keycloak from 'keycloak-js';

export interface TokenRefresher {
  start: () => void;
  stop: () => void;
}

export interface TokenRefresherOptions {
  minValiditySeconds: number;
  intervalMs: number;
  onRefreshed: () => void;
  onExpired: (error: unknown) => void;
}

export function createTokenRefresher(kc: Keycloak, options: TokenRefresherOptions): TokenRefresher {
  const { minValiditySeconds, intervalMs, onRefreshed, onExpired } = options;
  let timer: ReturnType<typeof setInterval> | null = null;

  const stop = (): void => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  const start = (): void => {
    if (timer !== null) {
      return;
    }
    timer = setInterval(() => {
      kc.updateToken(minValiditySeconds).then(
        (refreshed) => {
          if (refreshed) {
            onRefreshed();
          }
        },
        (error: unknown) => {
          stop();
          onExpired(error);
        }
      );
    }, intervalMs);
  };

  return { start, stop };
}
