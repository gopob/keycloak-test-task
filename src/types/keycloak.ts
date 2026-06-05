import type { KeycloakTokenParsed } from 'keycloak-js';

export interface AppTokenParsed extends KeycloakTokenParsed {
  preferred_username?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  email_verified?: boolean;
}
