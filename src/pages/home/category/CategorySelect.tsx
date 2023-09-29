import { useProductCategoryList } from '@/services/product';
import { SpinLoading, Tabs } from 'antd-mobile';
import { DEFAULT_CATEGORY } from '@/utils/const';
import styles from './CategorySelect.module.less';

interface IProps {
  onCategoryChange(category: string): void;
}

export const CategorySelect = ({ onCategoryChange }:IProps) => {
  const { categoryList, loading } = useProductCategoryList();
  if (loading || categoryList.length === 0) {
    return <SpinLoading />;
  }

  return (
    <Tabs
      className={styles.tabs}
      onChange={(key) => onCategoryChange(key)}
      defaultActiveKey={DEFAULT_CATEGORY}
    >
      <Tabs.Tab title="所有课程" key={DEFAULT_CATEGORY} />
      {categoryList.map((category) => (
        <Tabs.Tab title={category.name} key={category.key} />
      ))}
    </Tabs>
  );
};
