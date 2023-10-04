/* eslint-disable prettier/prettier */
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Divider, Grid, Skeleton, Stepper, Toast,
} from 'antd-mobile';
import { API_HOST_BASE, API_WXLOGIN } from '@/utils/const';
import { useStudentInfoContext } from '@/hooks/studentHooks';
import { useProduct } from '@/services/product';
import { useState } from 'react';
import Decimal from 'decimal.js';
import { NotFoundPage } from '../404/NotFound';
import styles from './buy.module.less';

const { WeixinJSBridge } = window as any;

export const Buy = () => {
  const { store } = useStudentInfoContext();
  const { id } = useParams<{ id: string }>();
  const {
    loading, product,
  } = useProduct(id || '');

  const [searchParams] = useSearchParams();
  const wxloginResCode = parseInt(searchParams.get('code') || '0', 10);
  const wxloginResMsg = decodeURIComponent(searchParams.get('msg') || '');
  const [count, setCount] = useState(1);

  console.log('Buy', { id, wxloginResCode, wxloginResMsg });

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

  if (!product) {
    return <NotFoundPage />;
  }

  const wxlogin = async () => {
    const url = new URL(`${API_HOST_BASE}${API_WXLOGIN}`);
    url.searchParams.append('studentId', store.id);
    url.searchParams.append('redirect', window.location.href);
    console.log('wxlogin.url', url.toString());
    window.location.href = url.toString();
  };

  if (wxloginResCode !== 0 && wxloginResCode !== 200 && wxloginResMsg) {
    Toast.show('failed');
  }

  const onBuy = async () => {
    if (!store.wxOpenid) {
      wxlogin();
      return;
    }

    if (typeof WeixinJSBridge === 'undefined') {
      Toast.show('请在微信中打开');
      return;
    }

    Toast.show('buying');
  };

  return (
    <div className={styles.container}>
      <div className={styles.organization}>
        <div className={styles.logo}>
          <img src={product?.organization?.logo} alt="org_logo" className={styles.logoImg} />
        </div>
        <div className={styles.orgName}>{product?.organization?.name}</div>
      </div>
      <Divider />
      <div className={styles.title}>
        {product?.name}
      </div>
      <div className={styles.desc}>
        {product?.desc}
      </div>
      <Divider />
      <div className={styles.count}>
        购买数量
        <Stepper
          className={styles.stepper}
          value={count}
          onChange={setCount}
          min={1}
          max={product.limit}
        />
      </div>
      <div className={styles.price}>
        小计：￥
        {((new Decimal(product?.price)).mul(count)).toFixed(2)}
        <span className={styles.originalPrice}>
          ￥
          {((new Decimal(product?.originalPrice)).mul(count)).toFixed(2)}
        </span>
      </div>
      <Divider />
      <div className={styles.user}>
        <span className={styles.telLabel}>
          手机号码
        </span>
        <span className={styles.telValue}>
          {store.tel}
        </span>
      </div>
      <Grid columns={2} className={styles.buy}>
        <Grid.Item span={1}>
          <span className={styles.price}>
            ￥
            {((new Decimal(product?.price)).mul(count)).toFixed(2)}
          </span>
          <span className={styles.originalPrice}>
            ￥
            {((new Decimal(product?.originalPrice)).mul(count)).toFixed(2)}
          </span>
        </Grid.Item>
        <Grid.Item span={1} className={styles.buyBtn} onClick={onBuy}>
          {store.wxOpenid ? '立即购买' : '微信登录'}
        </Grid.Item>
      </Grid>
    </div>
  );
};
