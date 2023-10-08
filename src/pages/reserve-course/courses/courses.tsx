import { ICourse } from '@/types/course';
import { List, Image, Button } from 'antd-mobile';
import styles from './courses.module.less';

interface IProps {
  courses: ICourse[];
  onReserve: (id: string) => void;
}

export const Courses = ({ courses, onReserve }: IProps) => (
  <div className={styles.container}>
    <List>
      {
        courses.map((course) => (
          <List.Item
            key={course.id}
            prefix={(
              <Image
                src={course.cover}
                alt="课程封面"
                className={styles.cover}
              />
            )}
            extra={(
              <Button
                fill="none"
                color="primary"
                onClick={() => onReserve(course.id)}
              >
                预约
              </Button>
            )}
          >
            {course.name}
          </List.Item>
        ))
      }
    </List>
  </div>
);
