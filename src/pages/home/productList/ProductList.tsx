import { useProducts } from '@/services/product';
import {
  ErrorBlock, Footer, Grid, InfiniteScroll, PullToRefresh, Toast,
} from 'antd-mobile';
import type { ToastHandler } from 'antd-mobile/es/components/toast';
import { useEffect, useRef } from 'react';
import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/menu';
import { ProductCard } from './ProductCard';
import styles from './ProductList.module.less';
import { InfiniteScrollContent } from './InfiniteScrollContent';

interface IProps {
  category: string;
  keyword: string;
}

export const ProductList = ({ category, keyword }:IProps) => {
  const toastHandler = useRef<ToastHandler>();
  const {
    loading, hasMore, products, refreshProducts, loadMoreProducts,
  } = useProducts(category, keyword);
  const { go } = useGoTo();
  const goToProduct = (id: string) => {
    if (id) { go(ROUTE_KEYS.PRODUCT, { id }); }
  };

  useEffect(() => {
    if (loading) {
      toastHandler.current = Toast.show({
        icon: 'loading',
        content: '加载中...',
      });
    } else {
      toastHandler.current?.close();
    }
  }, [loading]);

  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={() => refreshProducts()}>
        {
          products.length === 0 ? (
            <ErrorBlock status="empty" />
          ) : (
            <Grid columns={2} gap={10}>
              {
                products.map((product) => (
                  <Grid.Item key={product.id} onClick={() => goToProduct(product.id)}>
                    <ProductCard product={product} />
                  </Grid.Item>
                ))
              }
            </Grid>
          )
        }
      </PullToRefresh>
      <InfiniteScroll hasMore={hasMore} loadMore={loadMoreProducts}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll>
      { !hasMore && (<Footer className={styles.footer} label="我是有底线的" />) }
    </div>
  );
};
