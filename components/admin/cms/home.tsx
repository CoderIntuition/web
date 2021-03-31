import React, { Component } from "react";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import { GridRow, Loader } from "semantic-ui-react";
import { isMod } from "common/auth-service";
import { withGlobalContext } from "common/utils";
import { StyledButton, StyledGrid } from "./home-styles";
import { Container, Heading, HeadingSection, Subheading } from "./list-styles";

type PropTypes = {
  router: NextRouter;
  contextLoading: boolean;
  authenticated: boolean;
  currentUser: any;
};

class Home extends Component<PropTypes, {}> {
  render() {
    if (this.props.contextLoading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    if (!this.props.authenticated || !isMod(this.props.currentUser.roles)) {
      this.props.router.push("/login");
      return null;
    }

    return (
      <Container>
        <HeadingSection>
          <Subheading>ADMIN</Subheading>
          <Heading>Control Panel</Heading>
        </HeadingSection>
        <StyledGrid>
          <GridRow centered>
            <Link href="/admin/cms/problems">
              <StyledButton primary>Problem CMS</StyledButton>
            </Link>
          </GridRow>
          <GridRow centered>
            <Link href="/admin/cms/readings">
              <StyledButton primary>Reading CMS</StyledButton>
            </Link>
          </GridRow>
        </StyledGrid>
      </Container>
    );
  }
}

export default withRouter(withGlobalContext(Home));
