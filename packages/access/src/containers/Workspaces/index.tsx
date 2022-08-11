import React from 'react';

import { Banner } from '@kubed/components';
import { Enterprise } from '@kubed/icons';

export default function Workspaces() {
  return (
    <Banner
      icon={<Enterprise />}
      title={t('WORKSPACE_PL')}
      description={t('WORKSPACE_DESC')}
      className="mb12"
    />
  );
}
