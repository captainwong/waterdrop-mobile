/* eslint-disable prettier/prettier */

import { useParams } from 'react-router-dom';
import { useOrganization } from '@/services/organization';
import { Divider } from 'antd-mobile';
import { Hr } from '@/components/hr/Hr';
import styles from './organization.module.less';
import { BasicInfo } from './basic/BasicInfo';
import { DescInfo } from './desc/DescInfo';
import { NotFoundPage } from '../404/NotFound';
import { RecommendProducts } from './recommend/RecommendProducts';

export const Organization = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, organization, success } = useOrganization(id || '');

  if (!id || !success) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.container}>
      <BasicInfo loading={loading} organization={organization} />
      <Divider />
      <DescInfo loading={loading} organization={organization} />
      <Divider />
      <RecommendProducts loading={loading} organization={organization} />
    </div>
  );
};
