import {
  GET_PRODUCT, GET_PRODUCTS, GET_PRODUCT_CATEGORY, GET_RPODUCTS_BY_ORGANIZATION,
} from '@/graphql/product';
import { TCourse } from '@/types/course';
import {
  IProduct,
  TProductCategoryQuery, TProductQuery, TProductsQuery,
} from '@/types/product';
import { DEFAULT_CATEGORY, DEFAULT_PAGE_SIZE } from '@/utils/const';
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

  const courses = useMemo(() => {
    const uniqueCourses: Record<string, TCourse> = {};
    const cards = data?.getProductInfo.data?.cards || [];
    cards.forEach((card) => {
      const { id: courseId, ...rest } = card.course;
      const existingCourse = uniqueCourses[courseId];
      if (existingCourse) {
        existingCourse.cardName = `${existingCourse.cardName}, ${card.name}`;
      } else {
        uniqueCourses[courseId] = { ...rest, cardName: card.name } as TCourse;
      }
    });
    return Object.values(uniqueCourses);
  }, [data?.getProductInfo.data?.cards]);

  const newProduct = useMemo(() => ({
    ...data?.getProductInfo.data,
    cards: data?.getProductInfo.data?.cards || [],
    cover: data?.getProductInfo.data?.cover ? [{ url: data?.getProductInfo.data?.cover }] : [],
    banner: data?.getProductInfo.data?.banner ? [{ url: data?.getProductInfo.data?.banner }] : [],
  }), [data]);

  return {
    loading,
    code: data?.getProductInfo.code,
    product: data?.getProductInfo.data ? newProduct : undefined,
    courses,
    refetch,
  };
};

const getLocation = () => new Promise<{ latitude: number, longitude: number }>((resolve) => {
  navigator.geolocation.getCurrentPosition((position) => {
    resolve({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }, () => {
    resolve({ latitude: 0, longitude: 0 });
  }, {
    timeout: 3000,
    maximumAge: 1000 * 10,
  });
});

export const useProducts = (category = '', name = '') => {
  const [get, { loading }] = useLazyQuery<TProductsQuery>(GET_PRODUCTS);
  const pageCur = useRef(1);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getProducts = async (pageNum = 1) => {
    const { latitude, longitude } = await getLocation();
    const res = await get({
      fetchPolicy: 'network-only',
      variables: {
        latitude,
        longitude,
        category: category === DEFAULT_CATEGORY ? '' : category,
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
    console.log('products.count=', products.length);
    pageCur.current += 1;
  };

  useEffect(() => {
    refreshProducts();
  }, [category, name]);

  return {
    loading,
    hasMore,
    products,
    refreshProducts,
    loadMoreProducts,
  };
};

export const useProductsByOrganization = (organizationId: string) => {
  const { data, loading } = useQuery<TProductsQuery>(GET_RPODUCTS_BY_ORGANIZATION, {
    variables: {
      organizationId,
    },
  });
  return {
    loading,
    code: data?.getProductsByOrgH5.code,
    products: data?.getProductsByOrgH5.data || [],
  };
};
