import React from "react";
import Image from "next/image";
import moment from "moment/moment";
import Quiz from "react-quiz-component";
import {
  AccordionContent,
  AccordionTitle,
  Grid,
  GridColumn,
  GridRow,
  Icon,
  Label,
  Modal,
  Table,
  TableHeader,
} from "semantic-ui-react";
import MarkdownRender from "components/common/markdown-render/markdown-render";
import AceEditor from "components/common/ace-editor/ace-editor";
import Emoji from "components/common/emoji/emoji";
import { capitalize, getDifficultyColor, wrapQuestions } from "common/utils";
import { GrayButton, VHeader } from "common/global-styles";
import {
  ActionText,
  BlurredDiv,
  BlurTopDiv,
  DescriptionStyles,
  HeaderDiv,
  HeaderText,
  StatusLinkText,
  StatusText,
  StyledTable,
  StyledTableHeaderCell,
  StyledTableRow,
  TestResultText,
  VHeaderWithBorder,
} from "./info-content-styles";
import MarkdownRenderDark from "../common/markdown-render/markdown-render-dark";
import { Briefcase, CheckCircle, Heart, Upload } from "react-feather";
import { StyledAccordion } from "./test-content-styles";

interface InfoContentProps {
  authenticated: boolean;
  currentUser: any;
  problem: any;
  darkMode: number;
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

  getSolutionCode(solution, language) {
    switch (language) {
      case "PYTHON":
        return solution.pythonCode;
      case "JAVA":
        return solution.javaCode;
      case "JAVASCRIPT":
        return solution.javascriptCode;
    }
  }

