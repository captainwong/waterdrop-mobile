import { ICourse } from './course';
import { TGraphqlQuery } from './graphql';
import { IMedia } from './media';

export interface IOrganization {
  id: string;
  name: string;
  businessLicense: string;
  identityCardBackImg: string;
  identityCardFrontImg: string;
  tags?: string;
  desc?: string;
  tel?: string;
  address?: string;
  longitude?: string;
  latitude?: string;
  logo: string;
  frontImgs?: IMedia[];
  roomImgs?: IMedia[];
  otherImgs?: IMedia[];
  courses?: ICourse[];
}

export type TOrganization = Partial<IOrganization>;
export type TOrganizationQuery = TGraphqlQuery<IOrganization>;
export type TOrganizationsQuery = TGraphqlQuery<IOrganization[]>;

export interface ICurrentOrganization {
  id: string;
  name: string;
}
