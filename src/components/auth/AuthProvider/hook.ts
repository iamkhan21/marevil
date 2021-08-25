import { useCallback } from "react";
import userbase, { RememberMeOption } from "userbase-js";
import { useAuthContext } from "./context";
import { AuthActions, AuthStore, UserCreds } from "./types";
import { of } from "await-of";

const defaultOptions: { rememberMe: RememberMeOption; sessionLength: number } =
  {
    sessionLength: 8,
    rememberMe: "local",
  };

export function useAuthState(): AuthStore {
  const { state, dispatch } = useAuthContext();

  const signIn = useCallback(async (creds: UserCreds) => {
    const [user, error] = await of(
      userbase.signIn({ ...defaultOptions, ...creds })
    );

    if (error) console.error("Error on userbase signIn: ", error);

    dispatch({ type: AuthActions.SET_USER, payload: user });

    return error?.message;
  }, []);

  const signUp = useCallback(async (creds: UserCreds) => {
    const [user, error] = await of(
      userbase.signUp({ ...defaultOptions, ...creds })
    );

    if (error) console.error("Error on userbase signUp: ", error);

    dispatch({ type: AuthActions.SET_USER, payload: user });

    return error?.message;
  }, []);

  const signOut = useCallback(async () => {
    const [, error] = await of(userbase.signOut());

    if (error) console.error("Error on userbase signOut: ", error);

    dispatch({ type: AuthActions.SET_USER, payload: null });
  }, []);

  return {
    state,
    signUp,
    signIn,
    signOut,
  };
}
