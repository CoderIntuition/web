import React, { Component } from "react";
import axios from "axios";
import { Button, Form, Grid, GridColumn, GridRow, Header, Input, Loader, Message } from "semantic-ui-react";
import { constants } from "common/constants";
import { showErrorToast, showSuccessToast } from "common/utils";
import { NextRouter, withRouter } from "next/router";
import { Label } from "../../common/global-styles";

interface ResetPasswordProps {
  router: NextRouter;
}

interface ResetPasswordState {
  loading: boolean;
  error: string;
  newPassword: string;
  confirmNewPassword: string;
  saving: boolean;
}

class ResetPassword extends Component<ResetPasswordProps, ResetPasswordState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      error: "",
      newPassword: "",
      confirmNewPassword: "",
      saving: false,
    };
  }

  state = {
    loading: true,
    error: "",
    newPassword: "",
    confirmNewPassword: "",
    saving: false,
  };

  componentDidMount() {
    const url = constants.RESET_PASSWORD_VALIDATE_URL + this.props.router.query.token;
    axios
      .get(url)
      .then(() => {
        this.setState({
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
          error: err.response.data.message + ": " + err.response.data.details[0],
        });
      });
  }

  handleSaveNewPassword() {
    if (this.state.saving) {
      return;
    }

    this.setState({ saving: true });

    axios
      .post(constants.RESET_PASSWORD_SAVE_URL, {
        token: this.props.router.query.token,
        newPassword: this.state.newPassword,
      })
      .then(() => {
        this.setState({
          saving: false,
        });
        showSuccessToast("Success", "You may now log in with your new password.");
        this.props.router.push("/login");
      })
      .catch((err) => {
        showErrorToast(err.response.data.message, err.response.data.details[0]);
        this.setState({
          saving: false
        })
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    if (this.state.error) {
      return (
        <Grid style={{ margin: 20 }}>
          <GridRow centered>
            <Header as="h2">Reset Your Password</Header>
          </GridRow>
          <GridRow centered>
            <Message error>{this.state.error}</Message>
          </GridRow>
        </Grid>
      );
    }

    return (
      <Grid style={{ margin: 20 }}>
        <GridRow centered>
          <Header as="h2">Reset Your Password</Header>
        </GridRow>
        <GridRow centered>
          <Form style={{ marginInline: 10 }}>
            <Grid>
              <GridRow>
                <GridColumn>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => {
                      this.setState({ newPassword: e.target.value });
                    }}
                    fluid
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    onChange={(e) => {
                      this.setState({ confirmNewPassword: e.target.value });
                    }}
                    fluid
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Form>
        </GridRow>
        <GridRow centered>
          <Button primary loading={this.state.saving} onClick={() => this.handleSaveNewPassword()}>
            Save New Password
          </Button>
        </GridRow>
      </Grid>
    );
  }
}

export default withRouter(ResetPassword);
