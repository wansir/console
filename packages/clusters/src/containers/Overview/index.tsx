import React from 'react';
import { useStore } from '@kubed/stook';
import { Card, Group, Row, Col } from '@kubed/components';
import { Kubesphere, Kubernetes, Monitor } from '@kubed/icons';
import ClusterTitle from '../../components/ClusterTitle';
import { OverviewWrapper } from './styles';

const Overview = () => {
  const [cluster] = useStore('cluster');
  console.log(cluster);
  return (
    <OverviewWrapper>
      <ClusterTitle cluster={cluster} size="large" noStatus className="mb12" />
      <Row>
        <Col span={8}>
          <Card sectionTitle={t('SYSTEM_COMPONENT_PL')}>
            <Group>
              <Kubesphere size={44} />
              <Kubernetes size={44} />
              <Monitor size={44} />
            </Group>
          </Card>
        </Col>
        <Col span={4}></Col>
      </Row>
    </OverviewWrapper>
  );
};

export default Overview;
