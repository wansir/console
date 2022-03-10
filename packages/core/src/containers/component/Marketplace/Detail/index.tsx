import React, { useState } from 'react';
import cx from 'classnames';
import { set } from 'lodash';
import { Field, Loading, Button } from '@kubed/components';
import { Failure } from '@kubed/icons';
import { Link, useParams } from 'react-router-dom';
import {
  useFetchComponent,
  useFetchSubscriptions,
  useSubscriptionMutation,
} from '../../../../stores/component';

import { MarketHeader, MarketWrapper } from '../styles';
import { HeaderInner, TabBar, Container, Tabs, Tab, TabContainer } from './styles';
import InformationTab from './InformationTab';
import DetailsTab from './DetailsTab';

const tabs = ['Information', 'Details'];

const MarketplaceDetail = () => {
  const { componentId } = useParams();
  const componentName = componentId?.split('-')[1];
  if (!componentName) return null;

  const [activeTab, setActiveTab] = useState('Information');

  const { data, isLoading } = useFetchComponent(componentName);
  const { data: subscriptions } = useFetchSubscriptions(componentName);
  console.log('data', data);
  const { mutate } = useSubscriptionMutation(componentName);

  const handleAction = (stop: boolean) => {
    if (stop) {
      set(subscriptions, 'status.phase', 'suspense');
      set(subscriptions, 'spec.enabled', false);
    } else {
      set(subscriptions, 'status.phase', 'deployed');
      set(subscriptions, 'spec.enabled', true);
    }
    mutate(subscriptions);
  };

  const renderActionButton = () => {
    if (data?.status === 'deployed') {
      return (
        <Button
          leftIcon={<Failure size={20} />}
          onClick={() => {
            handleAction(true);
          }}
        >
          Uninstall
        </Button>
      );
    }
    return (
      <Button
        color="secondary"
        shadow
        onClick={() => {
          handleAction(false);
        }}
      >
        Install
      </Button>
    );
  };

  return (
    <MarketWrapper className="is-white">
      <MarketHeader>
        <HeaderInner>
          <div className="back">
            <Link to="/components">Back</Link>
          </div>
          <Field
            className="banner-title"
            avatar={<img src="https://s.juicefs.com/static/jfs/logo.svg" />}
            label={data?.description}
            value={data?.name}
          />
        </HeaderInner>
      </MarketHeader>
      {isLoading ? (
        <Loading className="page-loading" />
      ) : (
        <>
          <TabBar>
            <TabContainer>
              <Tabs>
                {tabs.map(tab => (
                  <Tab
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                    }}
                    className={cx({ 'is-active': tab === activeTab })}
                  >
                    {tab}
                  </Tab>
                ))}
              </Tabs>
              {renderActionButton()}
            </TabContainer>
          </TabBar>
          <Container style={{ padding: '32px 12px' }}>
            {activeTab === 'Information' ? (
              <InformationTab data={data} />
            ) : (
              <DetailsTab data={data} />
            )}
          </Container>
        </>
      )}
    </MarketWrapper>
  );
};

export default MarketplaceDetail;
