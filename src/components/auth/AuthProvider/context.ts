import { createContext, useContext } from "react";
import { AuthReducerActions, AuthState } from "./types";

export type AuthContextProps = {
  state: AuthState;
  dispatch: React.Dispatch<AuthReducerActions>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const useAuthContext = () => useContext(AuthContext);
