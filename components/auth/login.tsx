import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Button, Form, Grid, GridColumn, GridRow, Input, Modal } from "semantic-ui-react";
import { constants, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, GOOGLE_AUTH_URL } from "common/constants";
import { login } from "common/auth-service";
import { showErrorToast, showSuccessToast, withGlobalContext } from "common/utils";
import { GrayButton } from "common/global-styles";
import {
  EmailLabel,
  ForgotPassword,
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
  StyledLoginInput,
  StyledSignInButton,
  StyledTextColumn,
  Wrapper,
} from "./login-signup-styles";
import AnimationRevealPage from "../common/helpers/animation-reveal-page";

interface LoginProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
  loadCurrentUser: (string) => void;
}

interface LoginState {
  loading: boolean;
  email: string;
  password: string;
  forgotPasswordModalOpen: boolean;
  forgotPasswordEmail: string;
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      password: "",
      forgotPasswordModalOpen: false,
      forgotPasswordEmail: "",
    };
  }

  componentDidMount() {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error
    // Here we display the error and then remove the error query parameter from the location.
    const error = this.props.router.query.error;
    if (error) {
      showErrorToast("Authentication Error", error);
    }
  }

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

  handleForgotPassword() {
    if (!this.state.forgotPasswordEmail) {
      showErrorToast("Error", "Please enter your email");
      return;
    }
    axios
      .post(constants.RESET_PASSWORD_REQUEST_URL, {
        email: this.state.forgotPasswordEmail,
      })
      .then(() => {
        showSuccessToast("Success", "Check your email to reset your password.");
        this.setState({
          forgotPasswordModalOpen: false,
          forgotPasswordEmail: "",
        });
      })
      .catch((err) => {
        showErrorToast(err.response.data.message, err.response.data.details[0]);
      });
  }

  handleLogin = (_e) => {
    if (!this.state.email) {
      showErrorToast("Error", "Please enter your email.");
      this.setState({ loading: false });
      return;
    }
    if (!this.state.password) {
      showErrorToast("Error", "Please enter your password.");
      this.setState({ loading: false });
      return;
    }

    this.setState({ loading: true });

    const loginRequest = {
      email: this.state.email,
      password: this.state.password,
    };

    login(loginRequest)
      .then((response) => {
        localStorage.setItem(constants.ACCESS_TOKEN, response.accessToken);
        this.props.loadCurrentUser("LOGIN");
        const lastUrl = localStorage.getItem(constants.LAST_URL);
        this.props.router.push(lastUrl ? lastUrl : "/");
      })
      .catch((error) => {
        showErrorToast(error.message, error.details[0]);
        this.setState({ loading: false });
      });
  };

  render() {
    const { currentUser, router } = this.props;

    if (currentUser != null) {
      router.push("/");
      return null;
    }

    return (
      <Wrapper>
        <StyledGrid columns={2} style={{ minWidth: 1000 }} stackable>
          <StyledTextColumn textAlign="center" width={7}>
            <AnimationRevealPage>
              <>
                <Link href="/" passHref>
                  <a>
                    <Image src="/images/logoname.svg" alt="CoderIntuition logo" width="200px" height="46px" />
                  </a>
                </Link>
                <Heading>Log In</Heading>
                <StyledForm onSubmit={this.handleLogin}>
                  <StyledFormField>
                    <StyledLoginInput
                      type="text"
                      width={16}
                      onChange={this.onChangeEmail}
                      value={this.state.email}
                      placeholder="Email"
                    />
                    <StyledLoginInput
                      type="password"
                      width={16}
                      onChange={this.onChangePassword}
                      value={this.state.password}
                      placeholder="Password"
                    />
                    {this.state.loading ? (
                      <StyledSignInButton content="Log In" primary loading disabled />
                    ) : (
                      <StyledSignInButton content="Log In" type="submit" primary />
                    )}
                  </StyledFormField>
                </StyledForm>
                <ForgotPassword>
                  <StyledLink onClick={() => this.setState({ forgotPasswordModalOpen: true })}>
                    Forgot Password?
                  </StyledLink>
                  <Modal
                    closeOnEscape={true}
                    closeOnDimmerClick={false}
                    open={this.state.forgotPasswordModalOpen}
                    onClose={() => this.setState({ forgotPasswordModalOpen: false })}
                    size="tiny"
                  >
                    <Modal.Header>Forgot your password?</Modal.Header>
                    <Modal.Content>
                      <p>
                        Enter your email and we'll send you a link to reset your password if an account with that email
                        exists.
                      </p>
                      <br />
                      <Form style={{ marginInline: 10 }}>
                        <Grid>
                          <GridRow>
                            <GridColumn>
                              <EmailLabel>Email</EmailLabel>
                              <Input
                                onChange={(e) => {
                                  this.setState({
                                    forgotPasswordEmail: e.target.value,
                                  });
                                }}
                                fluid
                              />
                            </GridColumn>
                          </GridRow>
                        </Grid>
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <GrayButton onClick={() => this.setState({ forgotPasswordModalOpen: false })}>Cancel</GrayButton>
                      <Button primary onClick={() => this.handleForgotPassword()}>
                        Submit
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </ForgotPassword>
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
                  Don't have an account? &nbsp;
                  <Link href="/signup" passHref>
                    <StyledLink>Sign up</StyledLink>
                  </Link>
                </PromptText>
              </>
            </AnimationRevealPage>
          </StyledTextColumn>
          <StyledGraphicColumn width={9}>
            <Image src="/images/login.svg" width="450px" height="450px" />
          </StyledGraphicColumn>
        </StyledGrid>
      </Wrapper>
    );
  }
}

export default withRouter(withGlobalContext(Login));
