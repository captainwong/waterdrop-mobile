import { gql } from '@apollo/client';

export const RESERVE_SCHEDULE = gql`
mutation reserveSchedule($scheduleId: String!, $studentCardId: String!){
  reserveSchedule(scheduleId: $scheduleId, studentCardId: $studentCardId){
    code
    message
  }
}
`;
