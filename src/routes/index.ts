import { MyPage } from '@/pages/my/MyPage';
import { HomePage } from '@/pages/home/HomePage';
import { Organization } from '@/pages/organization/organization';
import { NotFoundPage } from '@/pages/404/NotFound';
import { Product } from '@/pages/product/product';
import { EditMy } from '@/pages/editMy/EditMy';
import { Buy } from '@/pages/buy/buy';
import { MyCard } from '@/pages/my-card/my-card';
import { ROUTE_KEYS } from './menu';

export const ROUTE_COMPONENTS = {
  [ROUTE_KEYS.HOME]: HomePage,
  [ROUTE_KEYS.MY]: MyPage,
  [ROUTE_KEYS.EDIT_MY]: EditMy,
  [ROUTE_KEYS.ORGANIZATION]: Organization,
  [ROUTE_KEYS.NOT_FOUND]: NotFoundPage,
  [ROUTE_KEYS.PRODUCT]: Product,
  [ROUTE_KEYS.BUY]: Buy,
  [ROUTE_KEYS.MY_CARD]: MyCard,
};
