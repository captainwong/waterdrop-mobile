/* eslint-disable prettier/prettier */
import { useGetStudentSchedules } from '@/services/student-schedule';
import {
  Button,
  Card,
  Grid,
  Image, Skeleton, Space, Steps, Tag,
} from 'antd-mobile';
import { Step } from 'antd-mobile/es/components/steps/step';
import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/menu';
import dayjs from 'dayjs';
import { DATE_FORMAT_DATE } from '@/utils/const';
import { StudentScheduleStatus, StudentScheduleStatusProps } from '@/types/student-schedule';
import styles from './my-schedule.module.less';

export const MySchedule = () => {
  const { go } = useGoTo();
  const {
    loading,
    hasMore,
    studentSchedules,
    refreshSchedules,
    loadMoreSchedules,
  } = useGetStudentSchedules();

  const onCancelSchedule = (id: string) => {
    console.log(id);
  };

  if (loading) {
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </>
    );
  }

  return (
    <div className={styles.container}>
      <Steps direction="vertical">
        {
          studentSchedules.map((schedule) => (
            <Step
              key={schedule.id}
              icon={(
                <img
                  role="presentation"
                  src={schedule.organization.logo}
                  alt="org_logo"
                  className={styles.logo}
                  onClick={() => go(ROUTE_KEYS.ORGANIZATION, { id: schedule.organization.id })}
                />
              )}
              title={(
                <Space justify="between" block>
                  <span>
                    {dayjs(schedule.schedule.date).format(DATE_FORMAT_DATE)}
                    &nbsp;
                    {schedule.schedule.start}
                    -
                    {schedule.schedule.end}
                  </span>
                  <Tag color={StudentScheduleStatusProps[schedule.status]?.color}>
                    {StudentScheduleStatusProps[schedule.status]?.label}
                  </Tag>
                </Space>
              )}
              description={(
                <Card>
                  <Grid columns={13} gap={10}>
                    <Grid.Item span={4}>
                      <Image src={schedule.course.cover} className="styles.cover" />
                    </Grid.Item>
                    <Grid.Item span={6}>
                      <div className={styles.name}>
                        {schedule.course.name}
                      </div>
                      <div className={styles.teacher}>
                        讲师：
                        {schedule.schedule.teacher.name}
                      </div>
                      <div className={styles.org}>
                        门店：
                        {schedule.organization.name}
                      </div>
                    </Grid.Item>
                    <Grid.Item span={3}>
                      {
                        StudentScheduleStatus.NOT_STARTED === schedule.status && (
                          <Button
                            fill="none"
                            color="primary"
                            onClick={() => onCancelSchedule(schedule.id)}
                          >
                            取消
                          </Button>
                        )
                      }
                    </Grid.Item>
                  </Grid>
                </Card>
              )}
            />
          ))
        }
      </Steps>
    </div>
  );
};
