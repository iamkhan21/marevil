import React, { useCallback } from "react";
import LoginForm from "../components/auth/LoginForm";
import "../assets/styles/pages/auth.css";
import {
  useAuthState,
  withAuthorization,
} from "../components/auth/AuthProvider";
import { UserCreds } from "../components/auth/AuthProvider/types";
import { useHistory } from "react-router-dom";
import { PageRoutes } from "../configs/routes";
import { useDocTitle } from "../hooks/useDocTitle";

const Login = () => {
  const history = useHistory();
  const { signIn } = useAuthState();

  useDocTitle("Marevil | Login");

  const onSignIn = useCallback(async (creds: UserCreds, callback) => {
    const error = await signIn(creds);
    callback(error);

    if (!error) {
      history.push(PageRoutes.Profile);
    }
  }, []);
  return (
    <article className={"page__auth"}>
      <LoginForm signIn={onSignIn} />
    </article>
  );
};

export default withAuthorization(Login, false);
