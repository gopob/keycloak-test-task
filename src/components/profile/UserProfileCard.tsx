import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListDescription,
  DescriptionListGroup,
  DescriptionListTerm,
  Label,
} from '@patternfly/react-core';
import type { UserProfile } from '../../types/auth';
import { RoleList } from './RoleList';

export interface UserProfileCardProps {
  user: UserProfile;
}

export function UserProfileCard({ user }: UserProfileCardProps): JSX.Element {
  return (
    <Card>
      <CardTitle component="h1">Профиль пользователя</CardTitle>
      <CardBody>
        <DescriptionList isHorizontal>
          <DescriptionListGroup>
            <DescriptionListTerm>Имя</DescriptionListTerm>
            <DescriptionListDescription>{user.fullName || '-'}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Логин</DescriptionListTerm>
            <DescriptionListDescription>{user.username || '-'}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Email</DescriptionListTerm>
            <DescriptionListDescription>{user.email || '-'}</DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Email подтверждён</DescriptionListTerm>
            <DescriptionListDescription>
              {user.emailVerified ? (
                <Label color="green">Подтверждён</Label>
              ) : (
                <Label color="grey">Не подтверждён</Label>
              )}
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Realm-роли</DescriptionListTerm>
            <DescriptionListDescription>
              <RoleList roles={user.realmRoles} />
            </DescriptionListDescription>
          </DescriptionListGroup>
          <DescriptionListGroup>
            <DescriptionListTerm>Client-роли</DescriptionListTerm>
            <DescriptionListDescription>
              <RoleList roles={user.clientRoles} />
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </CardBody>
    </Card>
  );
}
