import { Button } from '@patternfly/react-core';
import { useAuth } from '../../auth/useAuth';

export function LoginButton(): JSX.Element {
  const { login } = useAuth();
  return (
    <Button variant="primary" onClick={() => login()}>
      Войти
    </Button>
  );
}
