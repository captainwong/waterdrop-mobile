import { IProduct } from '@/types/product';
import {
  Card,
  Divider, DotLoading, Grid, Image,
} from 'antd-mobile';
import { TCourse } from '@/types/course';
import styles from './DescInfo.module.less';

interface IProps {
  loading: boolean;
  courses: TCourse[];
}

export const DescInfo = ({ loading, courses }: IProps) => {
  if (loading) {
    return <DotLoading />;
  }

  return (
    <div className={styles.container} key="product-desc">
      {
        courses.map((course) => (
          <Card title={course.cardName} key={course.id} className={styles.card}>
            <div className={styles.info}>
              {course.desc}
            </div>
            <Divider />
            <div className={styles.info}>
              <div className={styles.label}>
                预约信息
              </div>
              {course.reservation || ''}
            </div>
            <Divider />
            <div className={styles.info}>
              <div className={styles.label}>
                退款信息
              </div>
              {course.refund || ''}
            </div>
            <Divider />
            <div className={styles.info}>
              <div className={styles.label}>
                其他信息
              </div>
              {course.note || ''}
            </div>
          </Card>
        ))
      }
    </div>
  );
};
