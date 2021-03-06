import React from "react";
import { AccordionContent, AccordionTitle, Button, Form, Grid, GridColumn, GridRow, Icon } from "semantic-ui-react";
import TestOutputLoader from "./test-output-loader";
import Emoji from "components/common/emoji/emoji";
import AceEditor from "components/common/ace-editor/ace-editor";
import {
  AccordionTitleSpan,
  CheckRight,
  LeftColumn,
  RightColumn,
  StatusText,
  StyledAccordion,
  StyledCheckCircle,
  StyledTextArea,
  StyledXCircle,
  TopRow,
  XRight,
} from "./test-content-styles";
import { getNextExercise } from "../../common/utils";
import { NextRouter } from "next/router";

function TestContentWrapper(props) {
  return (
    <div style={{ maxHeight: "100%", overflow: "auto", padding: 20 }}>
      <Grid className="compact" style={{ margin: 0, marginBottom: 50 }}>
        {props.children}
      </Grid>
    </div>
  );
}

type PropTypes = {
  router: NextRouter;
  problem: any;
  darkMode: number;
  testTab: string;
  running: boolean;
  handleTestInputChange: any;
  testInput: string;
  testStatus: string;
  testStdout: string;
  testOutput: string;
  testExpectedOutput: string;
  testStderr: string;
  submitting: boolean;
  submission: any;
  horizontalPaneSize: number;
  verticalPaneSize: number;
  windowHeight: number;
  windowWidth: number;
};

class TestContent extends React.Component<PropTypes> {
  state = {
    submissionActives: {} as any,
  };

  handleAccordionClick(index) {
    this.setState({
      ["active" + index]: !this.state["active" + index],
    });
  }

