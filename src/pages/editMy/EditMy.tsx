/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import {
  Button, Form, ImageUploader, Input, Toast,
} from 'antd-mobile';
import { useStudentInfoContext } from '@/hooks/studentHooks';
import useUploadOSS from '@/hooks/useUploadOSS';
import { useUpdateStudentInfo } from '@/services/student';
import logo from '@/assets/henglogo@2x.png';
import { useGoTo } from '@/hooks';
import styles from './EditMy.module.less';

export const EditMy: React.FC = () => {
  const upload = useUploadOSS();
  const [form] = Form.useForm();
  const { store } = useStudentInfoContext();
  const { updateStudentInfo, loading } = useUpdateStudentInfo();
  const { back } = useGoTo();

  useEffect(() => {
    if (!store.tel) {
      return;
    }
    form.setFieldsValue({
      name: store.name,
      tel: store.tel,
      avatar: [{ url: store.avatar }],
    });
  }, [store]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <Form
        form={form}
        layout="horizontal"
        onFinish={async (values) => {
          updateStudentInfo({
            name: values.name,
            tel: values.tel,
            avatar: values.avatar[0]?.url || null,
          }, () => {
            Toast.show({
              icon: 'success',
              content: '修改成功!',
              duration: 1000,
              afterClose: () => {
                store.refetchHandler?.();
                back();
              },
            });
          }, (error) => {
            Toast.show({
              icon: 'fail',
              content: error,
              duration: 3000,
            });
          });
        }}
        footer={(
          <Button
            block
            type="submit"
            color="primary"
            size="large"
            loading={loading}
          >
            提交
          </Button>
        )}
      >
        <Form.Header>个人信息</Form.Header>
        <Form.Item
          name="name"
          label="昵称"
          rules={[
            {
              required: true,
              message: '请输入昵称',
            },
          ]}
        >
          <Input placeholder="请输入昵称" clearable />
        </Form.Item>

        <Form.Item
          name="tel"
          label="手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号',
            },
            {
              pattern: /^1\d{10}$/,
              message: '手机号格式不正确',
            },
          ]}
        >
          <Input placeholder="请输入手机号" clearable />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="头像"
          rules={[
            {
              required: true,
              message: '请输入头像',
            },
          ]}
        >
          <ImageUploader maxCount={1} upload={upload} />
        </Form.Item>
      </Form>
    </div>
  );
};
