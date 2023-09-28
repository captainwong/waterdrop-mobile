import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/routes';
import { Button } from 'antd-mobile';
import styles from './HomePage.module.less';

export const HomePage = () => {
  const { go } = useGoTo();

  return (
    <div className={styles.container}>
      <Button onClick={() => {
        go(ROUTE_KEYS.MY);
      }}
      >
        编辑个人信息
      </Button>
    </div>
  );
};
