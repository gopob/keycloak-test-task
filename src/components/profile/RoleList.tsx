import { Label, LabelGroup, Text, TextContent, TextVariants } from '@patternfly/react-core';

export interface RoleListProps {
  roles: string[];
}

export function RoleList({ roles }: RoleListProps): JSX.Element {
  if (roles.length === 0) {
    return (
      <TextContent>
        <Text component={TextVariants.small} className="pf-v5-u-color-200">
          Ролей нет
        </Text>
      </TextContent>
    );
  }

  return (
    <LabelGroup numLabels={10}>
      {roles.map((role) => (
        <Label key={role} color="blue">
          {role}
        </Label>
      ))}
    </LabelGroup>
  );
}
