import { gql } from '@apollo/client';

export const RESERVE_SCHEDULE = gql`
mutation reserveSchedule($scheduleId: String!, $studentCardId: String!){
  reserveSchedule(scheduleId: $scheduleId, studentCardId: $studentCardId){
    code
    message
  }
}
`;

export const GET_STUDENT_SCHEDULES = gql`
  query getStudentSchedules($page: PageInput!){
    getStudentSchedules(page: $page){
      code
      message
      page{
        page
        pageSize
        total
      }
      data{
        id
        status
        createdAt
        schedule{
          id
          date
          start
          end
          teacher{
            id
            name
          }
        }
        course{
          id
          name
          cover
        }
        organization{
          id
          name
          logo
        }
      }
    }
  }
`;
