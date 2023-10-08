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

export const GET_RESERVABLE_COURSES = gql`
  query getReservableCourses{
    getReservableCourses{
      code
      message
      data{
        id
        name
        logo
        courses{
          id
          name
          cover
        }
      }
    }
  }
`;

export const GET_VALID_STUDENT_CARDS_BY_COURSE = gql`
  query getValidStudentCardsByCourse($courseId: String!){
    getValidStudentCardsByCourse(courseId: $courseId){
      code
      message
      data{
        id
        type
        purchasedAt
        effectiveAt
        remainingTimes
        card{
          id
          name
        }
        course{
          id
          name
          cover
        }
      }
    }
  }
`;
