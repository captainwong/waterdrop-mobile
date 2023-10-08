/* eslint-disable prettier/prettier */
import { useStudentCards } from '@/services/student-card';
import {
  Grid,
  ResultPage, Skeleton, Space, Tag,
} from 'antd-mobile';
import classNames from 'classnames';
import { CardStatus } from '@/types/student-card';
import { BankcardOutline, EnvironmentOutline } from 'antd-mobile-icons';
import { CARD_TYPE } from '@/types/card';
import dayjs from 'dayjs';
import { DATE_FORMAT_DATE } from '@/utils/const';
import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/menu';
import styles from './my-card.module.less';

export const MyCard = () => {
  const { go } = useGoTo();
  const { loading, studentCards } = useStudentCards();
  if (loading) {
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </>
    );
  }

  if (!studentCards || studentCards.length === 0) {
    return (
      <ResultPage
        status="warning"
        title="您还没有购买消费卡"
        onPrimaryButtonClick={() => go(ROUTE_KEYS.HOME)}
        primaryButtonText="返回首页"
      />
    );
  }

  return (
    <div className={styles.container}>
      {
        studentCards.map((card) => (
          <div
            key={card.id}
            className={classNames({
              [styles.card]: true,
              [styles.expired]: card.status === CardStatus.EXPIRED,
              [styles.depleted]: card.status === CardStatus.DEPLETED,
            })}
          >
            {/* <Space justify="between" className={styles.top}> */}
            <Grid columns={100}>
              <Grid.Item span={20}>
                <BankcardOutline />
                <span className={styles.name}>
                  {card.card.name}
                </span>
              </Grid.Item>
              <Grid.Item span={55} className={styles.courseName}>
                <span className={styles.courseName}>
                  {card.course.name}
                </span>
              </Grid.Item>
              {
                card.type === CARD_TYPE.COUNT[0] && (
                  <Grid.Item span={20}>
                    <Tag color="#fff" fill="outline" className={styles.type}>
                      {CARD_TYPE.COUNT[1]}
                      (
                      余
                      {card.remainingTimes}
                      次
                      )
                    </Tag>
                  </Grid.Item>
                )
              }
              {
                card.type === CARD_TYPE.DURATION[0] && (
                  <Grid.Item span={20}>
                    <Tag color="warning" fill="outline" className={styles.type}>
                      {CARD_TYPE.DURATION[1]}
                    </Tag>

                  </Grid.Item>
                )
              }
              {/* </Space> */}
            </Grid>
            <Space justify="between" className={styles.bottom}>
              <span>
                <EnvironmentOutline />
                {card.organization.name}
              </span>
              <span>
                有效期到：
                {dayjs(card.expiresAt).format(DATE_FORMAT_DATE)}
              </span>
            </Space>
          </div>
        ))
      }
    </div>
  );
};
