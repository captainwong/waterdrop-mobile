/* eslint-disable prettier/prettier */
import { useStudentCards } from '@/services/student-card';
import { Skeleton, Space, Tag } from 'antd-mobile';
import classNames from 'classnames';
import { CardStatus } from '@/types/student-card';
import { BankcardOutline } from 'antd-mobile-icons';
import { CARD_TYPE } from '@/types/card';
import dayjs from 'dayjs';
import { DATE_FORMAT_DATE } from '@/utils/const';
import styles from './my-card.module.less';

export const MyCard = () => {
  const { loading, studentCards } = useStudentCards();
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
            <Space justify="between" className={styles.top}>
              <span>
                <BankcardOutline />
                <span className={styles.name}>
                  {card.card.name}
                </span>
              </span>
              {
                card.type === CARD_TYPE.COUNT[0] && (
                  <Tag color="#fff" fill="outline">
                    {CARD_TYPE.COUNT[1]}
                    (
                    余
                    {card.remainingTimes}
                    次
                    )
                  </Tag>
                )
              }
              {
                card.type === CARD_TYPE.DURATION[0] && (
                  <Tag color="warning" fill="outline">
                    {CARD_TYPE.DURATION[1]}
                  </Tag>
                )
              }
            </Space>
            <Space justify="between" className={styles.bottom}>
              <span>{card.organization.name}</span>
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
