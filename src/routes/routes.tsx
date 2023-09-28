interface IRoute {
  path: string;
  name: string;
}

export const ROUTE_KEYS = {
  MY: 'my',
  HOME: 'home',
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
};

export const ROUTES = Object.keys(ROUTE_CONFIG).map((key) => ({
  key,
  ...ROUTE_CONFIG[key],
}));
