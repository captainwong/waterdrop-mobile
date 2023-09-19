import { useMutation } from "@apollo/client";
import { Button, Form, Input, Toast } from "antd-mobile";
import React from "react";
import { useNavigate } from 'react-router-dom';
import { STUDENT_REGISTER } from "../../graphql/student";

interface IValue {
  account: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const [register] = useMutation(STUDENT_REGISTER);
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
        afterClose: () => {
          navigate('/login');
        },
      });
    } else {
      Toast.show({
        icon: 'fail',
        content: result.data?.studentRegister?.message,
      })
    }
  };

  return (
    <Form
      layout="horizontal"
      onFinish={onFinish}
      footer={
        <Button block type="submit" color="primary" size="large">
          注册
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

      <Form.Item name="confirmPassword" label="确认密码" rules={
        [
          {
            required: true,
            message: '请再次输入密码',
          }
        ]
      }>
        <Input type="password" placeholder="请再次输入密码" />
      </Form.Item>
      
    </Form>
  );
}
