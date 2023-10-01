import { MyPage } from '@/pages/my/MyPage';
import { HomePage } from '@/pages/home/HomePage';
import { Organization } from '@/pages/organization/organization';
import { ROUTE_KEYS } from './menu';

export const ROUTE_COMPONENTS = {
  [ROUTE_KEYS.HOME]: HomePage,
  [ROUTE_KEYS.MY]: MyPage,
  [ROUTE_KEYS.ORGANIZATION]: Organization,
};
