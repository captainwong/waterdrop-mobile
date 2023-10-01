import {
  Card,
  DotLoading, Grid, Image, Result,
} from 'antd-mobile';
import { IOrganization } from '@/types/organization';
import { useProductsByOrganization } from '@/services/product';
import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/menu';
import styles from './RecommendProducts.module.less';

interface IProps {
  organization: IOrganization;
}

export const RecommendProducts = ({ organization }: IProps) => {
  const {
    loading: recLoading, products,
  } = useProductsByOrganization(organization?.id || '');

  const { go } = useGoTo();
  const goToProduct = (id: string) => {
    go(ROUTE_KEYS.PRODUCT, { id });
  };

  if (recLoading) {
    return <DotLoading />;
  }

  if (products.length === 0) {
    return (
      <Result
        status="warning"
        title="没有找到相关课程"
      />
    );
  }

  return (
    <Card title="推荐课程" className={styles.container}>
      {
        products.map((product) => (
          <div
            role="presentation"
            key={product.id}
            onClick={() => goToProduct(product.id)}
          >
            <Grid columns={12} className={styles.item}>
              <Grid.Item span={2}>
                <Image src={product.cover} alt="cover" className={styles.cover} />
              </Grid.Item>
              <Grid.Item span={8} className={styles.content}>
                <div className={styles.name}>
                  {product.name}
                </div>
                <div className={styles.desc}>
                  <span className={styles.descText}>
                    {product.desc}
                  </span>
                  <span className={styles.sales}>
                    已售&nbsp;
                    {product.sales || 0}
                  </span>
                </div>
              </Grid.Item>
              <Grid.Item span={2}>
                <div className={styles.price}>
                  ￥
                  {product.price}
                </div>
                <div className={styles.originalPrice}>
                  ￥
                  {product.originalPrice}
                </div>
              </Grid.Item>
            </Grid>
          </div>
        ))
      }
    </Card>
  );
};
