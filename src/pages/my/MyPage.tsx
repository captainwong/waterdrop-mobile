import { useGoTo } from '@/hooks';
import { useStudentInfoContext } from '@/hooks/studentHooks';
import { Grid, Image, List } from 'antd-mobile';
import { ROUTE_KEYS } from '@/routes/menu';
import { BankcardOutline, FaceRecognitionOutline, UnorderedListOutline } from 'antd-mobile-icons';
import styles from './MyPage.module.less';

export const MyPage = () => {
  const { store } = useStudentInfoContext();
  const { go } = useGoTo();

  return (
    <div className={styles.container}>
      <Grid columns={10} className={styles.grid}>
        <Grid.Item span={4}>
          <Image
            className={styles.avatar}
            src={store?.avatar}
            alt="avatar"
          />
        </Grid.Item>
        <Grid.Item span={6}>
          <div className={styles.name}>
            {store?.name}
          </div>
          <div className={styles.edit} role="presentation" onClick={() => go(ROUTE_KEYS.EDIT_MY)}>
            编辑资料
          </div>
        </Grid.Item>
      </Grid>
      <List className={styles.list}>
        <List.Item prefix={<FaceRecognitionOutline />}>
          预约课程
        </List.Item>
        <List.Item prefix={<UnorderedListOutline />}>
          我的课程表
        </List.Item>
        <List.Item prefix={<BankcardOutline />} onClick={() => go(ROUTE_KEYS.MY_CARD)}>
          我的消费卡
        </List.Item>
      </List>
    </div>
  );
};
