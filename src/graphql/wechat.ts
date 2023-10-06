import { gql } from '@apollo/client';

export const GET_WXPAY_CONFIG = gql`
  mutation getWxpayConfig($scene: String!, $productId: String!, $quantity: Float!){
    getWxpayConfig(scene: $scene, productId: $productId, quantity: $quantity){
      code
      message
      data{
        appId
        timeStamp
        nonceStr
        package
        signType
        paySign
      }
    }
  }
`;
