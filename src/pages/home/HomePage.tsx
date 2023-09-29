import { SearchBar } from 'antd-mobile';
import { useState } from 'react';
import { DEFAULT_CATEGORY } from '@/utils/const';
import styles from './HomePage.module.less';
import { CategorySelect } from './category/CategorySelect';
import { ProductList } from './productList/ProductList';

export const HomePage = () => {
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [keyword, setKeyword] = useState('');

  const onSearch = (value: string) => {
    setKeyword(value);
  };

  const onCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <div className={styles.container}>
      <SearchBar
        placeholder="搜索课程"
        onSearch={onSearch}
        onClear={() => onSearch('')}
      />
      <CategorySelect onCategoryChange={onCategoryChange} />
      <ProductList category={category} keyword={keyword} />
    </div>
  );
};
