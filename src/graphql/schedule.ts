import { gql } from '@apollo/client';

export const GET_RESERVABLE_SCHEDULES = gql`
query getReservableSchedules($courseId: String!){
  getReservableSchedules(courseId: $courseId){
    code
    message
    page{
      page
      pageSize
      total
    }
    data{
      id
      date
      start
      end
      limit
    }
  }
}
`;
