import React, { Component } from "react";
import Link from "next/link";
import axios from "axios";
import { Button, Grid, GridRow, Header, Loader } from "semantic-ui-react";
import { constants } from "common/constants";
import { NextRouter, withRouter } from "next/router";

interface VerifyProps {
  router: NextRouter;
}

interface VerifyState {
  loading: boolean;
  name: string;
  status: string;
}

class Verify extends Component<VerifyProps, VerifyState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: "",
      status: "",
    };
  }

  componentDidMount() {
    const request = { uuid: this.props.router.query.uuid };
    axios.post(constants.VERIFY_EMAIL_URL, request).then((res) => {
      this.setState({
        loading: false,
        name: res.data.name,
        status: res.data.status,
      });
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
    return (
      <Grid style={{ margin: 20 }}>
        <GridRow centered>
          <Header as="h2">Email Verification</Header>
        </GridRow>
        <GridRow centered>
          <p>
            {this.state.status === "SUCCESS"
              ? "Thanks for verifying your email, " + this.state.name + "!"
              : this.state.status === "ALREADY"
              ? "You have already verified your email, " + this.state.name + "!"
              : "Email verification failed. Please click the button from the email you received."}
          </p>
        </GridRow>
        <GridRow centered>
          <Link href="/problems">
            <Button primary>Try Some Problems</Button>
          </Link>
        </GridRow>
      </Grid>
    );
  }
}

export default withRouter(Verify);
