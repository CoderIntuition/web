import React, { Component } from "react";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import {
  Button,
  Divider,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Input,
  Loader,
  Message,
  Radio,
  Segment,
  TextArea,
} from "semantic-ui-react";
import Quiz from "react-quiz-component";
import { getCurrentUserToken, isMod } from "common/auth-service";
import MarkdownRender from "components/common/markdown-render/markdown-render";
import { constants } from "common/constants";
import { GrayButton, RedButton } from "common/global-styles";
import { isJsonArray, withGlobalContext, wrapQuestions } from "common/utils";
import AceEditor from "components/common/ace-editor/ace-editor";
import { Label, RadioDiv, RadioLeftLabel, RadioRightLabel, StyledGrid, StyledSegment } from "./add-styles";

interface ReadingAddProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
}

class ReadingAdd extends Component<ReadingAddProps> {
  state = {
    preLoading: true,
    name: "",
    urlName: "",
    plusOnly: false,
    isQuiz: false,
    content: "",
    loading: false,
    submitStatus: "",
    message: {} as any,
  };

  async componentDidMount() {
    const id = this.props.router.query.id;

    if (id) {
      // edit
      const url = constants.CMS_READING_URL + "id/" + id;
      const config = {
        headers: {
          Authorization: `Bearer ${getCurrentUserToken()}`,
        },
      };

      axios.get(url, config).then((res) => {
        const data = res.data;

        this.setState({
          preLoading: false,
          name: data.name,
          urlName: data.urlName,
          plusOnly: data.plusOnly,
          isQuiz: data.isQuiz,
          content: data.content,
        });
      });
    } else {
      this.setState({
        preLoading: false,
      });
    }
  }

  handleSubmit() {
    const id = this.props.router.query.id;

    if (this.state.submitStatus === "loading") {
      return;
    }

    this.setState({
      submitStatus: "loading",
    });

    const body = {
      name: this.state.name,
      urlName: this.state.urlName,
      plusOnly: this.state.plusOnly,
      isQuiz: this.state.isQuiz,
      content: this.state.content,
    };

    let request: {};
    let url = constants.CMS_READING_URL;
    if (id) {
      // edit
      request = {
        id: id,
        reading: body,
      };
      url += "update";
    } else {
      request = body;
      url += "add";
    }

    const token = getCurrentUserToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(url, request, config)
      .then((res) => {
        this.setState({
          submitStatus: "success",
          message: res.data,
        });
      })
      .catch((error) => {
        const data = error.response.data;
        this.setState({
          submitStatus: "error",
          message: data,
        });
      });
  }

  render() {
    const { router } = this.props;

    if (this.state.preLoading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    if (!this.props.authenticated || !isMod(this.props.currentUser.roles)) {
      router.push("/login");
      return null;
    }

    return (
      <>
        <Form>
          <StyledGrid>
            <GridRow centered>
              <Header as="h1">{router.query.id ? "CMS: Edit Reading" : "CMS: Add New Reading"}</Header>
            </GridRow>
            <Divider />
            {/* ----- PROBLEM INFO ----- */}
            <GridRow>
              <StyledSegment raised>
                <Grid stackable>
                  <GridRow centered>
                    <Header>Reading Info</Header>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={5}>
                      <Label>Name</Label>
                      <Input
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                        fluid
                      />
                    </GridColumn>
                    <GridColumn width={5}>
                      <Label>URL Name</Label>
                      <Input
                        value={this.state.urlName}
                        onChange={(e) => {
                          this.setState({ urlName: e.target.value });
                        }}
                        fluid
                      />
                    </GridColumn>
                    <GridColumn width={3}>
                      <Label>Plus Only</Label>
                      <RadioDiv>
                        <RadioLeftLabel>No</RadioLeftLabel>
                        <Radio
                          toggle
                          checked={this.state.plusOnly}
                          onChange={() => this.setState({ plusOnly: !this.state.plusOnly })}
                        />
                        <RadioRightLabel>Yes</RadioRightLabel>
                      </RadioDiv>
                    </GridColumn>
                    <GridColumn width={3}>
                      <Label>Is Quiz?</Label>
                      <RadioDiv>
                        <RadioLeftLabel>No</RadioLeftLabel>
                        <Radio
                          toggle
                          checked={this.state.isQuiz}
                          onChange={() => this.setState({ isQuiz: !this.state.isQuiz })}
                        />
                        <RadioRightLabel>Yes</RadioRightLabel>
                      </RadioDiv>
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={8}>
                      <Label>Content</Label>
                      {this.state.isQuiz ? (
                        <AceEditor
                          width="100%"
                          height="550px"
                          mode="json"
                          theme="xcode"
                          value={this.state.content}
                          onChange={(newValue) => this.setState({ content: newValue })}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            tabSize: 2,
                            useWorker: false,
                          }}
                        />
                      ) : (
                        <TextArea
                          value={this.state.content}
                          rows={20}
                          onChange={(e, { value }) => {
                            this.setState({ content: value });
                          }}
                        />
                      )}
                    </GridColumn>
                    <GridColumn width={8}>
                      <Label>Content Preview</Label>
                      <Segment raised>
                        {this.state.isQuiz ? (
                          isJsonArray(this.state.content) ? (
                            <Quiz quiz={wrapQuestions(this.state.content)} />
                          ) : (
                            <div>Quiz not formatted properly</div>
                          )
                        ) : (
                          <MarkdownRender source={this.state.content} />
                        )}
                      </Segment>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </StyledSegment>
            </GridRow>
            <Divider />
            {this.state.submitStatus && this.state.submitStatus !== "loading" && (
              <GridRow centered>
                {this.state.submitStatus === "success" ? (
                  <Message positive>{this.state.message.message}</Message>
                ) : (
                  <Message negative header={this.state.message.message} list={this.state.message.details} />
                )}
              </GridRow>
            )}
            {this.state.submitStatus === "success" && !router.query.id ? (
              <GridRow centered>
                <Link href="/admin/cms/readings">
                  <Button primary>Back</Button>
                </Link>
              </GridRow>
            ) : (
              <GridRow centered>
                <Link href="/admin/cms/readings">
                  <RedButton>{router.query.id ? "Back" : "Cancel"}</RedButton>
                </Link>
                {router.query.id && (
                  <GrayButton
                    onClick={() => window.open(constants.WEB_BASE_URL + "/reading/" + this.state.urlName, "_blank")}
                  >
                    Preview
                  </GrayButton>
                )}
                <Button primary loading={this.state.submitStatus === "loading"} onClick={() => this.handleSubmit()}>
                  Save Reading
                </Button>
              </GridRow>
            )}
          </StyledGrid>
        </Form>
      </>
    );
  }
}

export default withRouter(withGlobalContext(ReadingAdd));
