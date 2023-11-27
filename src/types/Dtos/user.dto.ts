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
  password:string
}

export type SignInResponse = {
  success: boolean;
  accessToken: string;
  user: {
    id:string;
    firstName: string;
    lastName: string;
    email: string;
    position:string
  };
};