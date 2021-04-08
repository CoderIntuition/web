import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import { Client } from "@stomp/stompjs";
import _ from "lodash";
import Timer from "react-compound-timer";
import dynamic from "next/dynamic";
import { SplitterLayoutProps } from "react-splitter-layout";
import {
  Button,
  Dropdown,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Icon,
  Input,
  Loader,
  MenuMenu,
  Message,
  Modal,
  Popup,
  TextArea,
} from "semantic-ui-react";
import InfoContent from "./info-content";
import TestContent from "./test-content";
import "react-splitter-layout/lib/index.css";
import AceEditor from "components/common/ace-editor/ace-editor";
import "react-quill/dist/quill.snow.css";
import { constants } from "common/constants";
import { getCurrentUserToken } from "common/auth-service";
import {
  showDefaultToast,
  showErrorToast,
  showLongErrorToast,
  showSuccessToast,
  showWarningToast,
  withGlobalContext,
} from "common/utils";
import { GrayButton } from "common/global-styles";
import {
  BottomBar,
  BottomLeftButton,
  BottomRightButton,
  ContentSegment,
  EditorWrapper,
  FlexDiv,
  InfoContentWrapper,
  InfoDiv,
  Label,
  OuterPaddingDiv,
  RightSubMenu,
  RunButton,
  SplitterVerticalDiv,
  StyledAlertTriangle,
  StyledDropdown,
  StyledDropdownItem,
  StyledDropdownMenu,
  StyledEditor,
  StyledMenu,
  StyledMenuItem,
  StyledMoon,
  TestContentWrapper,
} from "./problem-styles";

const ReactQuill = dynamic<any>(
  async () => {
    return await import("react-quill");
  },
  {
    loading: () => <></>,
    ssr: false,
  }
);

const SplitterLayout = dynamic<SplitterLayoutProps>(
  async () => {
    return (await import("react-splitter-layout")) as any;
  },
  {
    loading: () => <></>,
    ssr: false,
  }
);

