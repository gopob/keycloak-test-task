import { Link } from 'react-router-dom';
import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
} from '@patternfly/react-core';
import { ExclamationTriangleIcon } from '@patternfly/react-icons';
import { ROUTES } from '../constants/routes';
import { REQUIRED_APP_ROLE } from '../constants/roles';

export function ForbiddenPage(): JSX.Element {
  return (
    <EmptyState variant="lg">
      <EmptyStateHeader
        titleText="403 - Доступ запрещён"
        headingLevel="h1"
        icon={<ExclamationTriangleIcon color="var(--pf-v5-global--warning-color--100)" />}
      />
      <EmptyStateBody>
        У вашей учётной записи отсутствует необходимая роль <strong>{REQUIRED_APP_ROLE}</strong>,
        требуемая для доступа к этому разделу. Обратитесь к администратору, чтобы получить нужные
        права.
      </EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button variant="primary" component={(props) => <Link {...props} to={ROUTES.HOME} />}>
            На главную
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
}