  render() {
    switch (this.props.infoTab) {
      /* ========== DESCRIPTION TAB ========== */
      case "description":
        return (
          <div style={{ marginBottom: 50 }}>
            <VHeader dark={this.props.darkMode} style={{ marginBottom: 6 }}>
              {this.props.problem.name}
            </VHeader>
            <HeaderDiv>
              <Label color={getDifficultyColor(this.props.problem.difficulty)} circular size="small">
                {capitalize(this.props.problem.difficulty)}
              </Label>
              <Briefcase style={{ display: "inline", width: 16, marginLeft: 20 }} />
              <HeaderText>2</HeaderText>
              <Upload style={{ display: "inline", width: 16, marginLeft: 20 }} />
              <HeaderText>87</HeaderText>
              <Heart style={{ display: "inline", width: 16, marginLeft: 20 }} />
              <HeaderText>87</HeaderText>
              <CheckCircle
                color={this.hasPassedSubmission() ? "#20bf6b" : this.props.darkMode ? "#555555" : "#00000030"}
                style={{ display: "inline", width: 16, marginLeft: 20 }}
              />
            </HeaderDiv>
            <hr style={{ marginBottom: 16, minWidth: 280 }} />
            <DescriptionStyles>
              {this.props.darkMode ? (
                <MarkdownRenderDark source={this.props.problem.description} />
              ) : (
                <MarkdownRender source={this.props.problem.description} />
              )}
            </DescriptionStyles>
          </div>
        );
      /* ========== INTUITION TAB ========== */
      case "intuition":
        if (this.props.step === -1) {
          return (
            <Grid style={{ marginBottom: 50 }}>
              <GridRow centered>
                <VHeader dark={this.props.darkMode}>
                  Stuck? <Emoji symbol="😕" />
                </VHeader>
              </GridRow>
              <GridRow centered style={{ marginTop: 50 }}>
                <div style={{ width: "35vh", height: "35vh" }}>
                  <Image src="/images/stuck.svg" alt="Stuck on question graphic" layout="fill" />
                </div>
              </GridRow>
              <GridRow centered style={{ marginTop: 50 }}>
                <ActionText>
                  Click <b style={{ fontWeight: 600 }}>Learn The Intuition</b> below to learn the{" "}
                  <b style={{ fontWeight: 600 }}>Intuition Steps</b> behind solving this problem!
                </ActionText>
              </GridRow>
            </Grid>
          );
        } else {
          const curStep = this.props.problem.problemSteps[this.props.step - 1];
          return (
            <div style={{ marginBottom: 70 }}>
              <VHeaderWithBorder dark={this.props.darkMode} as="h3">
                Step {curStep.stepNum}: {curStep.name}
              </VHeaderWithBorder>
              {curStep.type === "TEXT" ? (
                <DescriptionStyles>
                  {this.props.darkMode ? (
                    <MarkdownRenderDark source={curStep.content} />
                  ) : (
                    <MarkdownRender source={curStep.content} />
                  )}
                </DescriptionStyles>
              ) : (
                <Quiz quiz={wrapQuestions(curStep.content)} key={this.props.step} />
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
                <ActionText>
                  Try the <b style={{ fontWeight: 600 }}>Intuition Steps</b> first before viewing the solution.
                  <br />
                  Click <b style={{ fontWeight: 600 }}>Learn The Intuition</b> below!
                </ActionText>
              </BlurTopDiv>
              <BlurredDiv>
                {this.props.problem.solutions.map((solution, idx) => {
                  return (
                    <div key={idx}>
                      <VHeaderWithBorder dark={this.props.darkMode} as="h3">
                        Approach {solution.solutionNum}: {solution.name}
                      </VHeaderWithBorder>
                      <DescriptionStyles>
                        {this.props.darkMode ? (
                          <MarkdownRenderDark source={solution.description} />
                        ) : (
                          <MarkdownRender source={solution.description} />
                        )}
                      </DescriptionStyles>
                      <br />
                      <AceEditor
                        width={this.props.windowWidth - this.props.verticalPaneSize - 65 + "px"}
                        mode={"python"}
                        theme={this.props.darkMode ? "monokai" : "xcode"}
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
                    <StyledAccordion
                      fluid
                      styled
                      dark={this.props.darkMode}
                      onClick={() => this.handleAccordionClick(idx)}
                    >
                      <AccordionTitle active={this.state["active" + idx]}>
                        <Icon name="dropdown" color={this.props.darkMode ? "grey" : "black"} />
                        <VHeader dark={this.props.darkMode} style={{ display: "inline", fontSize: 16 }}>
                          Approach {solution.solutionNum}: {solution.name}
                        </VHeader>
                      </AccordionTitle>
                      <AccordionContent active={this.state["active" + idx]}>
                        <DescriptionStyles>
                          {this.props.darkMode ? (
                            <MarkdownRenderDark source={solution.description} />
                          ) : (
                            <MarkdownRender source={solution.description} />
                          )}
                        </DescriptionStyles>
                        <VHeader
                          dark={this.props.darkMode}
                          style={{ fontSize: 14, fontWeight: 600, marginTop: 20, marginBottom: 8 }}
                        >
                          Code
                        </VHeader>
                        <AceEditor
                          width={this.props.windowWidth - this.props.verticalPaneSize - 100 + "px"}
                          mode={this.props.language.toLowerCase()}
                          theme={this.props.darkMode ? "monokai" : "xcode"}
                          value={this.getSolutionCode(solution, this.props.language)}
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
                      </AccordionContent>
                    </StyledAccordion>
                    <br />
                  </div>
                );
              })}
              <br />
              <br />
            </div>
          );
        }
      /* ========== SUBMISSIONS TAB ========== */
      case "submissions":
        if (this.props.submissions.length > 0) {
          return (
            <>
              <StyledTable striped stackable dark={this.props.darkMode}>
                <TableHeader>
                  <StyledTableRow dark={this.props.darkMode}>
                    <StyledTableHeaderCell className="second" width={7} dark={this.props.darkMode}>
                      Submission Time
                    </StyledTableHeaderCell>
                    <StyledTableHeaderCell className="second" width={3} dark={this.props.darkMode}>
                      Status
                    </StyledTableHeaderCell>
                    <StyledTableHeaderCell className="second" width={3} dark={this.props.darkMode}>
                      Runtime
                    </StyledTableHeaderCell>
                    <StyledTableHeaderCell className="second" width={3} dark={this.props.darkMode}>
                      Language
                    </StyledTableHeaderCell>
                  </StyledTableRow>
                </TableHeader>
                <Table.Body>
                  {this.props.submissions.map((submission, idx) => {
                    return (
                      <StyledTableRow key={idx} dark={this.props.darkMode}>
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
                      </StyledTableRow>
                    );
                  })}
                </Table.Body>
              </StyledTable>
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
