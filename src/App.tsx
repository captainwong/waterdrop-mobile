import { useMutation, useQuery } from '@apollo/client';
import { Button, Calendar, Form, Input } from 'antd-mobile';
import { useEffect } from 'react';
import { FIND_ONE, UPDATE_ONE } from './graphql/demo';

const App: React.FC = () => {
  const { loading, data } = useQuery(FIND_ONE, {
    variables: {
      id: 2,
    },
  });

  const [update] = useMutation(UPDATE_ONE);

  const onClickHandler = (v: unknown) => {
    console.log(v);
    update({
      variables: {
        id: 2,
        params: {
          ...v,
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
      <Calendar
          selectionMode='single'
          onChange={val => {
            console.log(val)
          }}
        />
      
      <p>data: {JSON.stringify(data)}</p>
      <p>loading: {`${loading}`}</p>

      <Form
        layout="horizontal"
        onFinish={onClickHandler}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Item name="name" label="名称">
          <Input />
        </Form.Item>
        <Form.Item name="desc" label="描述">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
