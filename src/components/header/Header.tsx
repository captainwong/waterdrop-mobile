import { useGoTo, useMatchedRoute, useTitle } from '@/hooks';
import { LeftOutline } from 'antd-mobile-icons';
import classNames from 'classnames';
import styles from './Header.module.less';

export const Header = () => {
  const route = useMatchedRoute();
  const { back } = useGoTo();

  useTitle(route?.name || '');

  if (route?.hideHeader) {
    return null;
  }

  return (
    <div className={classNames({
      [styles.containerLarge]: route?.showInMenu,
      [styles.containerSmall]: !route?.showInMenu,
    })}
    >
      {!route?.showInMenu && <LeftOutline className={styles.back} onClick={() => back()} />}
      <div className={styles.title}>{route?.name}</div>
    </div>
  );
};
