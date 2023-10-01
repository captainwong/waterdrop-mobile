import { MyPage } from '@/pages/my/MyPage';
import { HomePage } from '@/pages/home/HomePage';
import { Organization } from '@/pages/organization/organization';
import { NotFoundPage } from '@/pages/404/NotFound';
import { Product } from '@/pages/product/product';
import { ROUTE_KEYS } from './menu';

export const ROUTE_COMPONENTS = {
  [ROUTE_KEYS.HOME]: HomePage,
  [ROUTE_KEYS.MY]: MyPage,
  [ROUTE_KEYS.ORGANIZATION]: Organization,
  [ROUTE_KEYS.NOT_FOUND]: NotFoundPage,
  [ROUTE_KEYS.PRODUCT]: Product,
};
