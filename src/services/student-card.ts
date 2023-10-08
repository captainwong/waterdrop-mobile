import { GET_RESERVABLE_COURSES, GET_STUDENT_CARDS, GET_VALID_STUDENT_CARDS_BY_COURSE } from '@/graphql/student-card';
import { TOrganizationsQuery } from '@/types/organization';
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

export const useReservableCourses = () => {
  const { loading, data } = useQuery<TOrganizationsQuery>(GET_RESERVABLE_COURSES);
  return { loading, reservableCourses: data?.getReservableCourses?.data || [] };
};

export const useGetValidStudentCardsByCourse = (courseId: string) => {
  const { loading, data } = useQuery<TStudentCardsQuery>(GET_VALID_STUDENT_CARDS_BY_COURSE, {
    variables: {
      courseId,
    },
  });
  return { loading, validStudentCardsByCourse: data?.getValidStudentCardsByCourse.data || [] };
};
