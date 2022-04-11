export type RequestLoginType = {
  email: string;
  password: string;
};
export type idType = {
  _id: string;
};

export type AppStateType = {
  selectedIds: string[];
  isAuthorised: boolean;
  showLoginPopUp: boolean;
  showLogin: boolean;
  showSignin: boolean;
  snackSuccessfullRegistration: boolean;
  snackSuccessfullLogin: boolean;
  isLoading: boolean;
  snackBlocked: boolean;
  snackBan: boolean;
  snackUnban: boolean;
  snackDelete: boolean;
  users: UsersType[];
  emailUser: string | null;
};
export type HeaderPropsType = {
  isAuthorised: boolean;
  handleLogout: React.MouseEventHandler<HTMLButtonElement>;
  handleLogin: React.MouseEventHandler<HTMLButtonElement>;
  userEmail: string;
};

export type UsersType = {
  _id: number;
  id: number;
  firstName: string;
  email: string;
  registration: Date;
  lastVisit: Date;
  status: string;
};
export type TablePropsType = {
  isLoading: boolean;
  rows: UsersType[];
};
export type SnackType = {
  isOpen: boolean;
  handleClose: (event?: React.SyntheticEvent | Event, reason?: string) => void;
};
