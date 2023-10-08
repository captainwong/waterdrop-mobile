import { ICard } from './card';
import { ICourse } from './course';
import { TGraphqlQuery } from './graphql';
import { IOrganization } from './organization';

export enum CardStatus {
  VALID = 'VALID', // 有效
  EXPIRED = 'EXPIRED', // 过期
  DEPLETED = 'DEPLETED', // 已用完
}

export interface IStudentCard {
  id: string;
  type: string;
  purchasedAt: Date;
  effectiveAt: Date;
  expiresAt: Date;
  remainingTimes: number;
  status: string;
  card: ICard;
  organization: IOrganization;
  course: ICourse,
}

export type TStudentCard = Partial<IStudentCard>;
export type TStudentCardQuery = TGraphqlQuery<IStudentCard>;
export type TStudentCardsQuery = TGraphqlQuery<IStudentCard[]>;
