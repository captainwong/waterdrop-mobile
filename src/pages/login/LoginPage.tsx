import { useMutation } from '@apollo/client';
import { Button, Form, Input, Space, Toast } from 'antd-mobile';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutline, EyeOutline } from 'antd-mobile-icons';
import md5 from 'md5';
import { AUTH_TOKEN } from '@/utils/const';
import { STUDENT_LOGIN } from '../../graphql/student';
import styles from './LoginPage.module.less';
import logo from '../../assets/henglogo@2x.png';

interface IValue {
  account: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [pwdVisible, setPwdVisible] = React.useState(false);
  const [login, { loading }] = useMutation(STUDENT_LOGIN);
  const navigate = useNavigate();

  const onFinish = async (v: IValue) => {
    const result = await login({
      variables: {
        account: v.account,
        password: md5(v.password),
      },
    });
    if (result.data?.studentLogin?.code === 200) {
      localStorage.setItem(AUTH_TOKEN, result.data?.studentLogin?.data || '');
      Toast.show({
        content: '登录成功!',
        afterClose: () => {
          navigate('/');
        },
      });
    } else {
      Toast.show({
        icon: 'fail',
        content: result.data?.studentLogin?.message,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <Form
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            loading={loading}
          >
            登录
          </Button>
        }
      >
        <Form.Item
          name="account"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
            {
              pattern: /^[a-zA-Z0-9_-]{4,32}$/,
              message: '用户名必须是4到32位（字母，数字，下划线，减号）',
            },
          ]}
        >
          <Input placeholder="请输入用户名" clearable />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
            {
              pattern: /^[a-zA-Z0-9_-]{6,32}$/,
              message: '密码必须是6到32位（字母，数字，下划线，减号）',
            },
          ]}
          extra={
            <div>
              {pwdVisible ? (
                <EyeInvisibleOutline onClick={() => setPwdVisible(false)} />
              ) : (
                <EyeOutline onClick={() => setPwdVisible(true)} />
              )}
            </div>
          }
        >
          <Input
            type={pwdVisible ? 'text' : 'password'}
            clearable
            placeholder="请输入密码"
          />
        </Form.Item>
      </Form>
      <div className={styles.note}>
        <Space>
          没有账号？去
          <Link to="/register">注册</Link>
        </Space>
      </div>
    </div>
  );
};
