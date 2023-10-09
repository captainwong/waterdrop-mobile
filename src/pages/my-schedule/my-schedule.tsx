/* eslint-disable prettier/prettier */
import { useCancelStudentSchedule, useGetStudentSchedules } from '@/services/student-schedule';
import {
  Button,
  Card,
  Divider,
  Grid,
  Image, Modal, Skeleton, Space, Steps, Tag, Toast,
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

  const {
    cancelStudentSchedule,
    loading: cancelLoading,
  } = useCancelStudentSchedule();

  const onCancelSchedule = async (id: string) => {
    const confirm = await Modal.confirm({
      content: '确定取消预约吗？取消后不可重复预约该课程表',
    });
    if (!confirm) { return; }
    cancelStudentSchedule(id, () => {
      Toast.show({
        icon: 'success',
        content: '取消预约成功',
        afterClose: refreshSchedules,
      });
    }, (error) => {
      Toast.show({
        icon: 'fail',
        content: error,
      });
    });
  };

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
                            loading={cancelLoading}
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
      {
        hasMore ? (
          <Divider>
            <Button fill="none" loading={loading} onClick={() => loadMoreSchedules()}>加载更多</Button>
          </Divider>
        ) : (
          <Divider>没有更多了</Divider>
        )
      }
    </div>
  );
};
