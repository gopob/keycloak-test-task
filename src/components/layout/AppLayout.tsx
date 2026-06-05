import { Page, PageSection, SkipToContent } from '@patternfly/react-core';
import { Outlet } from 'react-router-dom';
import { SessionExpiredAlert } from '../feedback/SessionExpiredAlert';
import { AppMasthead } from './AppMasthead';

const MAIN_CONTENT_ID = 'main-content';

export function AppLayout(): JSX.Element {
  return (
    <Page
      header={<AppMasthead />}
      mainContainerId={MAIN_CONTENT_ID}
      skipToContent={
        <SkipToContent href={`#${MAIN_CONTENT_ID}`}>К основному содержимому</SkipToContent>
      }
    >
      <PageSection>
        <Outlet />
      </PageSection>
      <SessionExpiredAlert />
    </Page>
  );
}
