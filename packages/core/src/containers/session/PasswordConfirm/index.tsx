import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { Success } from '@kubed/icons';
import { Button, Card, Form, FormItem, InputPassword, Alert } from '@kubed/components';
import { request, Pattern } from '@ks-console/shared';

import {
  LoginHeader,
  LoginWrapper,
  WelcomeTitle,
  LoginDivider,
  LoginButton,
} from '../Login/styles';
import { PasswordTipWrapper, TipInner, TipItem } from './styles';

const LoginConfirm = () => {
  const [password, setPassword] = useState('');
  const history = useHistory();
  const name = get(globals, 'user.username');

  const handleRequest = (data: Array<any>) => {
    return request.patch(`apis/iam.kubesphere.io/v1alpha2/users/${name}`, data, {
      headers: {
        'content-type': 'application/json-patch+json',
      },
    });
  };

  const resetPasswdMutation = useMutation(
    (data: any) => {
      return handleRequest([
        {
          op: 'remove',
          path: '/metadata/annotations/iam.kubesphere.io~1uninitialized',
        },
        {
          op: 'replace',
          path: '/spec/password',
          value: data.password,
        },
      ]);
    },
    {
      onSuccess: () => {
        history.push('/');
      },
    },
  );

  const skipMutation = useMutation(
    () => {
      return handleRequest([
        {
          op: 'remove',
          path: '/metadata/annotations/iam.kubesphere.io~1uninitialized',
        },
      ]);
    },
    {
      onSuccess: () => {
        history.push('/');
      },
    },
  );

  const handleFormChange = (data: any) => {
    setPassword(data.password);
  };

  return (
    <LoginWrapper>
      <LoginHeader href="/">
        <img src="/assets/logo.svg" alt="logo" />
      </LoginHeader>
      <Card className="login-box" contentClassName="login-card">
        <WelcomeTitle>{t('Please reset your password')}</WelcomeTitle>
        <LoginDivider />
        <Alert showIcon={false} className="mb12">
          {t('CHANGE_PASSWORD_TIP')}
        </Alert>
        <Form
          className="login-form"
          size="md"
          onValuesChange={handleFormChange}
          onFinish={resetPasswdMutation.mutate}
        >
          <FormItem
            label={t('PASSWORD')}
            name="password"
            className="username"
            rules={[
              { required: true, message: t('PASSWORD_EMPTY_DESC') },
              {
                pattern: Pattern.PATTERN_PASSWORD,
                message: t('PASSWORD_DESC'),
              },
            ]}
          >
            <InputPassword name="password" />
          </FormItem>
          <PasswordTipWrapper>
            <p>{t('Your password must meet the following requirements')}</p>
            <TipInner>
              <TipItem>
                <Success
                  size={16}
                  variant={Pattern.PATTERN_WORD.test(password) ? 'coloured' : 'dark'}
                />
                {t('At least 1 uppercase and lowercase letter')}
              </TipItem>
              <TipItem>
                <Success
                  size={16}
                  variant={Pattern.PATTERN_NUMBER.test(password) ? 'coloured' : 'dark'}
                />
                {t('At least 1 number')}
              </TipItem>
              <TipItem>
                <Success size={16} variant={password.length >= 6 ? 'coloured' : 'dark'} />
                {t('Password length is at least 6 characters')}
              </TipItem>
            </TipInner>
          </PasswordTipWrapper>
          <LoginButton>
            <Button
              color="secondary"
              block
              shadow
              radius="xl"
              className="mb12"
              loading={resetPasswdMutation.isLoading}
            >
              {t('Submit')}
            </Button>
            <Button
              variant="text"
              block
              radius="xl"
              as="div"
              // @ts-ignore
              onClick={skipMutation.mutate}
              loading={skipMutation.isLoading}
            >
              {t('Modify Later')}
            </Button>
          </LoginButton>
        </Form>
      </Card>
    </LoginWrapper>
  );
};

export default LoginConfirm;
