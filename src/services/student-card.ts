import { GET_STUDENT_CARDS } from '@/graphql/student-card';
import { TStudentCardsQuery } from '@/types/student-card';
import { useQuery } from '@apollo/client';

export const useStudentCards = () => {
  const { loading, data } = useQuery<TStudentCardsQuery>(GET_STUDENT_CARDS, {
    variables: {
      page: {
        pageSize: 100,
        page: 1,
      },
    },
  });

  return { loading, studentCards: data?.getStudentCards?.data || [] };
};
