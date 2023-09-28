import { gql } from '@apollo/client';

export const STUDENT_REGISTER = gql`
  mutation studentRegister($account: String!, $password: String!) {
    studentRegister(account: $account, password: $password) {
      code
      message
    }
  }
`;

export const STUDENT_LOGIN = gql`
  mutation studentLogin($account: String!, $password: String!) {
    studentLogin(account: $account, password: $password) {
      code
      message
      data
    }
  }
`;

export const GET_STUDENT_INFO = gql`
  query getStudentInfo {
    getStudentInfo {
      code
      message
      data {
        id
        name
        tel
        avatar
      }
    }
  }
`;

export const UPDATE_STUDENT_INFO = gql`
  mutation updateStudentInfo($dto: StudentInputDto!){
    updateStudentInfo(dto: $dto){
        code
        message
        data{
          id
          name
          tel
          avatar
        }
    }
    
  }
`;
