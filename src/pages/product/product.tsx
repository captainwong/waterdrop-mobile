/* eslint-disable prettier/prettier */
import { useParams } from 'react-router-dom';
import { useProduct } from '@/services/product';
import { Skeleton } from 'antd-mobile';
import styles from './product.module.less';
import { NotFoundPage } from '../404/NotFound';
import { BasicInfo } from './basic/BasicInfo';
import { DescInfo } from './desc/DescInfo';
import { Buy } from './buy/Buy';

export const Product = () => {
  const { id } = useParams<{ id: string }>();
  const {
    loading, code, product, courses,
  } = useProduct(id || '');

  if (!id) {
    return <NotFoundPage />;
  }

  if (loading) {
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </>
    );
  }

  if (code !== 200 || !product) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.container} key="product">
      <BasicInfo product={product} />
      <DescInfo courses={courses} />
      <Buy product={product} />
    </div>
  );
};
