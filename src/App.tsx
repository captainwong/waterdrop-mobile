import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { FIND_ONE, UPDATE_ONE } from './graphql/demo';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const { loading, data } = useQuery(FIND_ONE, {
    variables: {
      id: 2,
    },
  });

  const [update] = useMutation(UPDATE_ONE);

  const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDescChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const onClickHandler = () => {
    update({
      variables: {
        id: 2,
        params: {
          name,
          desc,
          tel: 'asdf',
          password: 'lkjalksdjf',
          account: 'asdfasdf',
        },
      },
    });
  };

  return (
    <>
      <p>data: {JSON.stringify(data)}</p>
      <p>loading: {`${loading}`}</p>
      <p>
        name:
        <input onChange={onNameChangeHandler} />
      </p>
      <p>
        desc:
        <input onChange={onDescChangeHandler} />
      </p>
      <button type="button" onClick={onClickHandler}>
        update
      </button>
    </>
  );
};

export default App;
