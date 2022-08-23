import React from 'react';
import { Role } from '@kubed/icons';
import { Banner } from '@kubed/components';

export default function Roles() {
  return (
    <Banner
      icon={<Role />}
      title={t('PLATFORM_ROLE_PL')}
      description={t('PLATFORM_ROLE_DESC')}
      className="mb12"
    />
  );
}