const withTimer = (timerProps) => (WrappedComponent) => (wrappedComponentProps) => (
  <Timer {...timerProps}>
    {(timerRenderProps) => <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
  </Timer>
);

interface ProblemProps {
  router: NextRouter;
  timer: any;
  darkMode: number;
  authenticated: boolean;
  currentUser: any;
  setDarkMode: (value: number) => void;
}

class Problem extends Component<ProblemProps> {
  state = {
    windowHeight: -1,
    windowWidth: -1,
    verticalPaneSize: -1,
    horizontalPaneSize: -1,
    loading: true,
    problem: {} as any,
    infoTab: "description",
    step: -1,
    intuitionCompleted: false,
    code: {
      python: "",
      java: "",
      javascript: "",
    },
    editorTab: "code",
    docsValue: "Did you know that many companies including <b>Google</b> make you do " +
      "your coding interview on a <b>whiteboard</b> or a <b>Google Doc</b>? Try writing your " +
      "code here instead of in the editor so you don't get caught by surprise!" +
      "<br/><br/><u>My Notes</u><br/><br/><br/><br/><u>My Code</u><br/><br/>" +
      "<br/><br/><u>Time and Space Complexity</u><br/><br/><br/><br/><br/>",
    language: "PYTHON",
    testTab: "input",
    running: false,
    testRunToken: "",
    testInput: "",
    testStatus: "",
    testStdout: "",
    testOutput: "",
    testExpectedOutput: "",
    testStderr: "",
    submitting: false,
    submissionToken: "",
    submission: {} as any,
    submissions: [] as any,
    signupModalOpen: false,
    issueModalOpen: false,
    issueFormEmail: this.props.authenticated ? this.props.currentUser.email : "",
    issueFormCategory: "",
    issueFormDescription: "",
  };

  constructor(props) {
    super(props);
    this.onHorizontalChange = this.onHorizontalChange.bind(this);
    this.onVerticalChange = this.onVerticalChange.bind(this);
  }

  resize = () => {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
    this.forceUpdate();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.resize);
  }

  client;

  setupWebSocket() {
    this.client = new Client();

    this.client = new Client({
      brokerURL: constants.STOMP_BASE_URL,
      reconnectDelay: 1000,
      heartbeatOutgoing: 10000,
      heartbeatIncoming: 10000,
    });

    this.client.onConnect = (_frame) => {
      // listen for submissions
      this.client.subscribe("/topic/submission", (message) => {
        // if token matches call api with auth to get submission data
        if (message.body === this.state.submissionToken) {
          const url = constants.SUBMISSION_URL + "/" + this.state.submissionToken;
          const config = {
            headers: {
              Authorization: `Bearer ${getCurrentUserToken()}`,
            },
          };
          axios.get(url, config).then((res) => {
            this.setState({
              submitting: false,
              submissionToken: "",
              testTab: "submission",
              submission: res.data,
            });
            this.getSubmissions(this.state.problem.id);
          });
        }
      });

      // listen for test runs
      this.client.subscribe("/topic/testrun", (message) => {
        const testRunData = JSON.parse(message.body);
        // if token matches set the test run data
        if (testRunData.token === this.state.testRunToken) {
          this.setState({
            running: false,
            testRunToken: "",
            testTab: "testResult",
            testStatus: testRunData.status,
            testStderr: testRunData.stderr,
            testStdout: testRunData.stdout,
            testOutput: testRunData.output,
            testExpectedOutput: testRunData.expectedOutput,
          });
        }
      });
    }

    this.client.onStompError = (frame) => {
      console.log('Broker reported error: ' + frame.headers['message']);
      console.log('Additional details: ' + frame.body);
    }

    this.client.activate();
  }

  componentDidMount() {
    this.setState({
      windowHeight: window.innerHeight,
      windowWidth: window.innerWidth,
    });
    window.addEventListener("resize", this.resize);

    axios
      .get(constants.PROBLEM_URL + this.props.router.query.urlName)
      .then((res) => {
        const localStorageCode = localStorage.getItem("problem_" + res.data.id);
        if (localStorageCode) {
          res.data.code = JSON.parse(localStorageCode);
        }

        this.setState({
          loading: false,
          problem: res.data,
          code: localStorageCode
            ? JSON.parse(localStorageCode)
            : {
                python: res.data.pythonCode,
                java: res.data.javaCode,
                javascript: res.data.javascriptCode,
              },
          testInput: res.data.defaultTestCase.input,
        });

        this.setupWebSocket();
        this.getSubmissions(res.data.id);
      })
      .catch((_err) => {
        this.setState({
          loading: false,
        });
      });
  }

  onVerticalChange(verticalPaneSize) {
    this.setState({ verticalPaneSize });
  }

  onHorizontalChange(horizontalPaneSize) {
    this.setState({ horizontalPaneSize });
  }

  getSubmissions(id) {
    if (this.props.authenticated) {
      const config = {
        headers: {
          Authorization: `Bearer ${getCurrentUserToken()}`,
        },
      };

      axios.get(constants.USER_SUBMISSIONS_URL + id, config).then((res) => {
        this.setState({
          submissions: res.data,
        });
      });
    }
  }

  handleInfoTabClick = (tab) => this.setState({ infoTab: tab });

  handleEditorTabClick = (tab) => this.setState({ editorTab: tab });

  handleLanguageClick = (language) => this.setState({ language: language });

  handleTestTabClick = (tab) => this.setState({ testTab: tab });

  setTimer(step) {
    const { setTime, setCheckpoints, start } = this.props.timer;

    console.log(this.state.problem.problemSteps[step - 1]);
    setTime(this.state.problem.problemSteps[step - 1].time * 60 * 1000);
    setCheckpoints([
      {
        time: (this.state.problem.problemSteps[step - 1].time * 60 * 1000) / 2,
        callback: () => {
          if (this.state.step === step && this.state.problem.problemSteps[step - 1].time > 3) {
            const halfTime = this.state.problem.problemSteps[step - 1].time / 2;
            showDefaultToast("Suggested Time", halfTime + " minute" + (halfTime === 1 ? "" : "s") + " left.");
          }
        },
      },
      {
        time: 60000,
        callback: () => {
          if (this.state.step === step) {
            showWarningToast("Suggested Time", "1 minute left.");
          }
        },
      },
      {
        time: 0,
        callback: () => {
          if (this.state.step === step) {
            showLongErrorToast(
              "Suggested Time Elapsed",
              "If you are still stuck, we recommend continuing on to the next intuition step."
            );
          }
        },
      },
    ]);
    start();
  }

  handleLearnIntuitionClick = () => {
    if (this.props.authenticated) {
      const url = constants.ACTIVITY_URL;
      const token = getCurrentUserToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const request = {
        activityType: "LEARN_INTUITION",
        problemId: this.state.problem.id,
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

    this.setTimer(1);
    this.setState({ step: 1, infoTab: "intuition" });
  };

  tooSoon() {
    return (
      this.state.problem.problemSteps[this.state.step - 1].time > 0 &&
      this.state.problem.problemSteps[this.state.step - 1].time * 60 - this.props.timer.getTime() / 1000 < 10
    );
  }

  doneStepClick = () => {
    if (this.tooSoon()) {
      showWarningToast("Warning", "Try the Intuition Step first!");
      return;
    }

    this.setTimer(this.state.step + 1);
    this.setState({ step: this.state.step + 1, infoTab: "intuition" });
  };

  viewSolutionClick = () => {
    if (this.tooSoon()) {
      showWarningToast("Warning", "Try the Intuition Step first!");
      return;
    }

    this.props.timer.stop();
    this.setState({ step: -1, intuitionCompleted: true, infoTab: "solution" });
  };

  codeEditorChange = (newValue) => {
    let code = this.state.code;
    code[this.state.language.toLowerCase()] = newValue;
    this.setState({ code: code });
  };

  handleTestRunClick() {
    if (this.state.running) {
      return;
    }

    const request = {
      problemId: this.state.problem.id,
      input: this.state.testInput,
      code: this.state.code[this.state.language.toLowerCase()],
      language: this.state.language,
    };

    this.setState({ running: true, testTab: "testResult" });

    axios.post(constants.TEST_RUN_URL, request).then((res) => {
      this.setState({ testRunToken: res.data.token });
    });
  }

  handleSubmitClick() {
    if (!this.props.authenticated) {
      this.setState({ signupModalOpen: true });
      return;
    }

    if (this.state.submitting) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getCurrentUserToken()}`,
      },
    };
    const request = {
      userId: this.props.currentUser.id,
      problemId: this.state.problem.id,
      code: this.state.code[this.state.language.toLowerCase()],
      language: this.state.language,
    };

    this.setState({ submitting: true, testTab: "submission" });

    axios.post(constants.SUBMISSION_URL, request, config).then((res) => {
      this.setState({ submissionToken: res.data.token });
    });
  }

  handleTestInputChange = (newValue) => {
    this.setState({ testInput: newValue });
  };

  handleLogin() {
    localStorage.setItem(constants.LAST_URL, this.props.router.asPath);
    localStorage.setItem("problem_" + this.state.problem.id, JSON.stringify(this.state.code));
    this.props.router.push("/login");
  }

  handleSignUp() {
    localStorage.setItem(constants.LAST_URL, this.props.router.asPath as string);
    localStorage.setItem("problem_" + this.state.problem.id, JSON.stringify(this.state.code));
    this.props.router.push("/signup");
  }

  handleIssueFormSubmit() {
    if (
      this.state.issueFormEmail === "" ||
      this.state.issueFormCategory === "" ||
      this.state.issueFormDescription === ""
    ) {
      showErrorToast("Error", "Please fill out all of the fields.");
      return;
    }
    const request = {
      problemId: this.state.problem.id,
      email: this.state.issueFormEmail,
      category: this.state.issueFormCategory,
      description: this.state.issueFormDescription,
    };
    axios
      .post(constants.ISSUE_URL, request)
      .then((_res) => {
        this.setState({ issueModalOpen: false });
        showSuccessToast("Success", "Your issue has been submitted. We will get back to you within 24 hours.");
      })
      .catch((error) => {
        showLongErrorToast(error.response.data.message, error.response.data.details[0]);
      });
  }

  languageEnumToText(lang) {
    if (lang === "PYTHON") {
      return "Python 3";
    } else if (lang === "JAVA") {
      return "Java";
    } else if (lang === "JAVASCRIPT") {
      return "JavaScript";
    }
    return "";
  }

  issueItems = [
    { value: "TYPO", text: "Typo" },
    { value: "FUNCTIONALITY", text: "Functionality not working" },
    { value: "VISUAL", text: "Visual glitch" },
    { value: "ERROR", text: "Error message" },
    { value: "RUN", text: "Code won't run or submit" },
    { value: "TEST", text: "Incorrect test case" },
    { value: "OTHER", text: "Other" },
  ];

  render() {
    if (this.state.loading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    if (_.isEmpty(this.state.problem)) {
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
          <Message error>Error: Problem not found.</Message>
          <Button primary onClick={() => this.props.router.back()}>
            Back
          </Button>
        </div>
      );
    }

    const contactModal = (
      <Modal
        closeOnEscape={true}
        closeOnDimmerClick={false}
        open={this.state.issueModalOpen}
        onClose={() => this.setState({ issueModalOpen: false })}
      >
        <Modal.Header>Report an Issue</Modal.Header>
        <Modal.Content>
          <p>
            Found an issue with our website or this problem? Submit this form and a member of our team will reach out to
            you via email within 24 hours to help you resolve it or ask for more information.
          </p>
          <br />
          <Form style={{ margin: 10 }}>
            <Grid>
              <GridRow>
                <GridColumn>
                  <Label>Problem</Label>
                  <Input value={this.state.problem.name} fluid />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <Label>Email</Label>
                  <Input
                    value={this.state.issueFormEmail}
                    onChange={(e) => {
                      this.setState({
                        issueFormEmail: e.target.value,
                      });
                    }}
                    fluid
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <Label>Issue Category</Label>
                  <Dropdown
                    options={this.issueItems}
                    onChange={(event, data) => {
                      this.setState({
                        issueFormCategory: data.value,
                      });
                    }}
                    selection
                    fluid
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <Label>Issue Description</Label>
                  <TextArea
                    onChange={(e, { value }) => {
                      this.setState({
                        issueFormDescription: value,
                      });
                    }}
                    fluid={1}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <GrayButton onClick={() => this.setState({ issueModalOpen: false })}>Cancel</GrayButton>
          <Button primary onClick={() => this.handleIssueFormSubmit()}>
            Submit
          </Button>
        </Modal.Actions>
      </Modal>
    );

    const infoContent = (
      <OuterPaddingDiv>
        <ContentSegment height={this.state.windowHeight - 140} raised>
          <StyledMenu dark={this.props.darkMode} attached="top" tabular>
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.infoTab === "description"}
              onClick={() => this.handleInfoTabClick("description")}
              name="Description"
            />
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.infoTab === "intuition"}
              onClick={() => this.handleInfoTabClick("intuition")}
              name="Intuition"
            />
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.infoTab === "solution"}
              onClick={() => this.handleInfoTabClick("solution")}
              name="Solution"
            />
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.infoTab === "submissions"}
              onClick={() => this.handleInfoTabClick("submissions")}
              name="Submissions"
            />
            <MenuMenu position="right">
              <div style={{ margin: "auto", width: 35 }}>
                <Popup
                  basic
                  hoverable
                  content="Report an Issue"
                  position="bottom left"
                  trigger={
                    <StyledAlertTriangle
                      size={25}
                      strokeWidth={1.5}
                      onClick={() => this.setState({ issueModalOpen: true })}
                      dark={this.props.darkMode}
                    />
                  }
                />
                {contactModal}
              </div>
              <div style={{ margin: "auto", width: 35 }}>
                <Popup
                  basic
                  hoverable
                  content={"Turn " + (this.props.darkMode ? "Off" : "On") + " Dark Mode"}
                  position="bottom left"
                  trigger={
                    <StyledMoon
                      size={25}
                      strokeWidth={1.5}
                      onClick={() => {
                        this.props.setDarkMode(this.props.darkMode ? 0 : 1);
                      }}
                      dark={this.props.darkMode}
                    />
                  }
                />
              </div>
            </MenuMenu>
          </StyledMenu>
          <InfoContentWrapper dark={this.props.darkMode}>
            <InfoContent
              authenticated={this.props.authenticated}
              currentUser={this.props.currentUser}
              problem={this.state.problem}
              darkMode={this.props.darkMode}
              language={this.state.language}
              infoTab={this.state.infoTab}
              step={this.state.step}
              intuitionCompleted={this.state.intuitionCompleted}
              submissions={this.state.submissions}
              verticalPaneSize={this.state.verticalPaneSize}
              windowHeight={this.state.windowHeight}
              windowWidth={this.state.windowWidth}
            />
          </InfoContentWrapper>
        </ContentSegment>
      </OuterPaddingDiv>
    );

    const bottomBar = (
      <BottomBar dark={this.props.darkMode}>
        {this.state.step === -1 ? (
          <Button primary icon labelPosition="right" onClick={() => this.handleLearnIntuitionClick()}>
            Learn The Intuition
            <Icon name="chevron right" />
          </Button>
        ) : (
          <>
            <BottomLeftButton negative icon onClick={() => this.handleLearnIntuitionClick()}>
              <Icon name="repeat" />
            </BottomLeftButton>
            {this.state.problem.problemSteps[this.state.step - 1].time > 0 && (
              <>
                <b>Suggested Time:</b> <Timer.Minutes />:
                <Timer.Seconds />
              </>
            )}
            {this.state.step === this.state.problem.problemSteps.length ? (
              <BottomRightButton primary icon labelPosition="right" onClick={() => this.viewSolutionClick()}>
                View Solution
                <Icon name="chevron right" />
              </BottomRightButton>
            ) : (
              <BottomRightButton primary icon labelPosition="right" onClick={() => this.doneStepClick()}>
                Done This Step
                <Icon name="chevron right" />
              </BottomRightButton>
            )}
          </>
        )}
      </BottomBar>
    );

    const codeEditor = (
      <OuterPaddingDiv>
        <ContentSegment raised height={this.state.horizontalPaneSize - 21}>
          <StyledMenu dark={this.props.darkMode} attached="top" tabular>
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.editorTab === "code"}
              onClick={() => this.handleEditorTabClick("code")}
              name="Code Editor"
            />
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.editorTab === "docs"}
              onClick={() => this.handleEditorTabClick("docs")}
              name="Whiteboard"
            />
            <MenuMenu position="right">
              <StyledDropdown item text={this.languageEnumToText(this.state.language)} dark={this.props.darkMode}>
                <StyledDropdownMenu dark={this.props.darkMode}>
                  <StyledDropdownItem
                    dark={this.props.darkMode}
                    onClick={() => this.handleLanguageClick("PYTHON")}
                    content="Python 3"
                  />
                  <StyledDropdownItem
                    dark={this.props.darkMode}
                    onClick={() => this.handleLanguageClick("JAVA")}
                    content="Java"
                  />
                  <StyledDropdownItem
                    dark={this.props.darkMode}
                    onClick={() => this.handleLanguageClick("JAVASCRIPT")}
                    content="JavaScript"
                  />
                </StyledDropdownMenu>
              </StyledDropdown>
            </MenuMenu>
          </StyledMenu>
          <EditorWrapper dark={this.props.darkMode}>
            {this.state.editorTab === "code" ? (
              <AceEditor
                width={this.state.verticalPaneSize - 22 + "px"}
                height={this.state.horizontalPaneSize - 69 + "px"}
                mode={this.state.language.toLowerCase()}
                theme={this.props.darkMode ? "monokai" : "xcode"}
                value={this.state.code[this.state.language.toLowerCase()]}
                editorProps={{ $blockScrolling: true }}
                onChange={this.codeEditorChange}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  tabSize: 4,
                  useWorker: false,
                }}
              />
            ) : (
              <ReactQuill
                theme="snow"
                value={this.state.docsValue}
                onChange={(value) => this.setState({ docsValue: value })}
              >
                <StyledEditor
                  className="my-editing-area"
                  height={this.state.horizontalPaneSize - 110 + "px"}
                  dark={this.props.darkMode}
                />
              </ReactQuill>
            )}
          </EditorWrapper>
        </ContentSegment>
      </OuterPaddingDiv>
    );

    const testContent = (
      <OuterPaddingDiv>
        <ContentSegment raised height={this.state.windowHeight - this.state.horizontalPaneSize - 88}>
          <StyledMenu dark={this.props.darkMode} attached="top" tabular>
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.testTab === "input"}
              onClick={() => this.handleTestTabClick("input")}
              name="Test Input"
            />
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.testTab === "testResult"}
              onClick={() => this.handleTestTabClick("testResult")}
              name="Test Result"
            />
            <StyledMenuItem
              dark={this.props.darkMode}
              active={this.state.testTab === "submission"}
              onClick={() => this.handleTestTabClick("submission")}
              name="Submission"
            />
            <RightSubMenu position="right">
              <RunButton
                basic
                icon
                labelPosition="right"
                size="small"
                dark={this.props.darkMode}
                disabled={this.state.running || this.state.submitting}
                onClick={() => this.handleTestRunClick()}
              >
                Run
                <Icon name="chevron right" />
              </RunButton>
              <Button
                primary
                icon
                labelPosition="right"
                size="small"
                disabled={this.state.running || this.state.submitting}
                onClick={() => this.handleSubmitClick()}
                style={{ marginLeft: "5px" }}
              >
                Submit
                <Icon name="upload" />
              </Button>
              <Modal
                closeOnEscape={true}
                size="tiny"
                open={this.state.signupModalOpen}
                onClose={() => this.setState({ signupModalOpen: false })}
              >
                <Modal.Header>Submit Your Code</Modal.Header>
                <Modal.Content>
                  <p>
                    Create a <b>free</b> account to save and submit your code. Your code will not be lost when you come
                    back.
                  </p>
                </Modal.Content>
                <Modal.Actions>
                  <GrayButton onClick={() => this.handleLogin()}>Log In</GrayButton>
                  <Button primary onClick={() => this.handleSignUp()}>
                    Sign Up
                  </Button>
                </Modal.Actions>
              </Modal>
            </RightSubMenu>
          </StyledMenu>
          <TestContentWrapper dark={this.props.darkMode}>
            <TestContent
              problem={this.state.problem}
              darkMode={this.props.darkMode}
              testTab={this.state.testTab}
              running={this.state.running}
              handleTestInputChange={this.handleTestInputChange}
              testInput={this.state.testInput}
              testStatus={this.state.testStatus}
              testStdout={this.state.testStdout}
              testOutput={this.state.testOutput}
              testExpectedOutput={this.state.testExpectedOutput}
              testStderr={this.state.testStderr}
              submission={this.state.submission}
              submitting={this.state.submitting}
              horizontalPaneSize={this.state.horizontalPaneSize}
              verticalPaneSize={this.state.verticalPaneSize}
              windowHeight={this.state.windowHeight}
              windowWidth={this.state.windowWidth}
            />
          </TestContentWrapper>
        </ContentSegment>
      </OuterPaddingDiv>
    );

    return (
      <>
        <Head>
          <title>{this.state.problem.name}</title>
          <meta charSet="utf-8" name="description" content={this.state.problem.name} />
          <link rel="canonical" href={"https://www.coderintuition.com/problem/" + this.props.router.query.urlName} />
        </Head>
        <FlexDiv dark={this.props.darkMode}>
          <SplitterVerticalDiv dark={this.props.darkMode}>
            {/* ========== LEFT SIDE ========== */}
            <SplitterLayout
              onSecondaryPaneSizeChange={this.onVerticalChange}
              primaryMinSize={300}
              secondaryMinSize={300}
            >
              <InfoDiv>
                {/* ========== INFO CONTENT ========== */}
                {infoContent}
                {/* ========== BOTTOM INTUITION BAR ========== */}
                {bottomBar}
              </InfoDiv>
              {/* ========== RIGHT SIDE ========== */}
              <SplitterLayout
                vertical
                primaryIndex={1}
                onSecondaryPaneSizeChange={this.onHorizontalChange}
                secondaryInitialSize={this.state.windowHeight * 0.65}
                primaryMinSize={10}
                secondaryMinSize={100}
              >
                {/* ========== CODE EDITOR ========== */}
                {codeEditor}
                {/* ========== TEST CONTENT ========== */}
                {testContent}
              </SplitterLayout>
            </SplitterLayout>
          </SplitterVerticalDiv>
        </FlexDiv>
      </>
    );
  }
}

const TimerHOC = withTimer({
  formatValue: (value) => `${value < 10 ? `0${value}` : value}`,
  direction: "backward",
  initialTime: 0,
  startImmediately: false,
})(Problem);

export default withRouter(withGlobalContext(TimerHOC));
