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
  PRODUCT: 'product',
  EDIT_MY: 'editMy',
  BUY: 'buy',
  MY_CARD: 'myCard',
  RESERVE_COURSE: 'reserveCourse',
  MY_COURSE: 'myCourse',
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
  [ROUTE_KEYS.EDIT_MY]: {
    path: 'editMy',
    name: '编辑资料',
  },
  [ROUTE_KEYS.ORGANIZATION]: {
    path: 'organization/:id',
    name: '门店详情',
  },
  [ROUTE_KEYS.PRODUCT]: {
    path: 'product/:id',
    name: '商品详情',
  },
  [ROUTE_KEYS.BUY]: {
    path: 'buy/:id',
    name: '购买课程',
  },
  [ROUTE_KEYS.MY_CARD]: {
    path: 'myCard',
    name: '我的消费卡',
  },
  [ROUTE_KEYS.RESERVE_COURSE]: {
    path: 'reserveCourse',
    name: '预约课程',
  },
  [ROUTE_KEYS.MY_COURSE]: {
    path: 'myCourse',
    name: '我的课程',
  },
  [ROUTE_KEYS.NOT_FOUND]: {
    path: '*',
    name: '页面不存在',
  },
};

export const ROUTES = Object.keys(ROUTE_CONFIG).map((key) => ({
  key,
  ...ROUTE_CONFIG[key],
}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
