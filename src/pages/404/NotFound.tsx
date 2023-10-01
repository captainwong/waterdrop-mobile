import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/menu';
import { Button, ErrorBlock } from 'antd-mobile';

export const NotFoundPage = () => {
  const { go } = useGoTo();
  return (
    <ErrorBlock status="empty">
      <Button color="primary" onClick={() => go(ROUTE_KEYS.HOME)}>返回主页</Button>
    </ErrorBlock>
  );
};
