/* eslint-disable prettier/prettier */
import { useParams, useSearchParams } from 'react-router-dom';
import { Button, Toast } from 'antd-mobile';
import { API_HOST_BASE, API_WXLOGIN } from '@/utils/const';
import { useStudentInfoContext } from '@/hooks/studentHooks';
import styles from './buy.module.less';

export const Buy = () => {
  const { store } = useStudentInfoContext();
  const { id = '' } = useParams();
  const [searchParams] = useSearchParams();
  const wxloginResCode = parseInt(searchParams.get('code') || '0', 10);
  const wxloginResMsg = decodeURIComponent(searchParams.get('msg') || '');

  console.log('Buy', { id, wxloginResCode, wxloginResMsg });

  const wxlogin = async () => {
    const url = new URL(`${API_HOST_BASE}${API_WXLOGIN}`);
    url.searchParams.append('studentId', store.id);
    url.searchParams.append('redirect', window.location.href);
    console.log('wxlogin.url', url.toString());
    window.location.href = url.toString();
  };

  if (wxloginResCode !== 0 && wxloginResCode !== 200 && wxloginResMsg) {
    Toast.show('failed');
  }

  return (
    <div className={styles.container}>
      <Button onClick={wxlogin}>
        wxlogin
      </Button>
    </div>
  );
};
