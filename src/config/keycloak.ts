import Keycloak, { type KeycloakInitOptions } from 'keycloak-js';
import { env } from './env';

export const keycloak = new Keycloak({
  url: env.keycloakUrl,
  realm: env.keycloakRealm,
  clientId: env.keycloakClientId,
});

export const KEYCLOAK_INIT_OPTIONS: KeycloakInitOptions = {
  onLoad: 'check-sso',
  pkceMethod: 'S256',
  silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  checkLoginIframe: false,
  enableLogging: import.meta.env.DEV,
};

export const TOKEN_MIN_VALIDITY_SECONDS = 70;
export const TOKEN_REFRESH_INTERVAL_MS = 20000;
