import { Bullseye, Spinner, Stack, StackItem } from '@patternfly/react-core';

export interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label }: LoadingStateProps): JSX.Element {
  return (
    <Bullseye>
      <Stack hasGutter style={{ textAlign: 'center' }}>
        <StackItem>
          <Spinner aria-label={label ?? 'Загрузка'} />
        </StackItem>
        {label ? <StackItem>{label}</StackItem> : null}
      </Stack>
    </Bullseye>
  );
}
