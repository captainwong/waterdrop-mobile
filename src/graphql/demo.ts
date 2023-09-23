import { gql } from '@apollo/client';

export const FIND_ONE = gql`
  query findOne($id: Float!) {
    findOne(id: $id) {
      id
      name
      desc
      tel
      password
      account
    }
  }
`;

export const UPDATE_ONE = gql`
  mutation updateUser($id: Float!, $params: UserInputDto!) {
    updateUser(id: $id, params: $params)
  }
`;
