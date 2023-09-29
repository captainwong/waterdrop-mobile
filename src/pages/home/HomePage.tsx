import { SearchBar } from 'antd-mobile';
import styles from './HomePage.module.less';
import { CategorySelect } from './category/CategorySelect';
import { ProductList } from './productList/ProductList';

export const HomePage = () => {
  const onSearch = (value: string) => {
    console.log(value);
  };

  const onCategoryChange = (category: string) => {
    console.log(category);
  };

  return (
    <div className={styles.container}>
      <SearchBar
        placeholder="搜索课程"
        onSearch={onSearch}
      />
      <CategorySelect onCategoryChange={onCategoryChange} />
      <ProductList />
    </div>
  );
};
