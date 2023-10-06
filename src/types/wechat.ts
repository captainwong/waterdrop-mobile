import { TGraphqlMutation, TGraphqlQuery } from './graphql';

export const WXPAY_SCENES = {
  JSAPI: 'JSAPI', // 公众号支付
  NATIVE: 'NATIVE', // 扫码支付
  APP: 'APP', // APP支付
  H5: 'H5', // H5支付
};

export interface IWxpayConfig {
  appId: string;
  timeStamp: string;
  nonceStr: string;
  package: string;
  signType: string;
  paySign: string;
}

export type TWxpayConfigQuery = TGraphqlQuery<IWxpayConfig>;
export type TWxpayConfigMutation = TGraphqlMutation<IWxpayConfig>;
