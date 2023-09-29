import { UPDATE_STUDENT_INFO } from '@/graphql/student';
import { TGraphqlMutation } from '@/types/graphql';
import { TStudent } from '@/types/student';
import { useMutation } from '@apollo/client';

export type TUpdateStudent = (
  dto: TStudent,
  onSuccess?: () => void,
  onError?: (error: string) => void,
) => void;

export const useUpdateStudentInfo = () => {
  const [update, { loading }] = useMutation<TGraphqlMutation>(UPDATE_STUDENT_INFO);
  const updateStudentInfo:TUpdateStudent = async (dto, onSuccess, onError) => {
    const res = await update({ variables: { dto } });
    if (res.data?.updateStudentInfo.code === 200) {
      onSuccess?.();
    } else {
      onError?.(res.data?.updateStudentInfo.message || 'error');
    }
  };

  return { updateStudentInfo, loading };
};
