import { useMutation } from '@apollo/client';
import { Button, Form, ImageUploader, Input } from 'antd-mobile';
import { useEffect } from 'react';
import { UPDATE_ONE } from './graphql/demo';
import useUploadOSS from './hooks/useUploadOSS';
import './App.module.less';

const App: React.FC = () => {
  const upload = useUploadOSS();
  const [update] = useMutation(UPDATE_ONE);

  const onClickHandler = (v: unknown) => {
    console.log(v);
    update({
      variables: {
        id: 2,
        params: {
          // ...v,
          tel: 'asdf',
          password: 'lkjalksdjf',
          account: 'asdfasdf',
        },
      },
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-prefers-color-scheme', 'dark');
  }, []);

  return (
    <div>
      <Form
        layout="horizontal"
        onFinish={onClickHandler}
        footer={(
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        )}
      >
        <Form.Item name="name" label="名称">
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="头像">
          <ImageUploader upload={upload} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
