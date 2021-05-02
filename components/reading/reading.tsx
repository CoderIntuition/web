import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import Quiz from "react-quiz-component";
import {Button, Grid, GridRow, Header, Icon, Loader, Message, Segment} from "semantic-ui-react";
import MarkdownRender from "components/common/markdown-render/markdown-render";
import { withGlobalContext, wrapQuestions } from "common/utils";
import { constants } from "common/constants";
import { WhiteButton } from "common/global-styles";
import { CenteredDiv, LeftDiv, ReadingStyles } from "./reading-styles";
import Head from "next/head";
import { getCurrentUserToken } from "../../common/auth-service";

interface ReadingProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
}

interface Reading {
  id: number;
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
        this.completeReading();
      })
      .catch((_err) => {
        this.setState({
          loading: false,
        });
      });
  }

  completeReading() {
    if (!this.props.authenticated) return;

    const url = constants.ACTIVITY_URL;
    const token = getCurrentUserToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const request = {
      activityType: "COMPLETE_READING",
      readingId: this.state.reading?.id,
    };

    axios
      .post(url, request, config)
      .then((_res) => {
        console.log("Created activity");
      })
      .catch((error) => {
        console.log(error);
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
          <Message error>Error: Content not found.</Message>
          <Button primary onClick={() => router.back()}>
            Back
          </Button>
        </div>
      );
    }

    return (
      <>
        <Head>
          <title>{this.state.reading.name}</title>
          <meta charSet="utf-8" name="description" content={this.state.reading.name} />
          <link rel="canonical" href={"https://www.coderintuition.com/reading/" + this.props.router.query.urlName} />
        </Head>
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
            }}
          >
            <Header as="h1">{this.state.reading.name}</Header>
            {this.state.reading.isQuiz ? (
              <>
                {/*<Image src="/images/quiz.svg" alt="Quiz graphic" width="500px" height="500px"/>*/}
                <Quiz quiz={wrapQuestions(this.state.reading.content)} />
              </>
            ) : (
              <>
                <br />
                <ReadingStyles>
                  <MarkdownRender source={this.state.reading.content} />
                </ReadingStyles>
              </>
            )}
          </Segment>
          <Grid>
            <GridRow centered>
              <Button primary onClick={() => {this.props.router.push("/reading/why-should-i-use-a-learning-path")}}>Next Excercise</Button>
            </GridRow>
          </Grid>
        </CenteredDiv>
      </>
    );
  }
}

export default withRouter(withGlobalContext(Reading));
