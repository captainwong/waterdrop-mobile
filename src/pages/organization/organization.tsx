/* eslint-disable prettier/prettier */

import { useParams } from 'react-router-dom';
import { useOrganization } from '@/services/organization';
import { Divider, Skeleton } from 'antd-mobile';
import styles from './organization.module.less';
import { BasicInfo } from './basic/BasicInfo';
import { DescInfo } from './desc/DescInfo';
import { NotFoundPage } from '../404/NotFound';
import { RecommendProducts } from './recommend/RecommendProducts';

export const Organization = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, organization, success } = useOrganization(id || '');

  if (loading) {
    return (
      <>
        <Skeleton.Title animated />
        <Skeleton.Paragraph lineCount={5} animated />
      </>
    );
  }

  if (!id || !success || !organization) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.container}>
      <BasicInfo organization={organization} />
      <Divider />
      <DescInfo organization={organization} />
      <Divider />
      <RecommendProducts organization={organization} />
    </div>
  );
};
