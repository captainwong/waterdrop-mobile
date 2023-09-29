import { DotLoading } from 'antd-mobile';
import { connect, useGetStudentInfo } from '@/hooks/studentHooks';
import { IPropsChildren } from '@/types/react';

const StudentInfoComponent = ({ children }: IPropsChildren) => {
  const { loading } = useGetStudentInfo();

  if (loading) {
    return <DotLoading />;
  }

  return <div>{children}</div>;
};

const StudentInfo = connect(StudentInfoComponent);

export default StudentInfo;
