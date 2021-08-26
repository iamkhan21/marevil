import React from "react";
import { Route, Switch } from "react-router-dom";
import { routes } from "../../configs/routes";

const Main: React.FC = () => {
  return (
    <main>
      <React.Suspense
        fallback={
          <article>
            <h3>Loading page...</h3>
          </article>
        }
      >
        <Switch>
          {routes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Switch>
      </React.Suspense>
    </main>
  );
};

export default Main;
