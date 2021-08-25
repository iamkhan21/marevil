import { AuthActions, AuthReducerActions, AuthState } from "./types";

export const reducer = (
  state: AuthState,
  action: AuthReducerActions
): AuthState => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return {
        loading: false,
        user: action.payload,
      };

    default:
      return state;
  }
};
