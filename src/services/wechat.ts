import { GET_WXPAY_CONFIG } from '@/graphql/wechat';
import { IWxpayConfig, TWxpayConfigMutation } from '@/types/wechat';
import { useMutation } from '@apollo/client';

interface IGetWxpayConfig {
  success: boolean;
  message: string;
  wxpayConfig: IWxpayConfig | undefined;
}

export const useGetWxpayConfig = () => {
  const [get, { loading }] = useMutation<TWxpayConfigMutation>(GET_WXPAY_CONFIG);

  const getWxpayConfig = async (
    scene: string,
    productId: string,
    quantity: number,
  ): Promise<IGetWxpayConfig> => {
    const res = await get({
      variables: {
        scene,
        productId,
        quantity,
      },
    });
    return {
      success: res.data?.getWxpayConfig?.code === 200,
      message: res.data?.getWxpayConfig?.message || 'error',
      wxpayConfig: res.data?.getWxpayConfig.data,
    };
  };

  return { getWxpayConfig, loading };
};
