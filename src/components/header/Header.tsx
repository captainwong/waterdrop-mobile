import { useGoTo, useMatchedRoute } from '@/hooks';
import { LeftOutline } from 'antd-mobile-icons';
import styles from './Header.module.less';

export const Header = () => {
  const route = useMatchedRoute();
  const { back } = useGoTo();

  if (route?.hideHeader) {
    return null;
  }

  return (
    <div className={styles.container}>
      {!route?.showInMenu && <LeftOutline className={styles.back} onClick={() => back()} />}
      <div className={styles.title}>{route?.name}</div>
    </div>
  );
};
