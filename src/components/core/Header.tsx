import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { PageRoutes, routes } from "../../pages/routes";
import { useAuthState } from "../auth/AuthProvider";

const Header: React.FC = () => {
  const {
    state: { user, loading },
    signOut,
  } = useAuthState();
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
        <button onClick={onSignOut} className={"btn btn__signout"}>
          Sign out
        </button>
      )}
    </header>
  );
};

export default Header;
