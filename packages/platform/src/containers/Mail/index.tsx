import React from 'react';
import { Home } from '@kubed/icons';
import { Banner } from '@kubed/components';

function Mail(): JSX.Element {
  return (
    <>
      <Banner
        icon={<Home />}
        className="mb12"
        title={t('NOTIFICATION_CONFIGURATION')}
        description={t('NOTIFICATION_CONFIGURATION_DESC')}
      />
    </>
  );
}

export default Mail;
