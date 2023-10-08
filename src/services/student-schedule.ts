import { GET_STUDENT_SCHEDULES, RESERVE_SCHEDULE } from '@/graphql/student-schedule';
import { TGraphqlMutation } from '@/types/graphql';
import { IStudentSchedule, TStudentSchedulesQuery } from '@/types/student-schedule';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';

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

const DEFAULT_SCHEDULES_PER_PAGE = 50;

export const useGetStudentSchedules = () => {
  const pageCur = useRef(1);
  const [studentSchedules, setStudentSchedules] = useState<IStudentSchedule[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [get, { loading }] = useLazyQuery<TStudentSchedulesQuery>(GET_STUDENT_SCHEDULES);

  const getStudentSchedules = async (pageNum = 1) => {
    const res = await get({
      fetchPolicy: 'no-cache',
      variables: {
        page: {
          page: pageNum,
          pageSize: DEFAULT_SCHEDULES_PER_PAGE,
        },
      },
    });
    const more = (res.data?.getStudentSchedules.page &&
      (
        (res.data.getStudentSchedules.page.page * DEFAULT_SCHEDULES_PER_PAGE)
        < res.data.getStudentSchedules.page.total
      )
    ) || false;
    return {
      ss: res.data?.getStudentSchedules.data || [],
      more,
    };
  };

  const refreshSchedules = async () => {
    pageCur.current = 1;
    const res = await getStudentSchedules();
    setStudentSchedules(res.ss);
    setHasMore(res.more);
  };

  const loadMoreSchedules = async () => {
    if (!hasMore) return;
    const { ss, more } = await getStudentSchedules(pageCur.current + 1);
    setHasMore(more);
    setStudentSchedules((prev) => [...prev, ...ss]);
    pageCur.current += 1;
  };

  useEffect(() => {
    refreshSchedules();
  }, []);

  return {
    loading,
    hasMore,
    studentSchedules,
    refreshSchedules,
    loadMoreSchedules,
  };
};
