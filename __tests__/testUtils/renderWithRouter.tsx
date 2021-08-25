import React, { ComponentType } from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";

function renderWithRouter(component: React.ReactNode, currentRoute = "/") {
  const history = createMemoryHistory({ initialEntries: [currentRoute] });

  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
}

export default renderWithRouter;
