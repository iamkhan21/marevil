import { fireEvent, screen, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import renderWithRouter from "../../../__tests__/testUtils/renderWithRouter";
import { PageRoutes } from "../../configs/routes";
import { UserCreds } from "./AuthProvider/types";

const user = {
  username: "test_account",
  password: "password",
};

describe("LoginForm", () => {
  it("should render", () => {
    renderWithRouter(<LoginForm signIn={jest.fn} />);

    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const btnSubmit = screen.getByTestId("btn_submit");
    const link = screen.getByTestId("link");

    expect(inputUsername).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnSubmit).toBeInTheDocument();
    expect(btnSubmit).toBeDisabled();
    expect(link).toBeInTheDocument();
  });
  it("link should redirect on signup page", () => {
    const { history } = renderWithRouter(<LoginForm signIn={jest.fn} />);

    const link = screen.getByTestId("link");

    fireEvent.click(link);

    expect(history.location.pathname).toBe(PageRoutes.Signup);
  });
  it("should disable inputs and submit button after submit", async () => {
    renderWithRouter(<LoginForm signIn={jest.fn} />);

    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const btnSubmit = screen.getByTestId("btn_submit");

    fireEvent.change(inputUsername, {
      target: { value: user.username },
    });
    fireEvent.change(inputPassword, {
      target: { value: user.password },
    });

    await waitFor(() => {
      expect(btnSubmit).toBeEnabled();
    });

    fireEvent.click(btnSubmit);

    await waitFor(() => {
      expect(inputUsername).toBeDisabled();
      expect(inputPassword).toBeDisabled();
      expect(btnSubmit).toBeDisabled();
      expect(btnSubmit.textContent).toMatch("Processing login...");
    });
  });

  it("should transmit user credentials in signin method", async () => {
    const transmittedCreds = { username: "", password: "" };

    const signIn = (creds: UserCreds, cb: (error?: string) => void) => {
      transmittedCreds.username = creds.username;
      transmittedCreds.password = creds.password;
      cb();
    };

    renderWithRouter(<LoginForm signIn={signIn} />);

    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const btnSubmit = screen.getByTestId("btn_submit");

    fireEvent.change(inputUsername, {
      target: { value: ` ${user.username}  ` },
    });

    fireEvent.change(inputPassword, {
      target: { value: ` ${user.password}  ` },
    });

    fireEvent.click(btnSubmit);

    await waitFor(() => {
      expect(transmittedCreds.username).toBe(user.username);
      expect(transmittedCreds.password).toBe(user.password);
    });
  });
  it("should show login error", async () => {
    const loginError = "Something happened";

    const signIn = (_: UserCreds, cb: (error?: string) => void) => {
      cb(loginError);
    };

    const { container } = renderWithRouter(<LoginForm signIn={signIn} />);

    const inputUsername = screen.getByTestId("username");
    const inputPassword = screen.getByTestId("password");
    const btnSubmit = screen.getByTestId("btn_submit");

    fireEvent.change(inputUsername, {
      target: { value: user.username },
    });

    fireEvent.change(inputPassword, {
      target: { value: user.password },
    });

    fireEvent.click(btnSubmit);

    await waitFor(() => {
      expect(container.textContent).toMatch(loginError);
    });
  });
});
