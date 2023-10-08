import { GET_RESERVABLE_SCHEDULES } from '@/graphql/schedule';
import { TSchedulesQuery } from '@/types/schedule';
import { useQuery } from '@apollo/client';

export const useReservableSchedules = (courseId: string) => {
  const { loading, data } = useQuery<TSchedulesQuery>(GET_RESERVABLE_SCHEDULES, {
    variables: {
      courseId,
    },
  });
  return { loading, reservableSchedules: data?.getReservableSchedules?.data || [] };
};
