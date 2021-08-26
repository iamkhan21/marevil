import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import InputWithLabel from "../shared/forms/InputWithLabel";
import { UserCreds } from "./AuthProvider/types";
import FormField from "../shared/forms/FormField";
import Button from "../shared/Button";

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
  state = {
    username: "",
    password: "",
    loading: false,
    signin_error: "",
  };
  private alive = true;
  private formRef = React.createRef<HTMLFormElement>();

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
      this.formRef.current?.classList.remove("head-shake");
      this.setState({ loading: true });

      this.props.signIn(
        { username: username.trim(), password: password.trim() },
        (error) => {
          if (this.alive) {
            this.setState({
              loading: false,
              signin_error: error || "",
            });

            if (error) {
              this.formRef.current?.classList.add("head-shake");
            }
          }
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
      <form
        className="form form__auth animated"
        onSubmit={this.onSubmit}
        ref={this.formRef}
      >
        <h3>Login</h3>
        <FormField>
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
        </FormField>
        <FormField>
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
        </FormField>
        <FormField>
          <Button
            type={"submit"}
            className={"btn__submit"}
            disabled={loading || !formValid}
            data-testid={"btn_submit"}
            appearance={"primary"}
          >
            {loading ? "Processing login..." : "Log in"}
          </Button>
          <p className={"form__field__error"}>{signin_error}</p>
        </FormField>
        <Link className={"dark-text"} to="/signup" data-testid={"link"}>
          <small>Need account? Signup is here.</small>
        </Link>
      </form>
    );
  }
}

export default LoginForm;
