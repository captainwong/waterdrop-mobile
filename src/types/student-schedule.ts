import { ICourse } from './course';
import { TGraphqlQuery } from './graphql';
import { IOrganization } from './organization';
import { ISchedule } from './schedule';

export enum StudentScheduleStatus {
  // 未上课
  NOT_STARTED = 'NOT_STARTED',
  // 上课中
  IN_PROGRESS = 'IN_PROGRESS',
  // 已下课
  FINISHED = 'FINISHED',
  // 已取消
  CANCELED = 'CANCELED',
}

export const StudentScheduleStatusProps: Record<string, { color: string, label: string }> = {
  [StudentScheduleStatus.NOT_STARTED]: {
    color: 'primary',
    label: '未开始',
  },
  [StudentScheduleStatus.IN_PROGRESS]: {
    color: 'success',
    label: '上课中',
  },
  [StudentScheduleStatus.FINISHED]: {
    color: 'default',
    label: '已下课',
  },
  [StudentScheduleStatus.CANCELED]: {
    color: 'danger',
    label: '已取消',
  },
};

export interface IStudentSchedule {
  id: string;
  status: string;
  createdAt: Date;
  schedule: ISchedule;
  course: ICourse;
  organization: IOrganization;
}

export type TStudentScheduleQuery = TGraphqlQuery<IStudentSchedule>;
export type TStudentSchedulesQuery = TGraphqlQuery<IStudentSchedule[]>;
