import { useGoTo } from '@/hooks';
import { ROUTE_KEYS } from '@/routes/menu';
import { Card, ResultPage } from 'antd-mobile';
import { AlipayCircleFill } from 'antd-mobile-icons';

interface IProps {
  price: string;
  orgName: string;
  productName: string;
  productDesc: string;
}

export const SuccessResult = ({
  price, orgName, productName, productDesc,
}: IProps) => {
  const { go } = useGoTo();

  return (
    <ResultPage
      status="success"
      title={<div style={{ fontSize: 15 }}>支付成功</div>}
      description={(
        <div>
          <span style={{ fontSize: 32, color: '#fff', marginRight: 4 }}>￥</span>
          <span style={{ fontSize: 48, color: '#fff' }}>{price}</span>
        </div>
      )}
      icon={<AlipayCircleFill />}
      details={[
        {
          label: orgName,
          value: `￥${price}`,
          bold: true,
        },
      ]}
      onPrimaryButtonClick={() => go(ROUTE_KEYS.HOME)}
      primaryButtonText="返回首页"
    >
      <Card title={productName}>
        {productDesc}
      </Card>
    </ResultPage>
  );
};
