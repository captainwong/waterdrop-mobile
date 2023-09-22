interface IRoute {
  path: string;
  name: string;
}

export const ROUTE_KEYS = {
  MY: 'my',
  HOME: 'home',
  LOGIN: 'login',
  REGISTER: 'register',
};

const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEYS.MY]: {
    path: 'my',
    name: '我的',
  },
  [ROUTE_KEYS.HOME]: {
    path: '',
    name: '主页',
  },
  [ROUTE_KEYS.LOGIN]: {
    path: 'login',
    name: '登录',
  },
  [ROUTE_KEYS.REGISTER]: {
    path: 'register',
    name: '注册',
  },
};

export const ROUTES = Object.keys(ROUTE_CONFIG).map((key) => ({
  key,
  ...ROUTE_CONFIG[key],
}));
