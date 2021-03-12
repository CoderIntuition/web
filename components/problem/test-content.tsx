import React from "react";
import { Accordion, AccordionContent, AccordionTitle, Form, Grid, GridColumn, GridRow, Icon } from "semantic-ui-react";
import TestOutputLoader from "./test-output-loader";
import Emoji from "components/common/emoji/emoji";
import AceEditor from "components/common/ace-editor/ace-editor";
import {
  CheckRight,
  LeftColumn,
  RightColumn,
  StatusText,
  StyledCheckCircle,
  StyledTextArea,
  StyledXCircle,
  TopRow,
  XRight,
} from "./test-content-styles";

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
                    <LeftColumn textAlign="right">Your Input</LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testInput} height={40} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right">Error</LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testStderr} height={150} />
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
                    <LeftColumn textAlign="right">Your Input</LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testInput} height={40} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right">Stdout</LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testStdout} height={40} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right">Your Output</LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testOutput} height={40} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                  <GridRow columns={2} verticalAlign="middle">
                    <LeftColumn textAlign="right">Expected Output</LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.testExpectedOutput} height={40} />
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
                    <LeftColumn textAlign="right">Error</LeftColumn>
                    <RightColumn>
                      <Form>
                        <StyledTextArea disabled value={this.props.submission.stderr} height={150} />
                      </Form>
                    </RightColumn>
                  </GridRow>
                </TestContentWrapper>
              );
            /* ========== SUBMISSION TAB -> PASSED OR FAILED ========== */
            case "ACCEPTED":
            case "REJECTED":
              /* ========== SUBMISSION TAB -> PASSED OR FAILED -> SUBMISSION RESULT ITEMS ========== */
              const submissionResultItems = this.props.submission.testResults.map((run, index) => {
                switch (run.status) {
                  case "PASSED":
                    return (
                      <GridRow key={index}>
                        <Accordion fluid styled onClick={() => this.handleAccordionClick(index)}>
                          <AccordionTitle active={this.state["active" + index]}>
                            <Icon name="dropdown" />
                            Test {index + 1} <CheckRight />
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
                        </Accordion>
                      </GridRow>
                    );
                  case "FAILED":
                    return (
                      <GridRow key={index}>
                        <Accordion fluid styled onClick={() => this.handleAccordionClick(index)}>
                          <AccordionTitle active={this.state["active" + index]}>
                            <Icon name="dropdown" />
                            Test {index + 1} <XRight />
                          </AccordionTitle>
                          <AccordionContent active={this.state["active" + index]}>
                            <Grid>
                              <GridRow verticalAlign="middle">
                                <LeftColumn textAlign="right">Test Input</LeftColumn>
                                <RightColumn>
                                  <Form>
                                    <StyledTextArea disabled value={run.input} height={40} />
                                  </Form>
                                </RightColumn>
                              </GridRow>
                              <GridRow verticalAlign="middle">
                                <LeftColumn textAlign="right">Your Output</LeftColumn>
                                <RightColumn>
                                  <Form>
                                    <StyledTextArea disabled value={run.output} height={40} />
                                  </Form>
                                </RightColumn>
                              </GridRow>
                              <GridRow verticalAlign="middle">
                                <LeftColumn textAlign="right">Expected Output</LeftColumn>
                                <RightColumn>
                                  <Form>
                                    <StyledTextArea disabled value={run.expectedOutput} height={40} />
                                  </Form>
                                </RightColumn>
                              </GridRow>
                            </Grid>
                          </AccordionContent>
                        </Accordion>
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
                    {this.props.submission.status === "ACCEPTED" ? (
                      <StatusText>
                        <StyledCheckCircle size={28} />
                        Submission Accepted
                      </StatusText>
                    ) : (
                      <StatusText>
                        <StyledXCircle size={28} />
                        Some Tests Failed
                      </StatusText>
                    )}
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
