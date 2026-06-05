export const ROUTES = {
  HOME: '/',
  PROFILE: '/profile',
  APP: '/app',
  FORBIDDEN: '/forbidden',
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
