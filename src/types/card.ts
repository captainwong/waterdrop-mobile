import { ICourse } from './course';
import { TGraphqlQuery } from './graphql';

export const CARD_TYPE = {
  COUNT: 'count', // 次卡
  DURATION: 'duration', // 日卡
};

export interface ICard {
  id: string;
  name: string;
  type: string;
  count: number;
  duration: number;
  course: ICourse;
}

export type TCard = Partial<ICard>;

export type TCardQuery = TGraphqlQuery<ICard>;
export type TCardsQuery = TGraphqlQuery<ICard[]>;
