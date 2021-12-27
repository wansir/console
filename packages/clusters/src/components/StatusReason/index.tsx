import React from 'react';
import styled from 'styled-components';
import { Information, Success, Error } from '@kubed/icons';
import { Text, Popover } from '@kubed/components';
import { get } from 'lodash';

const Wrapper = styled.span``;

const Conditions = styled.div``;

interface StatusReasonProps {
  data: any;
  hasTip?: boolean;
}

const isSuccess = (condition: any) => condition.status === 'True';

const StatusReason = ({ data, hasTip }: StatusReasonProps) => {
  const conditions = (
    <Conditions>
      {Object.values(get(data, 'conditions', {})).map((cd: any) => (
        <div key={cd.type} className="condition-item">
          <div className="condition-title">
            {isSuccess(cd) ? <Success variant="coloured" /> : <Error color="#fff" fill="#ea4641" />}
            <span>
              {t(`CLUSTER_CONDITION_${cd.type.toUpperCase()}`, {
                defaultValue: cd.type,
              })}
            </span>
          </div>
          {cd.status && <p>{`${t('STATUS')}: ${cd.status}`}</p>}
          {cd.reason && (
            <p>{`${t('REASON')}: ${t(`CLUSTER_REASON_${cd.reason.toUpperCase()}`, {
              defaultValue: cd.reason,
            })}`}</p>
          )}
          {cd.message && <p>{`${t('MESSAGE')}: ${cd.message}`}</p>}
        </div>
      ))}
    </Conditions>
  );

  const icon = <Information color="#fff" fill="#f5a623" />;
  return (
    <Wrapper>
      {hasTip ? (
        <Popover content={conditions} title={t('CLUSTER_CONDITIONS')}>
          {icon}
        </Popover>
      ) : (
        icon
      )}
      <Text color="warning">{t('Not Ready')}</Text>
    </Wrapper>
  );
};

export default StatusReason;
