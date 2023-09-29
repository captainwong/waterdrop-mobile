import { useProducts } from '@/services/product';
import { DotLoading, Grid } from 'antd-mobile';
import { useEffect } from 'react';
import styles from './ProductList.module.less';
import { ProductCard } from './ProductCard';

interface IProps {
  category: string;
  keyword: string;
}
// { category, keyword }:IProps

export const ProductList = () => {
  const { loading, products } = useProducts();

  if (loading) {
    return <DotLoading />;
  }

  return (
    <div className={styles.container}>
      <Grid columns={2} gap={10}>
        {
          products.map((product) => (
            <Grid.Item key={product.id}>
              <ProductCard product={product} />
            </Grid.Item>
          ))
        }
      </Grid>
    </div>
  );
};
