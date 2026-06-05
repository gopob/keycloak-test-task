import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { useAuth } from '../auth/useAuth';

export function ProtectedAppPage(): JSX.Element {
  const { user } = useAuth();

  return (
    <Card>
      <CardTitle component="h1">Защищённое приложение</CardTitle>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <Alert variant="success" isInline title="Доступ разрешён" />
          </StackItem>
          <StackItem>
            <TextContent>
              <Text component={TextVariants.p}>
                Этот раздел доступен только пользователям с требуемой realm-ролью. Вы вошли как{' '}
                <strong>{user?.username ?? 'неизвестный пользователь'}</strong>.
              </Text>
              <Text component={TextVariants.p}>
                Здесь могла бы располагаться функциональность, доступная только авторизованным
                пользователям с нужными правами.
              </Text>
            </TextContent>
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
}
