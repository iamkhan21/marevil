import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import InputWithLabel from "../shared/forms/InputWithLabel";
import { debounce } from "../../utils/timings";
import {
  checkPasswordMinLength,
  checkUsernameMinLength,
} from "../../utils/validators";
import { generateCredentialError } from "./errors";
import FormField from "../shared/forms/FormField";
import Button from "../shared/Button";

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
  private formRef = React.createRef<HTMLFormElement>();
  private alive = true;
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
      this.formRef.current?.classList.remove("head-shake");
      this.setState({ loading: true });

      this.props.signUp(
        { username: username.trim(), password: password.trim() },
        (error) => {
          if (this.alive) {
            this.setState({
              loading: false,
              errors: { ...errors, signup: error || "" },
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
    const { username, password, loading, errors } = this.state;
    const formValid = this.isFormValid();

    return (
      <form
        className="form form__auth animated"
        onSubmit={this.onSubmit}
        ref={this.formRef}
        aria-labelledby="signup"
      >
        <h3 id="signup">Signup</h3>
        <FormField>
          <InputWithLabel
            value={username}
            onChange={this.onChange}
            disabled={loading}
            name="username"
            label="Username"
            type="text"
            autoComplete="username"
            data-testid="username"
            required
          />
          {errors.username && (
            <p className="form__field__error" role="alert">
              {errors.username}
            </p>
          )}
        </FormField>
        <FormField>
          <InputWithLabel
            value={password}
            onChange={this.onChange}
            disabled={loading}
            label="Password"
            name="password"
            type="password"
            autoComplete="new-password"
            data-testid="password"
            required
          />
          {errors.password && (
            <p className="form__field__error" role="alert">
              {errors.password}
            </p>
          )}
        </FormField>
        <FormField>
          <Button
            appearance="success"
            type="submit"
            className="btn__submit"
            disabled={loading || !formValid}
            data-testid="btn_submit"
          >
            {loading ? "Processing signup..." : "Sign up"}
          </Button>
          {errors.signup && (
            <p className="form__field__error" role="alert">
              {errors.signup}
            </p>
          )}
        </FormField>
        <Link className="dark-text" to="/login" data-testid="link">
          <small>Already have account? Login is here.</small>
        </Link>
      </form>
    );
  }
}

export default SignupForm;
