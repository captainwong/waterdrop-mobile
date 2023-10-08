/* eslint-disable prettier/prettier */
import {
  DotLoading, Popup, Result, Space, Steps,
} from 'antd-mobile';
import { useReservableCourses } from '@/services/student-card';
import { Step } from 'antd-mobile/es/components/steps/step';
import { useState } from 'react';
import styles from './reserve-course.module.less';
import { Courses } from './courses/courses';
import { Reserve } from './reserve/reserve';

export const ReserveCourse = () => {
  const { loading, reservableCourses } = useReservableCourses();
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentCourseId, setCurrentCourseId] = useState<string>('');

  if (loading) {
    return (
      <Space justify="center">
        <DotLoading color="primary" />
      </Space>
    );
  }

  if (!reservableCourses || reservableCourses.length === 0) {
    return (
      <Result
        status="warning"
        title="没有可预约的课程"
      />
    );
  }

  const onReserve = (id: string) => {
    setCurrentCourseId(id);
    setShowPopup(true);
  };

  const onClosePopup = () => {
    setShowPopup(false);
    setCurrentCourseId('');
  };

  return (
    <div className={styles.container}>
      <Steps direction="vertical">
        {
          reservableCourses.map((org) => (
            <Step
              key={org.id}
              title={org.name}
              description={
                org.courses ? (
                  <Courses courses={org.courses} onReserve={onReserve} />
                ) : null
              }
              icon={(
                <img
                  className={styles.logo}
                  src={org.logo}
                  alt="门店logo"
                />
              )}
            />
          ))
        }
      </Steps>
      <Popup
        visible={showPopup}
        position="bottom"
        onMaskClick={onClosePopup}
        onClose={onClosePopup}
      >
        {
          currentCourseId && <Reserve onClose={onClosePopup} courseId={currentCourseId} />
        }
      </Popup>
    </div>
  );
};
