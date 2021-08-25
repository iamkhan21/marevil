import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import InputWithLabel from "../shared/InputWithLabel";
import { debounce } from "../../utils/timings";
import {
  checkPasswordMinLength,
  checkUsernameMinLength,
} from "../../utils/validators";
import { generateCredentialError } from "./errors";

interface State {
  username: string;
  password: string;
  loading: boolean;
  errors: {
    username: string;
    password: string;
    signup: string;
  };
}

interface Props {
  signUp: (
    creds: {
      username: string;
      password: string;
    },
    cb: (error?: string) => void
  ) => void;
}

class SignupForm extends PureComponent<Props, State> {
  alive = true;
  state = {
    username: "",
    password: "",
    loading: false,
    errors: {
      username: "",
      password: "",
      signup: "",
    },
  };

  validateField = debounce((name: string) => {
    const { username, password, errors } = this.state;
    let { username: usrnmErr, password: pswdErr } = errors;

    switch (name) {
      case "username": {
        usrnmErr = checkUsernameMinLength(username)
          ? ``
          : generateCredentialError(name, username);
        break;
      }
      case "password": {
        pswdErr = checkPasswordMinLength(password)
          ? ``
          : generateCredentialError(name, password);
        break;
      }
    }

    this.alive &&
      this.setState({
        errors: {
          signup: "",
          username: usrnmErr,
          password: pswdErr,
        },
      });
  }, 500);

  onChange = ({
    currentTarget: { value, name },
  }: React.FormEvent<HTMLInputElement>): void => {
    this.setState(
      { [name]: value } as Pick<State, "username" | "password">,
      () => this.validateField(name)
    );
  };

  isFormValid = (): boolean => {
    const { username, password } = this.state;
    return checkUsernameMinLength(username) && checkPasswordMinLength(password);
  };

  onSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    const { username, password, errors } = this.state;

    if (this.isFormValid()) {
      this.setState({ loading: true });

      this.props.signUp(
        { username: username.trim(), password: password.trim() },
        (error) => {
          this.alive &&
            this.setState({
              loading: false,
              errors: { ...errors, signup: error || "" },
            });
        }
      );
    }
  };

  componentWillUnmount(): void {
    this.alive = false;
  }

  render() {
    const { username, password, loading, errors } = this.state;
    const formValid = this.isFormValid();

    return (
      <form className="form form__auth" onSubmit={this.onSubmit}>
        <h3>Signup</h3>
        <div className={"form__field"}>
          <InputWithLabel
            value={username}
            onChange={this.onChange}
            name={"username"}
            label={"Username"}
            type={"text"}
            disabled={loading}
            autoComplete="username"
            data-testid={"username"}
            required
          />
          {errors.username && (
            <p className={"form__field__error"}>{errors.username}</p>
          )}
        </div>
        <div className={"form__field"}>
          <InputWithLabel
            value={password}
            onChange={this.onChange}
            label={"Password"}
            name={"password"}
            type={"password"}
            autoComplete="new-password"
            disabled={loading}
            data-testid={"password"}
            required
          />
          {errors.password && (
            <p className={"form__field__error"}>{errors.password}</p>
          )}
        </div>
        <div className={"form__field"}>
          <button
            type={"submit"}
            className={"btn btn__success btn__submit"}
            disabled={loading || !formValid}
            data-testid={"btn_submit"}
          >
            {loading ? "Processing signup..." : "Sign up"}
          </button>
          <p className={"form__field__error"}>{errors.signup}</p>
        </div>
        <Link className={"dark-text"} to="/login" data-testid={"link"}>
          <small>Already have account? Login is here.</small>
        </Link>
      </form>
    );
  }
}

export default SignupForm;
