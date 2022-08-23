import React from 'react';
import { Home, Image } from '@kubed/icons';
import { useUrl } from '@ks-console/shared';
import { Banner, Card, Field } from '@kubed/components';

import { Header, Content, ImageWrapper, Details } from './styles';

function PlatformBaseInfo(): JSX.Element {
  const { getDocsUrl } = useUrl({ module: 'custom_console' });

  return (
    <>
      <Banner
        icon={<Home />}
        className="mb12"
        title={t('PLATFORM_INFORMATION')}
        description={t('PLATFORM_INFORMATION_DESC')}
      />
      <Card sectionTitle={t('BASIC_INFORMATION')}>
        <Header>
          <Field
            avatar={<Image size={40} />}
            value={window.location.host}
            label={t('PLATFORM_ADDRESS')}
          />
          <a href={getDocsUrl()} target="_blank" rel="noreferrer noopener">
            {t('HOW_TO_MODIFY_PLATFORM_INFO')}
          </a>
        </Header>
        <Content>
          <ImageWrapper>
            <img src="/assets/logo.svg" alt="" />
          </ImageWrapper>
          <Details>
            <Field value={globals.config.title} label={t('PLATFORM_TITLE')} />
            <Field
              value={globals.config.description || t('KS_DESCRIPTION')}
              label={t('PLATFORM_DESCRIPTION')}
            />
          </Details>
        </Content>
      </Card>
    </>
  );
}

export default PlatformBaseInfo;
