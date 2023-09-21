import { useMutation } from '@apollo/client';
import { Button, Form, Input, Space, Toast } from 'antd-mobile';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '@/assets/henglogo@2x.png';
import { STUDENT_REGISTER } from '../../graphql/student';
import styles from './Register.module.less';

interface IValue {
  account: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const [register, { loading }] = useMutation(STUDENT_REGISTER);
  const navigate = useNavigate();

  const onFinish = async (v: IValue) => {
    if (v.password !== v.confirmPassword) {
      Toast.show({
        icon: 'fail',
        content: '两次密码不一致',
      });
      return;
    }

    const result = await register({
      variables: {
        account: v.account,
        password: v.password,
      },
    });
    if (result.data?.studentRegister?.code === 200) {
      Toast.show({
        content: '注册成功!',
        duration: 1000,
        afterClose: () => {
          navigate('/login');
        },
      });
    } else {
      Toast.show({
        icon: 'fail',
        content: result.data?.studentRegister?.message,
        duration: 3000,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinish}
        footer={
          <Button
            loading={loading}
            block
            type="submit"
            color="primary"
            size="large"
          >
            注册
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
          <Input clearable placeholder="请输入用户名" />
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
        >
          <Input clearable type="password" placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="确认密码"
          rules={[
            {
              required: true,
              message: '请再次输入密码',
            },
            {
              pattern: /^[a-zA-Z0-9_-]{6,32}$/,
              message: '密码必须是6到32位（字母，数字，下划线，减号）',
            },
            {
              validator: (_, value) => {
                const password = form.getFieldValue('password');
                if (password !== value) {
                  return Promise.reject();
                }
                return Promise.resolve();
              },
              message: '两次密码不一致',
            },
          ]}
        >
          <Input clearable type="password" placeholder="请再次输入密码" />
        </Form.Item>
      </Form>
      <div className={styles.note}>
        <Space>
          已有账号？去
          <Link to="/login">登录</Link>
        </Space>
      </div>
    </div>
  );
};
