import React from 'react';
import { formatTime, isPlatformAdmin } from '@ks-console/shared';
import { Role, Clock } from '@kubed/icons';

import AdminDashboard from './Admin';
import { DashboardWrapper, DashboardHeader, UserAvatar, WelcomeWrapper, LoginInfo } from './styles';

const Dashboard = () => {
  const { avatar_url: avatarUrl, globalrole, username, lastLoginTime } = globals.user || {};
  const loginTime = `${t('LAST_LOGIN_TIME')}${formatTime(lastLoginTime)}`;

  return (
    <DashboardWrapper>
      <DashboardHeader>
        <UserAvatar>
          <img src={avatarUrl || '/assets/default-user.svg'} />
        </UserAvatar>
        <WelcomeWrapper>
          <strong>{t('DASHBOARD_TITLE', { username })}</strong>
          <LoginInfo>
            <p>
              <Role size={16} />
              {globalrole}
            </p>
            <p>
              <Clock size={16} />
              {loginTime}
            </p>
          </LoginInfo>
        </WelcomeWrapper>
      </DashboardHeader>
      {isPlatformAdmin() ? <AdminDashboard /> : <div>Empty</div>}
    </DashboardWrapper>
  );
};

export default Dashboard;
