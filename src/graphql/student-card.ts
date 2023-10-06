import { gql } from '@apollo/client';

export const GET_STUDENT_CARDS = gql`
query getStudentCards($page: PageInput!){
  getStudentCards(page: $page){
    code
    message
    data{
      id
      type
      purchasedAt
      effectiveAt
      expiresAt
      remainingTimes
      status
      card{
        id
        name
      }
      student {
        id
        name
      }
      course {
        id name
      }
      organization {
        id 
        name
      }
    }
  }
}
`;
