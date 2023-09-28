import { MyPage } from '@/pages/my/MyPage';
import { HomePage } from '@/pages/home/HomePage';
import { ROUTE_KEYS } from './routes';

export const ROUTE_COMPONENTS = {
  [ROUTE_KEYS.HOME]: HomePage,
  [ROUTE_KEYS.MY]: MyPage,
};
