import React from 'react';

import { Banner } from '@kubed/components';
import { Human } from '@kubed/icons';

export default function Accounts() {
  return (
    <Banner icon={<Human />} title={t('USER_PL')} description={t('USER_DESC')} className="mb12" />
  );
}
