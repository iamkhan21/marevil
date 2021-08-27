import React, { useCallback } from "react";
import "../assets/styles/pages/auth.css";
import SignupForm from "../components/auth/SignupForm";
import {
  useAuthState,
  withAuthorization,
} from "../components/auth/AuthProvider";
import { UserCreds } from "../components/auth/AuthProvider/types";
import { useHistory } from "react-router-dom";
import { PageRoutes } from "../configs/routes";
import { useDocTitle } from "../hooks/useDocTitle";

const Signup: React.FC = () => {
  const history = useHistory();
  const { signUp } = useAuthState();
  useDocTitle("Marevil | Signup");

  const onSignUp = useCallback(async (creds: UserCreds, callback) => {
    const error = await signUp(creds);

    callback(error);

    if (!error) {
      history.push(PageRoutes.Profile);
    }
  }, []);

  return (
    <article className={"page__auth"}>
      <SignupForm signUp={onSignUp} />
    </article>
  );
};

export default withAuthorization(Signup, false);
