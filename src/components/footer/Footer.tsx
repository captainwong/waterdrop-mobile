import { TabBar } from 'antd-mobile';
import { ROUTES } from '@/routes/routes';
import { useGoTo, useMatchedRoute } from '@/hooks';
import styles from './Footer.module.less';

export const Footer = () => {
  const route = useMatchedRoute();
  const { go } = useGoTo();

  const onTabChange = (key: string) => {
    go(key);
  };

  if (!route?.showInMenu) {
    return null;
  }

  return (
    <div className={styles.container}>
      <TabBar onChange={onTabChange} activeKey={route?.key}>
        {
          ROUTES.filter((r) => r.showInMenu).map((r) => (
            <TabBar.Item
              key={r.key}
              title={r.name}
            />
          ))
        }
      </TabBar>
    </div>
  );
};
