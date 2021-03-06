import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import Link from "next/link";
import { constants, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "common/constants";
import { signup } from "common/auth-service";
import { showErrorToast, withGlobalContext } from "common/utils";
import Image from "next/image";
import AnimationRevealPage from "../common/helpers/animation-reveal-page";
import {
  Heading,
  OAuthButton,
  PromptText,
  Separator,
  SeparatorWrapper,
  StyledForm,
  StyledFormField,
  StyledGraphicColumn,
  StyledGrid,
  StyledLink,
  StyledSignUpButton,
  StyledSignUpInput,
  StyledTextColumn,
  Wrapper,
} from "./login-signup-styles";

interface SignupProps {
  router: NextRouter;
  loadCurrentUser: (string) => void;
}

interface SignupState {
  loading: boolean;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class Signup extends Component<SignupProps, SignupState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onChangeConfirmPassword = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  };

  handleRegister = (_e) => {
    if (!this.state.name) {
      showErrorToast("Error", "Please enter your name.");
      this.setState({ loading: false });
      return;
    }
    if (!this.state.email) {
      showErrorToast("Error", "Please enter your email.");
      this.setState({ loading: false });
      return;
    }
    if (!this.state.password) {
      showErrorToast("Error", "Please enter a password.");
      this.setState({ loading: false });
      return;
    }
    if (!this.state.confirmPassword) {
      showErrorToast("Error", "Please confirm your password.");
      this.setState({ loading: false });
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      showErrorToast("Error", "Your passwords do not match.");
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: true });

    const signupRequest = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    signup(signupRequest)
      .then((response) => {
        localStorage.setItem(constants.ACCESS_TOKEN, response.accessToken);
        this.setState({ loading: false });
        this.props.loadCurrentUser("SIGNUP");
        this.props.router.back();
      })
      .catch((error) => {
        showErrorToast(error.message, error.details && error.details.length > 0 ? error.details[0] + "" : "");
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <Wrapper>
        <StyledGrid columns={2} stackable>
          <StyledTextColumn textAlign="center" width={7}>
            <AnimationRevealPage>
              <>
                <Link href="/" passHref>
                  <a>
                    <Image src="/images/logoname.svg" alt="CoderIntuition logo" width="200px" height="46px" />
                  </a>
                </Link>
                <Heading>Sign Up</Heading>
                <StyledForm onSubmit={this.handleRegister}>
                  <StyledFormField>
                    <StyledSignUpInput
                      type="text"
                      width={16}
                      onChange={this.onChangeName}
                      value={this.state.name}
                      placeholder="Name"
                    />
                    <StyledSignUpInput
                      type="text"
                      width={16}
                      onChange={this.onChangeEmail}
                      value={this.state.email}
                      placeholder="Email"
                    />
                    <StyledSignUpInput
                      type="password"
                      width={16}
                      onChange={this.onChangePassword}
                      value={this.state.password}
                      placeholder="Password"
                    />
                    <StyledSignUpInput
                      type="password"
                      width={16}
                      onChange={this.onChangeConfirmPassword}
                      value={this.state.confirmPassword}
                      placeholder="Confirm Password"
                    />
                    {this.state.loading ? (
                      <StyledSignUpButton content="Sign Up" primary loading disabled />
                    ) : (
                      <StyledSignUpButton content="Sign Up" type="submit" primary />
                    )}
                  </StyledFormField>
                </StyledForm>
                <SeparatorWrapper>
                  <Separator>or continue with</Separator>
                </SeparatorWrapper>
                <div>
                  <OAuthButton href={GOOGLE_AUTH_URL} icon>
                    <Image src="/images/google-logo.png" alt="Google logo" width="40px" height="40px" />
                  </OAuthButton>
                  <OAuthButton href={FACEBOOK_AUTH_URL} icon>
                    <Image src="/images/fb-logo.png" alt="Google logo" width="40px" height="40px" />
                  </OAuthButton>
                  <OAuthButton href={GITHUB_AUTH_URL} icon>
                    <Image src="/images/github-logo.png" alt="Google logo" width="40px" height="40px" />
                  </OAuthButton>
                </div>
                <PromptText>
                  Already have an account? &nbsp;
                  <Link href="/login" passHref>
                    <StyledLink>Log in</StyledLink>
                  </Link>
                </PromptText>
              </>
            </AnimationRevealPage>
          </StyledTextColumn>
          <StyledGraphicColumn width={9}>
            <Image src="/images/signup.svg" width="350px" height="350px" />
          </StyledGraphicColumn>
        </StyledGrid>
      </Wrapper>
    );
  }
}

export default withRouter(withGlobalContext(Signup));
