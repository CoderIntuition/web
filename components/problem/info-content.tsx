import React from "react";
import Image from "next/image";
import moment from "moment/moment";
import Quiz from "react-quiz-component";
import {
  Grid,
  GridColumn,
  GridRow,
  Header,
  Modal,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import MarkdownRender from "components/common/markdown-render/markdown-render";
import AceEditor from "components/common/ace-editor/ace-editor";
import Emoji from "components/common/emoji/emoji";
import { capitalize, wrapQuestions } from "common/utils";
import { GrayButton } from "common/global-styles";
import { Label } from "./problem-styles";
import {
  ActionText,
  BlurredDiv,
  BlurTopDiv,
  DescriptionStyles,
  StatusLinkText,
  StatusText,
  TestResultText,
} from "./info-content-styles";

interface InfoContentProps {
  authenticated: boolean;
  currentUser: any;
  problem: any;
  language: string;
  infoTab: string;
  step: number;
  submissions: any;
  intuitionCompleted: boolean;
  verticalPaneSize: number;
  windowHeight: number;
  windowWidth: number;
}

class InfoContent extends React.Component<InfoContentProps> {
  state = {
    submissionModalOpen: false,
    curSubmission: null as any,
  };

  handleAccordionClick(index) {
    this.setState({
      ["active" + index]: !this.state["active" + index],
    });
  }

  getNumPassedTests(testResults) {
    return testResults.filter((testResult) => testResult.status === "PASSED").length;
  }

  hasPassedSubmission() {
    return this.props.submissions.some((x) => x.status === "ACCEPTED");
  }

  render() {
    switch (this.props.infoTab) {
      /* ========== DESCRIPTION TAB ========== */
      case "description":
        return (
          <>
            <Header size="large">{this.props.problem.name}</Header>
            <DescriptionStyles>
              <MarkdownRender source={this.props.problem.description} />
            </DescriptionStyles>
          </>
        );
      /* ========== INTUITION TAB ========== */
      case "intuition":
        if (this.props.step === -1) {
          return (
            <Grid style={{ marginBottom: 50 }}>
              <GridRow centered>
                <Header size="large">
                  Stuck? <Emoji symbol="😕" />
                </Header>
              </GridRow>
              <GridRow centered style={{ marginTop: 50 }}>
                <div style={{width: "40vh", height: "40vh"}}>
                  <Image src="/images/stuck.svg" alt="Stuck on question graphic" layout="fill" />
                </div>
              </GridRow>
              <GridRow centered style={{ marginTop: 50 }}>
                <ActionText>
                  Click <b>below</b> to learn the <b>Intuition Steps</b> required to solve this problem!
                </ActionText>
              </GridRow>
            </Grid>
          );
        } else {
          const curStep = this.props.problem.problemSteps[this.props.step - 1];
          return (
            <div style={{ marginBottom: 70 }}>
              <Header size="medium">
                Step {curStep.stepNum} - {curStep.name}
              </Header>
              {curStep.type === "TEXT" ? (
                <DescriptionStyles>
                  <MarkdownRender source={curStep.content} />
                </DescriptionStyles>
              ) : (
                <Quiz quiz={wrapQuestions(curStep.content)} />
              )}
            </div>
          );
        }
      /* ========== SOLUTION TAB ========== */
      case "solution":
        if (!this.props.intuitionCompleted && !this.hasPassedSubmission()) {
          return (
            <>
              <BlurTopDiv>
                <ActionText>Try to finish the Intuition Steps first before viewing the solution!</ActionText>
              </BlurTopDiv>
              <BlurredDiv>
                {this.props.problem.solutions.map((solution, idx) => {
                  return (
                    <div key={idx}>
                      <Header size="medium">
                        Approach {solution.solutionNum}: {solution.name}
                      </Header>
                      <DescriptionStyles>
                        <MarkdownRender source={solution.description} />
                      </DescriptionStyles>
                      <br />
                      <AceEditor
                        width={this.props.windowWidth - this.props.verticalPaneSize - 65 + "px"}
                        mode={"python"}
                        theme="xcode"
                        value={solution.pythonCode}
                        editorProps={{
                          $blockScrolling: true,
                          $blockSelectEnabled: true,
                        }}
                        setOptions={{
                          showLineNumbers: true,
                          tabSize: 4,
                          maxLines: 50,
                          readOnly: true,
                          useWorker: false,
                        }}
                        onSelectionChange={(sel) => sel.clearSelection()}
                      />
                      <br />
                      <br />
                    </div>
                  );
                })}
              </BlurredDiv>
            </>
          );
        } else {
          return (
            <div style={{ marginBottom: 10 }}>
              {this.props.problem.solutions.map((solution, idx) => {
                return (
                  <div key={idx}>
                    <Header as="h3">
                      Approach {solution.solutionNum}: {solution.name}
                    </Header>
                    <MarkdownRender source={solution.description} />
                    <br />
                    <AceEditor
                      width={this.props.windowWidth - this.props.verticalPaneSize - 65 + "px"}
                      mode={"python"}
                      theme="xcode"
                      value={solution.pythonCode}
                      editorProps={{
                        $blockScrolling: true,
                        $blockSelectEnabled: true,
                      }}
                      setOptions={{
                        showLineNumbers: true,
                        tabSize: 4,
                        maxLines: 50,
                        readOnly: true,
                        useWorker: false,
                      }}
                    />
                    <br />
                    <br />
                  </div>
                );
              })}
            </div>
          );
        }
      /* ========== SUBMISSIONS TAB ========== */
      case "submissions":
        if (this.props.submissions.length > 0) {
          return (
            <>
              <Table celled striped stackable compact style={{ border: "1px solid rgb(232, 237, 242)" }}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell className="second" width={5}>
                      Submission Time
                    </TableHeaderCell>
                    <TableHeaderCell className="second" width={4}>
                      Status
                    </TableHeaderCell>
                    <TableHeaderCell className="second" width={3}>
                      Runtime
                    </TableHeaderCell>
                    <TableHeaderCell className="second" width={4}>
                      Language
                    </TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <Table.Body>
                  {this.props.submissions.map((submission, idx) => {
                    return (
                      <Table.Row key={idx}>
                        <Table.Cell>{moment(submission.created_at).format("MMM Do YYYY, h:mm a")}</Table.Cell>
                        <Table.Cell>
                          <StatusLinkText
                            status={submission.status}
                            onClick={() => {
                              this.setState({
                                submissionModalOpen: true,
                                curSubmission: submission,
                              });
                            }}
                          >
                            {capitalize(submission.status)}
                          </StatusLinkText>
                        </Table.Cell>
                        <Table.Cell>30ms</Table.Cell>
                        <Table.Cell>{capitalize(submission.language)}</Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
              {this.state.curSubmission && (
                <Modal
                  closeOnEscape={true}
                  open={this.state.submissionModalOpen}
                  onClose={() => this.setState({ submissionModalOpen: false })}
                >
                  <Modal.Header>Submission Information</Modal.Header>
                  <Modal.Content>
                    <Grid>
                      <GridRow columns={4}>
                        <GridColumn>
                          <Label>Time Submitted</Label>
                          <span>{new Date(this.state.curSubmission.created_at).toLocaleString()}</span>
                        </GridColumn>
                        <GridColumn>
                          <Label>Status</Label>
                          <StatusText status={this.state.curSubmission.status}>
                            {capitalize(this.state.curSubmission.status)}
                          </StatusText>
                        </GridColumn>
                        <GridColumn>
                          <Label>Runtime</Label>
                          <span>30ms</span>
                        </GridColumn>
                        <GridColumn>
                          <Label>Language</Label>
                          <span>{capitalize(this.state.curSubmission.language)}</span>
                        </GridColumn>
                      </GridRow>
                      <GridRow>
                        <GridColumn>
                          <Label>Code</Label>
                          <AceEditor
                            width="100%"
                            mode={this.state.curSubmission.language.toLowerCase()}
                            theme="xcode"
                            value={this.state.curSubmission.code}
                            editorProps={{
                              $blockScrolling: true,
                              $blockSelectEnabled: true,
                            }}
                            setOptions={{
                              showLineNumbers: true,
                              tabSize: 4,
                              maxLines: 50,
                              readOnly: true,
                              useWorker: false,
                            }}
                          />
                        </GridColumn>
                      </GridRow>
                      <GridRow>
                        <GridColumn>
                          <Label>Tests Passed</Label>
                          <TestResultText
                            color={
                              this.getNumPassedTests(this.state.curSubmission.testResults) ===
                              this.state.curSubmission.testResults.length
                                ? "green"
                                : "red"
                            }
                          >
                            {this.getNumPassedTests(this.state.curSubmission.testResults)} /{" "}
                            {this.state.curSubmission.testResults.length}
                          </TestResultText>
                        </GridColumn>
                      </GridRow>
                    </Grid>
                  </Modal.Content>
                  <Modal.Actions>
                    <GrayButton onClick={() => this.setState({ submissionModalOpen: false })}>Close</GrayButton>
                  </Modal.Actions>
                </Modal>
              )}
            </>
          );
        } else {
          return (
            <span>
              You don't have any submissions yet. Click <b>Submit</b> in the bottom right section to submit your code.
            </span>
          );
        }
    }
  }
}

export default InfoContent;
