import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Flex,
  FlexItem,
  Stack,
  StackItem,
  Text,
  TextContent,
  TextVariants,
} from '@patternfly/react-core';
import { useAuth } from '../auth/useAuth';
import { LoginButton } from '../components/auth/LoginButton';
import { ROUTES } from '../constants/routes';

export function HomePage(): JSX.Element {
  const { authenticated, user } = useAuth();

  return (
    <Card>
      <CardTitle component="h1">Keycloak React SPA</CardTitle>
      <CardBody>
        <Stack hasGutter>
          <StackItem>
            <TextContent>
              <Text component={TextVariants.p}>
                Демонстрационное одностраничное приложение на React, защищённое через Keycloak с
                использованием OpenID Connect и PKCE.
              </Text>
              <Text component={TextVariants.p}>
                Главная страница доступна всем. Профиль требует входа, а раздел «Приложение»
                доступен только пользователям с нужной realm-ролью.
              </Text>
            </TextContent>
          </StackItem>
          <StackItem>
            {authenticated && user ? (
              <Stack hasGutter>
                <StackItem>
                  <TextContent>
                    <Text component={TextVariants.h2}>
                      Здравствуйте, {user.fullName || user.username}!
                    </Text>
                  </TextContent>
                </StackItem>
                <StackItem>
                  <Flex spaceItems={{ default: 'spaceItemsMd' }}>
                    <FlexItem>
                      <Button
                        variant="primary"
                        component={(props) => <Link {...props} to={ROUTES.PROFILE} />}
                      >
                        Открыть профиль
                      </Button>
                    </FlexItem>
                    <FlexItem>
                      <Button
                        variant="secondary"
                        component={(props) => <Link {...props} to={ROUTES.APP} />}
                      >
                        Перейти в приложение
                      </Button>
                    </FlexItem>
                  </Flex>
                </StackItem>
              </Stack>
            ) : (
              <LoginButton />
            )}
          </StackItem>
        </Stack>
      </CardBody>
    </Card>
  );
}
