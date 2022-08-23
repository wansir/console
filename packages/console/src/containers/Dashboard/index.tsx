import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { formatTime, getActions, isPlatformAdmin } from '@ks-console/shared';
import { Role, Clock } from '@kubed/icons';

import AdminDashboard from './Admin';
import { DashboardWrapper, DashboardHeader, UserAvatar, WelcomeWrapper, LoginInfo } from './styles';

const getWorkspace = () => {
  let workspace;
  const savedWorkspace = localStorage.getItem(`${globals.user.username}-workspace`);

  if (savedWorkspace && globals.app.workspaces.includes(savedWorkspace)) {
    workspace = savedWorkspace;
  } else {
    workspace = globals.app.workspaces[0];
  }

  return workspace;
};

const Dashboard = () => {
  const navigate = useNavigate();
  if (!isPlatformAdmin()) {
    if (globals.user.globalrole === 'users-manager') {
      navigate('/access/accounts');
    }

    if (getActions({ module: 'workspaces' }).includes('create')) {
      navigate('/access/workspaces');
    }

    if (isEmpty(globals.user.workspaces)) {
      const workspace = getWorkspace();
      navigate(`/workspaces/${workspace}`);
    }
  }

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
