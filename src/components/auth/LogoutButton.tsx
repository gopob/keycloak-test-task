import { Button } from '@patternfly/react-core';
import { useAuth } from '../../auth/useAuth';

export function LogoutButton(): JSX.Element {
  const { logout } = useAuth();
  return (
    <Button variant="secondary" onClick={() => logout()}>
      Выйти
    </Button>
  );
}
