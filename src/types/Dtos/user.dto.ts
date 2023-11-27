export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  position: string;
}

export type CreateUser = Omit<User, "id">;

export type LoginUser = {
  email: string;
  password: string;
};

export type UpdateUser = Partial<Omit<User, "id">>;

export type ChangePasswordRequest = {
  oldPassword: string;
  password: string;
  confirm_password: string;
};

export type ResetPasswordRequest = {
  password: string;
  confirm_password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export interface IResetPasswordSuccess {
  message: string;
  token?: string;
}

export interface IJwtPayload {
  ref: string;
}

export type changedPassordResponse = Omit<User, "password">;

export type SignInResponse = {
  success: boolean;
  accessToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
  };
};
