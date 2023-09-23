export interface IPropsChildren {
  children: React.ReactNode;
}

export interface IStudent {
  id: string;
  name: string;
  desc: string;
  tel: string;
  avatar: string;
  refetchHandler?: () => void;
}
