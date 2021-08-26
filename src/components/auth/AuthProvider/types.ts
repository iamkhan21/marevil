import { UserResult } from "userbase-js";

export type User = Partial<UserResult>;

export type AuthReducerActions = {
  type: AuthActions.SET_USER;
  payload?: User | null;
};

export type AuthState = {
  user: User | null | undefined;
  loading: boolean;
};

export type UserCreds = {
  username: string;
  password: string;
};

export type AuthStore = {
  state: AuthState;
  signUp: (creds: UserCreds) => Promise<string | undefined>;
  signIn: (creds: UserCreds) => Promise<string | undefined>;
  signOut: () => Promise<void>;
};

export enum AuthActions {
  SET_USER,
}
