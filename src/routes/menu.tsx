import mySvg from '@/assets/my.svg';
import courseSvg from '@/assets/course.svg';

interface IRoute {
  path: string;
  name: string;
  icon?: string;
  showInMenu?: boolean;
  hideHeader?: boolean;
}

export const ROUTE_KEYS = {
  MY: 'my',
  HOME: 'home',
  ORGANIZATION: 'organization',
  NOT_FOUND: 'notFound',
};

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEYS.HOME]: {
    path: '',
    name: '精品课程',
    icon: courseSvg,
    showInMenu: true,
  },
  [ROUTE_KEYS.MY]: {
    path: 'my',
    name: '我的',
    icon: mySvg,
    showInMenu: true,
  },
  [ROUTE_KEYS.ORGANIZATION]: {
    path: 'organization/:id',
    name: '门店详情',
    showInMenu: false,
  },
  [ROUTE_KEYS.NOT_FOUND]: {
    path: '*',
    name: '页面不存在',
    showInMenu: false,
  },
};

export const ROUTES = Object.keys(ROUTE_CONFIG).map((key) => ({
  key,
  ...ROUTE_CONFIG[key],
}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
