import { AuthActions, AuthState } from "./types";
import React, { useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { of } from "await-of";
import { AuthContext } from "./context";
import userbase, { Session } from "userbase-js";

const initialState: AuthState = {
  user: null,
  loading: true,
};

const getSession = (): Promise<Session> =>
  userbase.init({
    appId: process.env.REACT_APP_USERBASE || "",
  });

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const [{ user } = { user: null }, error] = await of(getSession());

      if (error) console.error("Error on userbase init: ", error);

      dispatch({ type: AuthActions.SET_USER, payload: user });
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
