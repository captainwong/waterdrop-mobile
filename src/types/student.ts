export interface IStudent {
  id: string;
  name: string;
  desc: string;
  tel: string;
  avatar: string;
  refetchHandler?: () => void;
}

export type TStudent = Partial<IStudent>;

export type TStudentQuery = {
  [key: string]: {
    __typename: 'Query',
    code: number,
    message: string,
    data: IStudent,
  }
};

export type TStudentMutation = {
  [key: string]: {
    __typename: 'Mutation',
    code: number,
    message: string,
    data: IStudent,
  }
};
