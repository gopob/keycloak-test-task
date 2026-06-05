import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
} from '@patternfly/react-core';
import { ExclamationCircleIcon } from '@patternfly/react-icons';

export interface ErrorStateProps {
  title?: string;
  error?: Error | null;
  onRetry?: () => void;
}

export function ErrorState({ title = 'Ошибка', error, onRetry }: ErrorStateProps): JSX.Element {
  return (
    <Bullseye>
      <EmptyState variant="lg">
        <EmptyStateHeader
          titleText={title}
          headingLevel="h2"
          icon={<ExclamationCircleIcon color="var(--pf-v5-global--danger-color--100)" />}
        />
        {error?.message ? <EmptyStateBody>{error.message}</EmptyStateBody> : null}
        {onRetry ? (
          <EmptyStateFooter>
            <EmptyStateActions>
              <Button variant="primary" onClick={onRetry}>
                Повторить
              </Button>
            </EmptyStateActions>
          </EmptyStateFooter>
        ) : null}
      </EmptyState>
    </Bullseye>
  );
}
