import {
  GET_ORGANIZATION_INFO,
} from '@/graphql/organization';

import {
  TOrganizationQuery,
} from '@/types/organization';
import { useQuery } from '@apollo/client';

export const useOrganization = (id: string) => {
  const {
    loading,
    data,
    refetch,
  } = useQuery<TOrganizationQuery>(GET_ORGANIZATION_INFO, {
    variables: {
      id,
    },
  });

  return {
    loading,
    refetch,
    success: data?.getOrganizationInfo.code === 200,
    message: data?.getOrganizationInfo.message,
    organization: data?.getOrganizationInfo.data,
  };
};
