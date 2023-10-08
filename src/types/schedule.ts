import { ICourse } from './course';
import { TGraphqlQuery } from './graphql';
import { IOrganization } from './organization';
import { ITeacher } from './teacher';

export interface ISchedule {
  id: string;
  date: Date;
  start: string;
  end: string;
  limit: number;
  organization: IOrganization;
  course: ICourse;
  teacher: ITeacher;
}

export type TSchedule = Partial<ISchedule>;
export type TScheduleQuery = TGraphqlQuery<ISchedule>;
export type TSchedulesQuery = TGraphqlQuery<ISchedule[]>;
