import React from "react";
import { useDocTitle } from "../hooks/useDocTitle";

const NotFound = () => {
  useDocTitle("Marevil | Page not found");
  return (
    <article className="centered">
      <section>
        <h2>
          Page not found&nbsp;&mdash; <code>404</code>
        </h2>
      </section>
    </article>
  );
};

export default NotFound;
