import React from "react";
import "../assets/styles/pages/home.css";

const Home = () => (
  <article className={"centered centered__vertical page__home"}>
    <section className={"content"}>
      <h2>Hi, I'm Marevil!</h2>
      <p>
        I'm a small web application, which was created with the goal to remind
        that the life is your own way, and only you decide wherever you go. And
        more over, only you are responsible what will happen tomorrow. I might
        not be a good example of UI, but it is what it is. I believe that in
        some time I will be better, than I'm right now.
      </p>
    </section>
    <section className={"content"}>
      <h3>Used technologies</h3>
      <ul className={"list"}>
        <li>
          <a
            href="https://create-react-app.dev"
            target="_blank"
            rel="noopener noreferrer"
            title="Create React App"
          >
            Create React App
          </a>{" "}
          as a base of application
        </li>
        <li>
          <a
            href="https://userbase.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Userbase"
          >
            Userbase
          </a>{" "}
          for user management
        </li>
        <li>
          <a
            href="https://www.typescriptlang.org"
            target="_blank"
            rel="noopener noreferrer"
            title="TypeScript"
          >
            TypeScript
          </a>{" "}
          to enhance development process
        </li>
        <li>
          <a
            href="https://jestjs.io"
            target="_blank"
            rel="noopener noreferrer"
            title="Jest"
          >
            Jest
          </a>{" "}
          with{" "}
          <a
            href="https://testing-library.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Testing Library"
          >
            Testing Library
          </a>{" "}
          for testing
        </li>
        <li>
          <a
            href="https://postcss.org"
            target="_blank"
            rel="noopener noreferrer"
            title="Postcss"
          >
            Postcss
          </a>{" "}
          for styling
        </li>
        <li>
          Icons made by{" "}
          <a
            href="https://www.freepik.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Freepik"
          >
            Freepik
          </a>{" "}
          from{" "}
          <a
            href="https://www.flaticon.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Flaticon"
          >
            www.flaticon.com
          </a>
        </li>
      </ul>
    </section>
  </article>
);

export default Home;
