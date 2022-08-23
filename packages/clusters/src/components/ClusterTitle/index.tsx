import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Field, BadgeAnchor, Badge, Tag } from '@kubed/components';
import { Icon, Constants } from '@ks-console/shared';
import StatusReason from '../StatusReason';

const { CLUSTER_PROVIDER_ICON, CLUSTER_GROUP_TAG_TYPE } = Constants;

const TitleWrapper = styled.div``;

const sizeMapper = {
  large: {
    icon: 48,
    title: 20,
  },
  normal: {
    icon: 40,
    title: 12,
  },
  small: {
    icon: 20,
    title: 12,
  },
};

interface ClusterTitleProps {
  cluster: any;
  noStatus?: boolean;
  size?: 'small' | 'normal' | 'large';
  theme?: 'dark' | 'light';
  to?: string;
  width?: number | string;
  className?: string;
}

const ClusterTitle = ({
  cluster,
  noStatus,
  size = 'normal',
  theme = 'dark',
  to,
  width = '33.4%',
  className,
}: ClusterTitleProps) => {
  if (!cluster) return null;
  const isReady = get(cluster.conditions, 'Ready.status') === 'True';
  const { icon: iconSize, title: titleSize } = sizeMapper[size];

  const icon = (
    <BadgeAnchor offset={[6, 6]}>
      {!noStatus && isReady && <Badge color="success" dot />}
      <Icon
        name={CLUSTER_PROVIDER_ICON[cluster.provider] || 'kubernetes'}
        size={iconSize}
        variant={theme}
      />
    </BadgeAnchor>
  );

  const title = (
    <TitleWrapper>
      {to ? (
        <Link to={to} title={cluster.name} style={{ fontSize: `${titleSize}px` }}>
          {cluster.name}
        </Link>
      ) : (
        <span title={cluster.name} style={{ fontSize: `${titleSize}px` }}>
          {cluster.name}
        </span>
      )}
      {cluster.group && (
        <Tag color={CLUSTER_GROUP_TAG_TYPE[cluster.group]} className="ml12">
          {t(`ENV_${cluster.group.toUpperCase()}`, {
            defaultValue: cluster.group,
          })}
        </Tag>
      )}
      {cluster.isHost && (
        <Tag color="warning" className="ml12">
          {t('HOST_CLUSTER')}
        </Tag>
      )}
      {size === 'small' && !noStatus && !isReady && <StatusReason data={cluster} />}
    </TitleWrapper>
  );

  const description =
    isReady || noStatus ? (
      <span>{cluster.description || '-'}</span>
    ) : (
      <StatusReason data={cluster} />
    );

  return (
    <Field avatar={icon} label={description} value={title} width={width} className={className} />
  );
};

export default ClusterTitle;
