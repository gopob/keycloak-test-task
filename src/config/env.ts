export interface AppEnv {
  keycloakUrl: string;
  keycloakRealm: string;
  keycloakClientId: string;
  appRequiredRole: string;
}

const DEFAULT_APP_ROLE = 'app-user';

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing required environment variable ${name}. ` +
      'Define it in your .env file (see .env.example).'
    );
  }
  return value;
}

export const env: AppEnv = {
  keycloakUrl: requireEnv('VITE_KEYCLOAK_URL', import.meta.env.VITE_KEYCLOAK_URL),
  keycloakRealm: requireEnv('VITE_KEYCLOAK_REALM', import.meta.env.VITE_KEYCLOAK_REALM),
  keycloakClientId: requireEnv('VITE_KEYCLOAK_CLIENT_ID', import.meta.env.VITE_KEYCLOAK_CLIENT_ID),
  appRequiredRole: import.meta.env.VITE_APP_REQUIRED_ROLE || DEFAULT_APP_ROLE,
};
