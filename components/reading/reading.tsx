import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import Quiz from "react-quiz-component";
import { Button, Header, Icon, Loader, Message, Segment } from "semantic-ui-react";
import MarkdownRender from "components/common/markdown-render/markdown-render";
import { withGlobalContext, wrapQuestions } from "common/utils";
import { constants } from "common/constants";
import { WhiteButton } from "common/global-styles";
import { CenteredDiv, LeftDiv, ReadingStyles } from "./reading-styles";

interface ReadingProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
}

interface Reading {
  name: string;
  isQuiz: boolean;
  content: string;
}

interface ReadingState {
  loading: boolean;
  reading?: Reading;
}

class Reading extends Component<ReadingProps, ReadingState> {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      reading: undefined,
    };
  }

  componentDidMount() {
    axios
      .get(constants.READING_URL + this.props.router.query.urlName)
      .then((res) => {
        this.setState({
          reading: res.data,
          loading: false,
        });
      })
      .catch((_err) => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    const { router } = this.props;

    if (this.state.loading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    if (!this.state.reading) {
      return (
        <div
          style={{
            width: 400,
            margin: "0 auto",
            marginTop: 10,
            padding: 30,
            textAlign: "center",
          }}
        >
          <Message error>Error: Reading not found.</Message>
          <Button primary onClick={() => router.back()}>
            Back
          </Button>
        </div>
      );
    }

    return (
      <>
        <CenteredDiv>
          <LeftDiv>
            <WhiteButton icon onClick={() => router.push("/learning-path/beginner-path")}>
              <Icon name="chevron left" />
            </WhiteButton>
          </LeftDiv>
          <Segment
            raised
            style={{
              padding: 30,
              borderRadius: 30,
              minHeight: "calc(100vh - 150px)",
            }}
          >
            <Header as="h1">{this.state.reading.name}</Header>
            <br />
            {this.state.reading.isQuiz ? (
              <Quiz quiz={wrapQuestions(this.state.reading.content)} />
            ) : (
              <ReadingStyles>
                <MarkdownRender source={this.state.reading.content} />
              </ReadingStyles>
            )}
          </Segment>
        </CenteredDiv>
      </>
    );
  }
}

export default withRouter(withGlobalContext(Reading));
