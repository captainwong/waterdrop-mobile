/* eslint-disable prettier/prettier */

import { useParams } from 'react-router-dom';
import styles from './organization.module.less';

export const Organization = () => {
  const { id } = useParams<{ id: string }>();
  console.log('organization.id', id);
  return (
    <div>
      Organization
    </div>
  );
};
