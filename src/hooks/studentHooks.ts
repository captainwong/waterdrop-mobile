import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/const';
import { connectFactory, useAppContext } from '../utils/contextFactory';
import { GET_STUDENT_INFO } from '../graphql/student';
import { IStudent, TStudentQuery } from '../types/student';

const STUDENT_INFO = 'STUDENT_INFO';
const DEFAULT_STUDENT_VALUE = {};

// eslint-disable-next-line prettier/prettier
export const useStudentInfoContext = () => useAppContext<IStudent>(STUDENT_INFO);

export const connect = connectFactory(STUDENT_INFO, DEFAULT_STUDENT_VALUE);

export const useGetStudentInfo = () => {
  const { setStore } = useStudentInfoContext();
  const location = useLocation();
  const navigate = useNavigate();

  const { loading, refetch } = useQuery<TStudentQuery>(
    GET_STUDENT_INFO,
    {
      onCompleted: (data) => {
        if (data.getStudentInfo.data) {
          const {
            id, name, tel, avatar,
          } = data.getStudentInfo.data;
          setStore({
            id, name, tel, avatar, refetchHandler: refetch,
          });
          if (location.pathname.startsWith('/login')) navigate('/');
          return;
        }

        localStorage.removeItem(AUTH_TOKEN);
        setStore({ refetchHandler: refetch });
        if (!location.pathname.startsWith('/login')) {
          navigate(`/login?redirect=${location.pathname}`);
        }
      },
      onError: () => {
        localStorage.removeItem(AUTH_TOKEN);
        setStore({ refetchHandler: refetch });
        if (!location.pathname.startsWith('/login')) {
          navigate(`/login?redirect=${location.pathname}`);
        }
      },
    },
  );

  return { loading, refetch };
};
