import { IStudentCard } from '@/types/student-card';
import { Space, Tag } from 'antd-mobile';
import { CARD_TYPE } from '@/types/card';
import { DATE_FORMAT_DATE } from '@/utils/const';
import dayjs from 'dayjs';
import styles from './card.module.less';

interface IProps {
  card: IStudentCard;
}

export const StudentCard = ({ card }: IProps) => (
  <div className={styles.container}>
    <Space justify="between" block>
      <span>
        {
          card.type === CARD_TYPE.DURATION[0] && (
            <Tag color="primary" fill="outline">
              {CARD_TYPE.DURATION[1]}
            </Tag>
          )
        }
        {
          card.type === CARD_TYPE.COUNT[0] && (
            <Tag color="warning" fill="outline">
              {CARD_TYPE.COUNT[1]}
            </Tag>
          )
        }
        <span className={styles.name}>
          {card.card.name}
        </span>
      </span>
      <span>
        有效期至：
        {dayjs(card.expiresAt).format(DATE_FORMAT_DATE)}
      </span>
    </Space>
    {
      card.type === CARD_TYPE.COUNT[0] && (
        <Space justify="between" block className={styles.remainingTimes}>
          <span>
            剩余
            {card.remainingTimes}
            次
          </span>
        </Space>
      )
    }
  </div>
);
