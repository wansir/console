import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { get } from 'lodash';
import { Button, Card, Alert, Form, FormItem, Input } from '@kubed/components';
import { request, Pattern } from '@ks-console/shared';

import {
  LoginHeader,
  LoginWrapper,
  WelcomeTitle,
  LoginDivider,
  LoginButton,
} from '../Login/styles';

const emailValidator = (rule: any, value: string) => {
  console.log(rule, value);
  // request.get();
};

const LoginConfirm = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const loginMutation = useMutation(
    data => {
      return request.post('login/confirm', data);
    },
    {
      onSuccess: data => {
        console.log(data);
      },
    },
  );
  return (
    <LoginWrapper>
      <LoginHeader href="/">
        <img src="/assets/logo.svg" />
      </LoginHeader>
      <Card className="login-box" contentClassName="login-card">
        <WelcomeTitle>{t('Please confirm your account info')}</WelcomeTitle>
        <LoginDivider />
        {errorMessage && (
          <Alert className="login-alert" type="error" showIcon={false}>
            {t(errorMessage)}
          </Alert>
        )}
        <Form className="login-form" size="md" onFinish={loginMutation.mutate}>
          <FormItem
            label={t('EMAIL')}
            name="email"
            className="username"
            help={t('USER_SETTING_EMAIL_DESC')}
            initialValue={get(globals, 'user.email')}
            rules={[
              {
                required: true,
                message: t('INPUT_USERNAME_OR_EMAIL_TIP'),
              },
              { type: 'email', message: t('INVALID_EMAIL') },
              { validator: emailValidator },
            ]}
          >
            <Input name="email" placeholder="user@example.com" />
          </FormItem>
          <FormItem
            label={t('Username')}
            name="username"
            help={t('USERNAME_DESC')}
            defaultValue={get(globals, 'user.username')}
            rules={[
              { required: true, message: t('Please input username') },
              { pattern: Pattern.PATTERN_USER_NAME, message: t('USERNAME_INVALID') },
            ]}
          >
            <Input name="username" placeholder="user@example.com" maxLength={32} />
          </FormItem>
          <LoginButton>
            <Button color="secondary" block shadow radius="xl" loading={loginMutation.isLoading}>
              {t('Log In')}
            </Button>
          </LoginButton>
        </Form>
      </Card>
    </LoginWrapper>
  );
};

export default LoginConfirm;
