import { useProducts } from '@/services/product';
import {
  ErrorBlock, Grid, PullToRefresh, Toast,
} from 'antd-mobile';
import type { ToastHandler } from 'antd-mobile/es/components/toast';
import { useRef } from 'react';
import { ProductCard } from './ProductCard';
import styles from './ProductList.module.less';

interface IProps {
  category: string;
  keyword: string;
}

export const ProductList = ({ category, keyword }:IProps) => {
  const { loading, products, refreshProducts } = useProducts(category, keyword);
  const toastHandler = useRef<ToastHandler>();

  if (loading) {
    toastHandler.current = Toast.show({
      icon: 'loading',
      content: '加载中...',
    });
  } else {
    toastHandler.current?.close();
  }

  if (products.length === 0) {
    return <ErrorBlock status="empty" />;
  }

  return (
    <div className={styles.container}>
      <PullToRefresh onRefresh={() => refreshProducts()}>
        <Grid columns={2} gap={10}>
          {
          products.map((product) => (
            <Grid.Item key={product.id}>
              <ProductCard product={product} />
            </Grid.Item>
          ))
        }
        </Grid>
      </PullToRefresh>
    </div>
  );
};
