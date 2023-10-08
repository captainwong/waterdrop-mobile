import { RESERVE_SCHEDULE } from '@/graphql/student-schedule';
import { TGraphqlMutation } from '@/types/graphql';
import { useMutation } from '@apollo/client';

export const useReserveSchedule = () => {
  const [post, { loading }] = useMutation<TGraphqlMutation>(RESERVE_SCHEDULE);

  const reserveSchedule = async (
    scheduleId: string,
    studentCardId: string,
    onSuccess?: () => void,
    onError?: (error: string) => void,
  ) => {
    const res = await post({
      variables: {
        scheduleId,
        studentCardId,
      },
    });
    if (res.data?.reserveSchedule.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.reserveSchedule.message || 'error');
    }
  };

  return {
    reserveSchedule,
    loading,
  };
};
