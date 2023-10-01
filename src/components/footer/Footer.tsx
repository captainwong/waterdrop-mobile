import { TabBar } from 'antd-mobile';
import { ROUTES } from '@/routes/menu';
import { useGoTo, useMatchedRoute } from '@/hooks';
import styles from './Footer.module.less';
import { SvgWrapper } from '../svgWrapper/SvgWrapper';

export const Footer = () => {
  const route = useMatchedRoute();
  const { go } = useGoTo();

  const onTabChange = (key: string) => {
    go(key);
  };

  if (!route?.showInMenu) {
    return null;
  }

  const iconRender = (active: boolean, icon?: string) => (
    <SvgWrapper
      src={icon}
      color={active ? '#01979a' : '#999999'}
      width={24}
      height={24}
    />
  );

  return (
    <div className={styles.container}>
      <TabBar onChange={onTabChange} activeKey={route?.key}>
        {
          ROUTES.filter((r) => r.showInMenu).map((r) => (
            <TabBar.Item
              key={r.key}
              title={r.name}
              icon={(active) => iconRender(active, r.icon)}
            />
          ))
        }
      </TabBar>
    </div>
  );
};
