/* eslint-disable prettier/prettier */
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Divider, Grid, Modal, Skeleton, Stepper, Toast,
} from 'antd-mobile';
import { API_HOST_BASE, API_WXLOGIN } from '@/utils/const';
import { useStudentInfoContext } from '@/hooks/studentHooks';
import { useProduct } from '@/services/product';
import { useState } from 'react';
import Decimal from 'decimal.js';
import { useGetWxpayConfig } from '@/services/wechat';
import { WXPAY_SCENES } from '@/types/wechat';
import { NotFoundPage } from '../404/NotFound';
import styles from './buy.module.less';
import { FailResult } from './results/fail';
import { SuccessResult } from './results/success';

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
  const [quantity, setQuantity] = useState(1);
  const { getWxpayConfig } = useGetWxpayConfig();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

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
    // TODO 扫码登录，扫码支付
    if (typeof WeixinJSBridge === 'undefined') {
      Toast.show('请在微信中打开');
      return;
    }

    if (!store.wxOpenid) {
      wxlogin();
      return;
    }

    const wxpayConfig = await getWxpayConfig(WXPAY_SCENES.JSAPI, id, quantity);
    if (!wxpayConfig || !wxpayConfig.success || !wxpayConfig.wxpayConfig) {
      Toast.show(wxpayConfig.message || '获取支付信息失败');
      return;
    }

    console.log('wxpayConfig', wxpayConfig);

    // Modal.alert({
    //   title: '支付信息',
    //   content: <div>{JSON.stringify(wxpayConfig.wxpayConfig)}</div>,
    // });

    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      { ...wxpayConfig.wxpayConfig },
      (res: { err_msg: string }) => {
        console.log('res', res);
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          setShowFail(false);
          setShowSuccess(true);
        } else {
          setShowSuccess(false);
          setShowFail(true);
        }
      },
    );
  };

  if (showFail) {
    return <FailResult price={product.price} orgName={product.organization?.name || ''} />;
  }

  if (showSuccess) {
    return <SuccessResult price={product.price} orgName={product.organization?.name || ''} productName={product.name} productDesc={product.desc} />;
  }

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
          value={quantity}
          onChange={setQuantity}
          min={1}
          max={product.limit}
        />
      </div>
      <div className={styles.price}>
        小计：￥
        {((new Decimal(product?.price)).mul(quantity)).toFixed(2)}
        <span className={styles.originalPrice}>
          ￥
          {((new Decimal(product?.originalPrice)).mul(quantity)).toFixed(2)}
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
            {((new Decimal(product?.price)).mul(quantity)).toFixed(2)}
          </span>
          <span className={styles.originalPrice}>
            ￥
            {((new Decimal(product?.originalPrice)).mul(quantity)).toFixed(2)}
          </span>
        </Grid.Item>
        <Grid.Item span={1} className={styles.buyBtn} onClick={onBuy}>
          {store.wxOpenid ? '立即购买' : '微信登录'}
        </Grid.Item>
      </Grid>
    </div>
  );
};
