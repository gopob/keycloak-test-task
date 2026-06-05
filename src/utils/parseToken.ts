import type { AppTokenParsed } from '../types/keycloak';
import type { UserProfile } from '../types/auth';

export function parseUserProfile(
  token: AppTokenParsed | undefined,
  clientId: string
): UserProfile {
  return {
    username: token?.preferred_username ?? '',
    fullName: token?.name ?? '',
    email: token?.email ?? '',
    emailVerified: token?.email_verified ?? false,
    realmRoles: token?.realm_access?.roles ?? [],
    clientRoles: token?.resource_access?.[clientId]?.roles ?? [],
  };
}
