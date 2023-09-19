import { useMutation } from "@apollo/client";
import { Button, Form, Input, Toast } from "antd-mobile";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { STUDENT_LOGIN } from "../../graphql/student";

interface IValue {
  account: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [login] = useMutation(STUDENT_LOGIN);
  const navigate = useNavigate();

  const onFinish = async (v: IValue) => {
    console.log(v);
    if (!/^[a-zA-Z0-9_-]{6,16}$/.test(v.account)) {
      Toast.show({
        icon: 'fail',
        content: '用户名不合法',
      });
      return;
    }

    if (!/^[a-zA-Z0-9_-]{6,16}$/.test(v.password)) {
      Toast.show({
        icon: 'fail',
        content: '密码不合法',
      });
      return;
    }

    const result = await login({
      variables: {
        account: v.account,
        password: v.password,
      },
    });
    if (result.data?.studentLogin?.code === 200) {
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
      })
    }
  };

  return (
    <Form
      layout="horizontal"
      onFinish={onFinish}
      footer={
        <Button block type="submit" color="primary" size="large">
          登录
        </Button>
      }
    >
      <Form.Item name="account" label="用户名" rules={
        [
          {
            required: true,
            message: '请输入用户名',
          }
        ]
      }>
        <Input placeholder="请输入用户名" />
      </Form.Item>

      <Form.Item name="password" label="密码" rules={
        [
          {
            required: true,
            message: '请输入密码',
          }
        ]
      }>
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>      
    </Form>
  );
}
