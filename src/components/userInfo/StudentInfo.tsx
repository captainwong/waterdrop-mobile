import { Skeleton } from 'antd-mobile';
import { connect, useGetStudentInfo } from '@/hooks/studentHooks';
import { IPropsChildren } from '@/types/react';

const StudentInfoComponent = ({ children }: IPropsChildren) => {
  const { loading } = useGetStudentInfo();

  if (loading) {
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </>
    );
  }

  return <div>{children}</div>;
};

const StudentInfo = connect(StudentInfoComponent);

export default StudentInfo;
