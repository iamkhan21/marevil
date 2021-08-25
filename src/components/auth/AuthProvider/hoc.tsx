import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "./context";

const CheckingAuthMsg: React.FC = () => (
  <>
    <h3>Checking authorization...</h3>
    <hr />
    <p>Less is more, but we need more information before we can proceed.</p>
    <p>Here's your chance to catch a few blinks.</p>
  </>
);

const UserUnauthedMsg: React.FC = () => (
  <>
    <h3>Sorry, we can't recognise you.</h3>
    <hr />
    <p>
      Please, use <Link to={"/login"}>login</Link> or{" "}
      <Link to={"/signup"}>signup</Link> pages for authentication.
    </p>
    <p>After that, we will be able to proceed.</p>
  </>
);

const UserAuthedMsg: React.FC = () => (
  <>
    <h3>You're already authenticated.</h3>
    <hr />
    <p>
      Don't worry, you definitely typed the correct URL, it's the keyboard's
      fault. You can use this link to{" "}
      <Link to={"/dashboard"}>visit the dashboard</Link> or use the navigation
      at the top of the page.
    </p>
  </>
);

const StateMsgWrap: React.FC = (props) => (
  <article className="centered">
    <section style={{ maxWidth: "550px", width: "100%" }}>
      {props.children}
    </section>
  </article>
);

export function withAuthorization<TProps>(
  WrappedComponent: React.ComponentType<TProps>,
  needAuth = true,
  useAuthContextHook = useAuthContext
) {
  return (props: TProps) => {
    const {
      state: { loading, user },
    } = useAuthContextHook();

    // When awaiting information from userbase
    if (loading) {
      return <StateMsgWrap children={<CheckingAuthMsg />} />;
    }

    // When page shows only for authenticated users
    if (!user && needAuth) {
      return <StateMsgWrap children={<UserUnauthedMsg />} />;
    }

    // When page shows only for unauthenticated users
    if (user && !needAuth) {
      return <StateMsgWrap children={<UserAuthedMsg />} />;
    }

    // Return component if everything alright
    return <WrappedComponent {...(props as TProps)} />;
  };
}
