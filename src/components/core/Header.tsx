import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { PageRoutes, routes } from "../../configs/routes";
import { useAuthState } from "../auth/AuthProvider";
import Button from "../shared/Button";
import { AuthStore } from "../auth/AuthProvider/types";

interface Props {
  useAuthStateHook?: () => Pick<AuthStore, "state" | "signOut">;
}

const Header: React.FC<Props> = ({ useAuthStateHook = useAuthState }) => {
  const {
    state: { user, loading },
    signOut,
  } = useAuthStateHook();
  const history = useHistory();

  const onSignOut = async () => {
    await signOut();
    history.push(PageRoutes.Login);
  };

  const links = React.useMemo(
    () =>
      routes
        .filter(
          ({ needAuth, name }) =>
            (Boolean(name) && typeof needAuth === "undefined") ||
            needAuth === Boolean(user)
        )
        .map(({ path, name, exact }, i) => (
          <NavLink
            key={i}
            to={path}
            exact={exact}
            activeClassName={"nav-link__active"}
            className="nav-link"
          >
            {name}
          </NavLink>
        )),
    [user]
  );

  return (
    <header>
      <h1 className={"brand"}>
        <Link to={PageRoutes.Home}>Marevil</Link>
      </h1>

      <nav className={"navigation"} aria-label="Main">
        {!loading && links}
      </nav>
      {!loading && user && (
        <Button onClick={onSignOut} className={"btn__signout"}>
          Sign out
        </Button>
      )}
    </header>
  );
};

export default Header;
