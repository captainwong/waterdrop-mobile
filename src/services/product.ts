import {
  GET_PRODUCT, GET_PRODUCTS, GET_PRODUCT_CATEGORY,
} from '@/graphql/product';
import {
  IProduct,
  TProductCategoryQuery, TProductQuery, TProductsQuery,
} from '@/types/product';
import { DEFAULT_PAGE_SIZE } from '@/utils/const';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';

export const useProductCategoryList = () => {
  const { data, loading } = useQuery<TProductCategoryQuery>(GET_PRODUCT_CATEGORY);
  return { categoryList: data?.getProductCategories.data || [], loading };
};

export const useProduct = (id: string) => {
  const { data, loading, refetch } = useQuery<TProductQuery>(GET_PRODUCT, {
    skip: !id,
    variables: {
      id,
    },
  });

  const newProduct = useMemo(() => ({
    ...data?.getProductInfo.data,
    cards: data?.getProductInfo.data?.cards || [],
    cover: [{ url: data?.getProductInfo.data?.cover }],
    banner: [{ url: data?.getProductInfo.data?.banner }],
  }), [data]);

  return {
    product: data?.getProductInfo.data ? newProduct : undefined, loading, refetch,
  };
};

export const useProducts = (category = '', name = '') => {
  const [get, { loading }] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);
  const pageCur = useRef(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async (pageNum = 1) => {
    const res = await get({
      variables: {
        category,
        name,
        page: {
          page: pageNum,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
    });
    const more = (res.data?.getProductsH5.page &&
      (
        (res.data.getProductsH5.page.page * DEFAULT_PAGE_SIZE)
          < res.data.getProductsH5.page.total
      )
    ) || false;
    return {
      ps: res.data?.getProductsH5.data || [],
      more,
    };
  };

  const refreshProducts = async () => {
    pageCur.current = 1;
    const { ps, more } = await getProducts();
    setHasMore(more);
    setProducts(ps);
  };

  const loadMoreProducts = async () => {
    if (!hasMore) return;
    const { ps, more } = await getProducts(pageCur.current + 1);
    setHasMore(more);
    setProducts((prev) => [...prev, ...ps]);
    pageCur.current += 1;
  };

  useEffect(() => {
    refreshProducts();
  }, [category, name]);

  return {
    loading,
    products,
    refreshProducts,
    loadMoreProducts,
  };
};
