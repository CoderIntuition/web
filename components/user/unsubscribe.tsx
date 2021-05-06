import axios from "axios";
import { constants } from "common/constants";
import { YellowButton } from "common/global-styles";
import { showErrorToast } from "common/utils";
import { NextRouter, withRouter } from "next/router";
import React, { Component } from "react";
import { Grid, GridRow, Header, Message } from "semantic-ui-react";

interface UnsubscribeProps {
  router: NextRouter;
}

interface UnsubscribeState {
  unsubscribing: boolean;
  unsubscribed: boolean;
}

class Unsubscribe extends Component<UnsubscribeProps, UnsubscribeState> {
  constructor(props) {
    super(props);

    this.state = {
      unsubscribing: false,
      unsubscribed: false
    };
  }

  handleUnsubscribe() {
    if (this.state.unsubscribing) {
      return;
    }

    this.setState({ unsubscribing: true });

    axios.post(constants.UNSUBSCRIBE_URL + this.props.router.query.uuid).then((_res) => {
      this.setState({
        unsubscribing: false,
        unsubscribed: true
      });
    }).catch((_err) => {
      showErrorToast("Error", "Unsubscribe failed. Please click the link in your email again or contact support.")
      this.setState({ unsubscribing: false });
    });
  }

  render() {
    return (
      <Grid style={{ margin: 20 }}>
        <GridRow centered>
          <Header as="h2">Email Unsubscribe</Header>
        </GridRow>
        <GridRow centered>
          <p>
            Click below to unsubscribe to all CoderIntuition marketing emails including daily problem emails.<br />
            You will continue to receive essential user-related emails.
          </p>
        </GridRow>
        <GridRow centered>
          {this.state.unsubscribed ?
            <Message positive>
              You have been unsubscribed to all CoderIntuition marketing emails.
            </Message>
            :
            <YellowButton loading={this.state.unsubscribing} onClick={() => this.handleUnsubscribe()}>
              Unsubscribe
            </YellowButton>
          }
        </GridRow>
      </Grid>
    );
  }
}

export default withRouter(Unsubscribe);
