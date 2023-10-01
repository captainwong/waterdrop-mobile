import {
  Divider,
  DotLoading, Image,
} from 'antd-mobile';
import { IOrganization } from '@/types/organization';
import styles from './DescInfo.module.less';

interface IProps {
  loading: boolean;
  organization: IOrganization | undefined;
}

export const DescInfo = ({ loading, organization }: IProps) => {
  if (loading || !organization) {
    return <DotLoading />;
  }

  return (
    <div className={styles.container}>
      {
        organization.desc?.split('<br />').map((line) => (
          <div>
            <p>{line}</p>
            <Divider />
          </div>
        ))
      }

      <div className={styles.imgs}>
        {[
          ...(organization.otherImgs || []),
        ].map((img) => (
          <Image
            src={img.url}
            alt="organization img"
            key={img.id}
          />
        ))}
      </div>
    </div>
  );
};