  render() {
    switch (this.props.testTab) {
      /* ========== INPUT TAB ========== */
      case "input":
        return (
          <AceEditor
            width={this.props.verticalPaneSize - 22 + "px"}
            height={this.props.windowHeight - this.props.horizontalPaneSize - 138 + "px"}
            mode="plain_text"
            theme={this.props.darkMode ? "monokai" : "xcode"}
            value={this.props.testInput}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 4,
              useWorker: false,
            }}
            onChange={this.props.handleTestInputChange}
          />
        );
      /* ========== TEST RESULT TAB ========== */
      case "testResult":
        if (this.props.running) {
          return <TestOutputLoader text="Running your test..." dark={this.props.darkMode} />;
        } else {
          switch (this.props.testStatus) {
            /* ========== TEST RESULT TAB -> ERROR ========== */
            case "ERROR":
              return (
                <TestContentWrapper>
                  <TopRow dark={this.props.darkMode}>
                    <StatusText>
                      <StyledXCircle size={28} />
                      Test Error
                    </StatusText>
                  </TopRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right" dark={this.props.darkMode}>
                      Your Input
                    </LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testInput} height={40} dark={this.props.darkMode} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right" dark={this.props.darkMode}>
                      Error
                    </LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea
                          disabled
                          value={this.props.testStderr}
                          height={150}
                          dark={this.props.darkMode}
                        />
                      </Form>
                    </RightColumn>
                  </GridRow>
                </TestContentWrapper>
              );
            /* ========== TEST RESULT TAB -> PASSED OR FAILED ========== */
            case "PASSED":
            case "FAILED":
              return (
                <TestContentWrapper>
                  <TopRow dark={this.props.darkMode}>
                    {this.props.testStatus === "PASSED" ? (
                      <StatusText>
                        <StyledCheckCircle size={28} />
                        Test Passed
                      </StatusText>
                    ) : (
                      <StatusText>
                        <StyledXCircle size={28} />
                        Test Failed
                      </StatusText>
                    )}
                  </TopRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right" dark={this.props.darkMode}>
                      Your Input
                    </LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testInput} height={40} dark={this.props.darkMode} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right" dark={this.props.darkMode}>
                      Stdout
                    </LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testStdout} height={40} dark={this.props.darkMode} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right" dark={this.props.darkMode}>
                      Your Output
                    </LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testOutput} height={40} dark={this.props.darkMode} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right" dark={this.props.darkMode}>
                      Expected Output
                    </LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea
                          disabled
                          value={this.props.testExpectedOutput}
                          height={40}
                          dark={this.props.darkMode}
                        />
                      </Form>
                    </RightColumn>
                  </GridRow>
                </TestContentWrapper>
              );
            /* ========== TEST RESULT TAB -> NOT YET RUN ========== */
            default:
              return (
                <TestContentWrapper>
                  <TopRow dark={this.props.darkMode} verticalAlign="middle">
                    Click&nbsp;<b>Run</b>&nbsp;to run your code with input from the&nbsp;<b>Test Input</b>&nbsp;tab.
                  </TopRow>
                </TestContentWrapper>
              );
          }
        }
      /* ========== SUBMISSION TAB ========== */
      case "submission":
        if (this.props.submitting) {
          return <TestOutputLoader text="Submitting your code..." dark={this.props.darkMode} />;
        } else {
          switch (this.props.submission.status) {
            /* ========== SUBMISSION TAB -> ERROR ========== */
            case "ERROR":
              return (
                <TestContentWrapper>
                  <TopRow dark={this.props.darkMode} verticalAlign="middle">
                    <StatusText>
                      <StyledXCircle size={28} />
                      Test Error
                    </StatusText>
                  </TopRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right" dark={this.props.darkMode}>
                      Error
                    </LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea
                          disabled
                          value={this.props.submission.stderr}
                          height={150}
                          dark={this.props.darkMode}
                        />
                      </Form>
                    </RightColumn>
                  </GridRow>
                </TestContentWrapper>
              );
            /* ========== SUBMISSION TAB -> PASSED OR FAILED ========== */
            case "ACCEPTED":
              const urlName = getNextExercise(this.props.problem.urlName);
              return (
                <TestContentWrapper>
                  <TopRow dark={this.props.darkMode}>
                    <StatusText>
                      <StyledCheckCircle size={28} />
                      Submission Accepted
                    </StatusText>
                  </TopRow>
                  <p></p>
                  <Button
                    primary
                    icon
                    labelPosition="right"
                    style={{ marginTop: 10 }}
                    onClick={() => this.props.router.push(urlName || "/problems")}
                  >
                    {!urlName ? "Try Another Problem" :
                      urlName.startsWith("/quiz")
                      ? "Next Quiz"
                      : urlName.startsWith("/reading")
                      ? "Next Reading"
                      : "Next Problem"}
                    <Icon name="chevron right" />
                  </Button>
                </TestContentWrapper>
              );
            case "REJECTED":
              /* ========== SUBMISSION TAB -> PASSED OR FAILED -> SUBMISSION RESULT ITEMS ========== */
              const submissionResultItems = this.props.submission.testResults.map((run, index) => {
                switch (run.status) {
                  case "PASSED":
                    return (
                      <GridRow key={index}>
                        <StyledAccordion
                          fluid
                          styled
                          dark={this.props.darkMode}
                        >
                          <AccordionTitle active={this.state["active" + index]} onClick={() => this.handleAccordionClick(index)}>
                            <Icon name="dropdown" color={this.props.darkMode ? "grey" : "black"} />
                            <AccordionTitleSpan dark={this.props.darkMode}>Test {index + 1}</AccordionTitleSpan>
                            <CheckRight />
                          </AccordionTitle>
                          <AccordionContent active={this.state["active" + index]}>
                            <Grid>
                              <GridRow verticalAlign="middle">
                                <GridColumn textAlign="center" style={{ fontSize: 24 }}>
                                  <Emoji symbol="🥳" />
                                </GridColumn>
                              </GridRow>
                            </Grid>
                          </AccordionContent>
                        </StyledAccordion>
                      </GridRow>
                    );
                  case "FAILED":
                    return (
                      <GridRow key={index}>
                        <StyledAccordion
                          fluid
                          styled
                          dark={this.props.darkMode}
                        >
                          <AccordionTitle active={this.state["active" + index]} onClick={() => this.handleAccordionClick(index)}>
                            <Icon name="dropdown" color={this.props.darkMode ? "grey" : "black"} />
                            <AccordionTitleSpan dark={this.props.darkMode}>Test {index + 1}</AccordionTitleSpan>
                            <XRight />
                          </AccordionTitle>
                          <AccordionContent active={this.state["active" + index]}>
                            <Grid>
                              <GridRow verticalAlign="middle">
                                <LeftColumn textAlign="right" dark={this.props.darkMode}>
                                  Test Input
                                </LeftColumn>
                                <RightColumn>
                                  <Form>
                                    <StyledTextArea disabled value={run.input} height={40} dark={this.props.darkMode} />
                                  </Form>
                                </RightColumn>
                              </GridRow>
                              <GridRow verticalAlign="middle">
                                <LeftColumn textAlign="right" dark={this.props.darkMode}>
                                  Your Output
                                </LeftColumn>
                                <RightColumn>
                                  <Form>
                                    <StyledTextArea
                                      disabled
                                      value={run.output}
                                      height={40}
                                      dark={this.props.darkMode}
                                    />
                                  </Form>
                                </RightColumn>
                              </GridRow>
                              <GridRow verticalAlign="middle">
                                <LeftColumn textAlign="right" dark={this.props.darkMode}>
                                  Expected Output
                                </LeftColumn>
                                <RightColumn>
                                  <Form>
                                    <StyledTextArea
                                      disabled
                                      value={run.expectedOutput}
                                      height={40}
                                      dark={this.props.darkMode}
                                    />
                                  </Form>
                                </RightColumn>
                              </GridRow>
                            </Grid>
                          </AccordionContent>
                        </StyledAccordion>
                      </GridRow>
                    );
                  default:
                    return <GridRow key={index} />;
                }
              });
              /* ========== SUBMISSION TAB -> PASSED OR FAILED -> SUBMISSION RESULT ========== */
              return (
                <TestContentWrapper>
                  <TopRow dark={this.props.darkMode}>
                    <StatusText>
                      <StyledXCircle size={28} />
                      Some Tests Failed
                    </StatusText>
                  </TopRow>
                  {submissionResultItems}
                </TestContentWrapper>
              );
            /* ========== SUBMISSION TAB -> NOT YET SUBMITTED ========== */
            default:
              return (
                <TestContentWrapper>
                  <TopRow dark={this.props.darkMode} verticalAlign="middle">
                    Click&nbsp;<b>Submit</b>&nbsp;to submit your code and run all the tests.
                  </TopRow>
                </TestContentWrapper>
              );
          }
        }
    }
  }
}

export default TestContent;
