import {
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  Nav,
  NavItem,
  NavList,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from '@patternfly/react-core';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/useAuth';
import { ROUTES, type AppRoute } from '../../constants/routes';
import { LoginButton } from '../auth/LoginButton';
import { LogoutButton } from '../auth/LogoutButton';

interface NavLink {
  label: string;
  to: AppRoute;
}

const NAV_LINKS: readonly NavLink[] = [
  { label: 'Главная', to: ROUTES.HOME },
  { label: 'Профиль', to: ROUTES.PROFILE },
  { label: 'Приложение', to: ROUTES.APP },
];

export function AppMasthead(): JSX.Element {
  const { authenticated, user } = useAuth();
  const { pathname } = useLocation();

  return (
    <Masthead>
      <MastheadMain>
        <MastheadBrand component={(props) => <Link {...props} to={ROUTES.HOME} />}>
          Keycloak React SPA
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar isFullHeight isStatic>
          <ToolbarContent>
            <ToolbarItem>
              <Nav variant="horizontal" aria-label="Основная навигация">
                <NavList>
                  {NAV_LINKS.map((link) => (
                    <NavItem
                      key={link.to}
                      to={link.to}
                      isActive={pathname === link.to}
                      component={(props) => <Link {...props} to={link.to} />}
                    >
                      {link.label}
                    </NavItem>
                  ))}
                </NavList>
              </Nav>
            </ToolbarItem>
            <ToolbarGroup align={{ default: 'alignRight' }}>
              {authenticated && user ? (
                <>
                  <ToolbarItem alignSelf="center">{user.username}</ToolbarItem>
                  <ToolbarItem>
                    <LogoutButton />
                  </ToolbarItem>
                </>
              ) : (
                <ToolbarItem>
                  <LoginButton />
                </ToolbarItem>
              )}
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );
}
