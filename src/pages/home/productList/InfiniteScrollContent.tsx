import { DotLoading } from 'antd-mobile';
import styles from './InfiniteScrollContent.module.less';

interface IProps {
  hasMore?: boolean;
}

export const InfiniteScrollContent = ({ hasMore }: IProps) => {
  return hasMore ? (
    <div>
      <span className={styles.more}>加载中</span>
      <DotLoading />
    </div>
  ) : null;
};

InfiniteScrollContent.defaultProps = {
  hasMore: false,
};
