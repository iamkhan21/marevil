import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import InputWithLabel from "../shared/InputWithLabel";
import { UserCreds } from "./AuthProvider/types";

interface State {
  username: string;
  password: string;
  loading: boolean;
  signin_error: string;
}

interface Props {
  signIn: (creds: UserCreds, cb: (error?: string) => void) => void;
}

class LoginForm extends PureComponent<Props, State> {
  alive = true;
  state = {
    username: "",
    password: "",
    loading: false,
    signin_error: "",
  };

  onChange = ({
    currentTarget: { value, name },
  }: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ [name]: value } as Pick<State, "username" | "password">);
  };

  isFormValid = (): boolean => {
    const { username, password } = this.state;
    return Boolean(username.trim()) && Boolean(password.trim());
  };

  onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const { username, password } = this.state;

    if (this.isFormValid()) {
      this.setState({ loading: true });

      this.props.signIn(
        { username: username.trim(), password: password.trim() },
        (error) => {
          this.alive &&
            this.setState({
              loading: false,
              signin_error: error || "",
            });
        }
      );
    }
  };

  componentWillUnmount(): void {
    this.alive = false;
  }

  render() {
    const { username, password, loading, signin_error } = this.state;
    const formValid = this.isFormValid();
    return (
      <form className="form form__auth" onSubmit={this.onSubmit}>
        <h3>Login</h3>
        <div className={"form__field"}>
          <InputWithLabel
            value={username}
            onChange={this.onChange}
            label={"Username"}
            name={"username"}
            type={"text"}
            disabled={loading}
            autoComplete="username"
            data-testid={"username"}
            required
          />
        </div>
        <div className={"form__field"}>
          <InputWithLabel
            value={password}
            onChange={this.onChange}
            label={"Password"}
            name={"password"}
            type={"password"}
            autoComplete="password"
            disabled={loading}
            data-testid={"password"}
            required
          />
        </div>
        <div className={"form__field"}>
          <button
            type={"submit"}
            className={"btn btn__primary btn__submit"}
            disabled={loading || !formValid}
            data-testid={"btn_submit"}
          >
            {loading ? "Processing login..." : "Log in"}
          </button>
          <p className={"form__field__error"}>{signin_error}</p>
        </div>
        <Link className={"dark-text"} to="/signup" data-testid={"link"}>
          <small>Need account? Signup is here.</small>
        </Link>
      </form>
    );
  }
}

export default LoginForm;
