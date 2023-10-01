import {
  Grid, Image, Swiper,
} from 'antd-mobile';
import { IOrganization } from '@/types/organization';
import { CheckShieldOutline, EnvironmentOutline, PhoneFill } from 'antd-mobile-icons';
import styles from './BasicInfo.module.less';

interface IProps {
  organization: IOrganization;
}

export const BasicInfo = ({ organization }: IProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={organization.logo} alt="logo" className={styles.logo} />
        {organization.name}
      </div>

      <div className={styles.tags}>
        {organization.tags?.split(',').map((tag) => (
          <span className={styles.tag} key={tag}>
            <CheckShieldOutline />
            {tag}
          </span>
        ))}
      </div>

      <div className={styles.imgs}>
        <Swiper loop autoplay>
          {
            [...(organization.frontImgs || []),
              ...(organization.roomImgs || []),
            ].map((img) => (
              <Swiper.Item key={img.id}>
                <Image
                  src={img.url}
                  alt="organization img"
                  fit="contain"
                />
              </Swiper.Item>
            ))
}
        </Swiper>
      </div>

      <div className={styles.address}>
        <Grid columns={24}>
          <Grid.Item span={20}>
            <EnvironmentOutline className={styles.addrIcon} />
            <a href={`http://api.map.baidu.com/marker?location=${organization.latitude},${organization.longitude}&title=${organization.address}&output=html&content=${organization.name}`}>
              <span className={styles.addrText}>
                {organization.address}
              </span>
            </a>
          </Grid.Item>
          <Grid.Item span={4}>
            <a href={`tel:${organization.tel}`}>
              <PhoneFill className={styles.tel} />
            </a>
          </Grid.Item>
        </Grid>
      </div>
    </div>
  );
};
