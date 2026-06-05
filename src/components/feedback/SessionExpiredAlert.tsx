import { Alert, AlertActionCloseButton, AlertActionLink, AlertGroup } from '@patternfly/react-core';
import { useAuth } from '../../auth/useAuth';

export function SessionExpiredAlert(): JSX.Element | null {
  const { sessionExpired, login, dismissSessionExpired } = useAuth();

  if (!sessionExpired) {
    return null;
  }

  return (
    <AlertGroup isToast>
      <Alert
        variant="danger"
        title="Сессия истекла"
        actionClose={<AlertActionCloseButton onClose={dismissSessionExpired} />}
        actionLinks={<AlertActionLink onClick={() => login()}>Войти снова</AlertActionLink>}
      >
        Срок действия сессии истёк. Войдите снова, чтобы продолжить.
      </Alert>
    </AlertGroup>
  );
}
