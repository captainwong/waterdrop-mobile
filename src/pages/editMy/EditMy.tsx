/* eslint-disable prettier/prettier */
import { useEffect, useRef, useState } from 'react';
import {
  Button, CenterPopup, Form, ImageUploader, Input, Modal, Toast,
} from 'antd-mobile';
import { useStudentInfoContext } from '@/hooks/studentHooks';
import useUploadOSS from '@/hooks/useUploadOSS';
import { useUpdateStudentInfo } from '@/services/student';
import logo from '@/assets/henglogo@2x.png';
import { useGoTo } from '@/hooks';
import { Cropper, ReactCropperElement } from 'react-cropper';
import styles from './EditMy.module.less';

export const EditMy: React.FC = () => {
  const upload = useUploadOSS();
  const [form] = Form.useForm();
  const { store } = useStudentInfoContext();
  const { updateStudentInfo, loading } = useUpdateStudentInfo();
  const { back } = useGoTo();
  const [showCrop, setShowCrop] = useState(false);
  const fileRef = useRef<File>();
  const [imgSrc, setImgSrc] = useState<string>('');
  const cropperRef = useRef<ReactCropperElement>(null);
  const [imgCropped, setImgCropped] = useState<string>('');

  console.log('EditMy.store', store);

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

  const beforeUpload = async (file: File, files: File[]) => {
    console.log('beforeUpload', { file, files });
    fileRef.current = file;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const dataURL = e.target?.result;
      setImgSrc(dataURL as string);
      setShowCrop(true);
    };
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        if (imgCropped) {
          clearInterval(timer);
          const newFile = new File([imgCropped], file.name, { type: file.type });
          // newFile.uid = file.uid;
          setImgCropped('');
          resolve(newFile);
        }
      }, 100);
    });
  };

  const onCrop = (e: any) => {
    const cropper = cropperRef.current?.cropper;
    const dataUrl = cropper?.getCroppedCanvas().toDataURL();
    console.log('onCrop', { e, dataUrl });
    setImgCropped(dataUrl as string);
  };

  const onCloseCrop = () => {
    setShowCrop(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <CenterPopup
        visible={showCrop}
        onClose={onCloseCrop}
      >
        <Cropper src={imgSrc} crop={onCrop} ref={cropperRef} />
      </CenterPopup>
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

          <ImageUploader maxCount={1} upload={upload} beforeUpload={beforeUpload} />
        </Form.Item>
      </Form>
    </div>
  );
};
