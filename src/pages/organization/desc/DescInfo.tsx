import {
  Divider,
  Image,
} from 'antd-mobile';
import { IOrganization } from '@/types/organization';
import styles from './DescInfo.module.less';

interface IProps {
  organization: IOrganization;
}

export const DescInfo = ({ organization }: IProps) => {
  return (
    <div className={styles.container} key="org-desc">
      {
        organization.desc?.split('<br />').map((line) => (
          <div key={`p-${line.slice(0, 10)}`}>
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
