import { TGraphqlQuery } from './graphql';

export interface IStudent {
  id: string;
  name: string;
  tel: string;
  avatar: string;
  account: string;
  refetchHandler?: () => void;
}

export type TStudent = Partial<IStudent>;
export type TStudentQuery = TGraphqlQuery<IStudent>;
export type TStudentsQuery = TGraphqlQuery<IStudent[]>;
