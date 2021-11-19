import React, { useState } from 'react';
import { get } from 'lodash';
import { useMutation } from 'react-query';
import { Button, Card, Alert, Form, FormItem, Input, InputPassword } from '@kubed/components';
import { cookie, request } from '@ks-console/shared';
import {
  LoginHeader,
  LoginWrapper,
  WelcomeTitle,
  LoginDivider,
  OauthButton,
  LoginButton,
} from './styles';

type Server = {
  url: string;
  title: string;
  type: string;
  endSessionURL?: string;
};

function mix(salt: string, str: string) {
  if (str.length > salt.length) {
    salt += str.slice(0, str.length - salt.length);
  }

  const ret = [];
  const prefix = [];
  for (let i = 0, len = salt.length; i < len; i++) {
    const tomix = str.length > i ? str.charCodeAt(i) : 64;
    const sum = salt.charCodeAt(i) + tomix;
    prefix.push(sum % 2 === 0 ? '0' : '1');
    ret.push(String.fromCharCode(Math.floor(sum / 2)));
  }

  return `${window.btoa(prefix.join(''))}@${ret.join('')}`;
}

function encrypt(salt: string, str: string) {
  return mix(salt, window.btoa(str));
}

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const handleOAuthLogin = (server: Server) => {
    const info = {
      name: server.title,
      type: server.type,
      endSessionURL: server.endSessionURL,
    };
    cookie('oAuthLoginInfo', JSON.stringify(info));
    window.location.href = server.url;
  };

  const handleLoginPost = (formData: { username: string; password: string }) => {
    cookie('oAuthLoginInfo', '');
    const { username, password } = formData;
    const data = {
      username,
      encrypt: encrypt('kubesphere', password),
    };
    return request.post('login', data);
  };

  const loginMutation = useMutation(handleLoginPost, {
    onSuccess: (data: any) => {
      if (data.status !== 200) {
        setErrorMessage(data.message);
      }
      if (data.success) {
        // history.push(data.redirect);
        window.location.href = data.redirect;
      }
    },
  });

  return (
    <LoginWrapper>
      <LoginHeader href="/">
        <img src="/assets/logo.svg" />
      </LoginHeader>
      <Card className="login-box" contentClassName="login-card">
        <WelcomeTitle>{t('WELCOME')}</WelcomeTitle>
        <LoginDivider />
        {get(globals, 'oauthServers', []).map((server: Server) => (
          <OauthButton
            key={server.url}
            data-url={server.url}
            onClick={() => {
              handleOAuthLogin(server);
            }}
          >
            <span>{t('LOG_IN_WITH_TITLE', { title: server.title })}</span>
          </OauthButton>
        ))}
        {errorMessage && (
          <Alert className="login-alert" type="error" showIcon={false}>
            {t(errorMessage)}
          </Alert>
        )}
        <Form className="login-form" size="md" onFinish={loginMutation.mutate}>
          <FormItem
            label={t('USERNAME_OR_EMAIL')}
            name="username"
            className="username"
            rules={[
              {
                required: true,
                message: t('INPUT_USERNAME_OR_EMAIL_TIP'),
              },
            ]}
          >
            <Input placeholder="user@example.com" />
          </FormItem>
          <FormItem
            label={t('PASSWORD')}
            name="password"
            rules={[{ required: true, message: t('PASSWORD_EMPTY_DESC') }]}
          >
            <InputPassword placeholder="Password" />
          </FormItem>
          <LoginButton>
            <Button color="secondary" block shadow radius="xl" loading={loginMutation.isLoading}>
              {t('LOG_IN')}
            </Button>
          </LoginButton>
        </Form>
      </Card>
    </LoginWrapper>
  );
};

export default Login;
