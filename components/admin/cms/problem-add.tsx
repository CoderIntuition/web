import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import Link from "next/link";
import { Client } from "@stomp/stompjs";
import axios from "axios";
import Quiz from "react-quiz-component";
import {
  Button,
  Divider,
  Dropdown,
  Form,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Input,
  Loader,
  Menu,
  Message,
  Radio,
  Segment,
  TextArea,
} from "semantic-ui-react";
import { getCurrentUserToken, isMod } from "common/auth-service";
import { constants, QUIZ_TEMPLATE } from "common/constants";
import { isJsonArray, showErrorToast, showSuccessToast, withGlobalContext, wrapQuestions } from "common/utils";
import { GrayButton, GreenButton, RedButton } from "common/global-styles";
import MarkdownRender from "components/common/markdown-render/markdown-render";
import AceEditor from "components/common/ace-editor/ace-editor";
import {
  Label,
  RadioDiv,
  RadioLeftLabel,
  RadioRightLabel,
  StyledGrid,
  StyledSegment,
  TemplateSpan,
} from "./add-styles";

interface CmsProblemAddProps {
  router: NextRouter;
  contextLoading: boolean;
  authenticated: boolean;
  currentUser: any;
}

class ProblemAdd extends Component<CmsProblemAddProps> {
  state = {
    preLoading: true,
    problemId: 0,
    name: "",
    urlName: "",
    plusOnly: false,
    category: "",
    difficulty: 1,
    description: "",
    defaultCodeLanguage: "python",
    defaultCode: {
      python: "",
      java: "",
      javascript: "",
    },
    returnType: {
      type: "",
      underlyingType: "",
      underlyingType2: "",
      orderMatters: true,
    },
    argumentRows: [
      {
        type: "",
        underlyingType: "",
        underlyingType2: "",
      },
    ] as any[],
    intuitionRows: [
      {
        name: "",
        time: 0,
        isQuiz: false,
        content: "",
      },
    ] as any[],
    solutionRows: [
      {
        name: "",
        isPrimary: true,
        description: "",
        language: "python",
        code: {
          python: "",
          java: "",
          javascript: "",
        },
      },
    ] as any[],
    testCaseRows: [
      {
        name: "",
        isDefault: true,
        input: "",
        output: "",
        produceOutputLoading: false,
        produceOutputLanguage: "PYTHON",
      },
    ] as any[],
    loading: false,
    submitStatus: "",
    message: {} as any,
    produceOutputToken: "",
    produceOutputIdx: -1,
  };

  client;

  setupWebSocket() {
    if (!this.props.authenticated) {
      return;
    }

    this.client = new Client();
    this.client.configure({
      brokerURL: constants.STOMP_BASE_URL,
      reconnectDelay: 1000,
      heartbeatIncoming: 5000,
      heartbeatOutgoing: 1000,
      onConnect: () => {
        console.log("Connected to websocket");
        // listen for produce output
        this.client.subscribe("/topic/produceoutput", (message) => {
          // if token matches call api with auth to get produce output data
          if (message.body === this.state.produceOutputToken) {
            const url = constants.PRODUCE_OUTPUT_URL + "/" + this.state.produceOutputToken;
            const config = {
              headers: {
                Authorization: `Bearer ${getCurrentUserToken()}`,
              },
            };
            axios.get(url, config).then((res) => {
              const testCaseRows = this.state.testCaseRows;
              const idx = this.state.produceOutputIdx;
              testCaseRows[idx].output = res.data.stderr || res.data.output;
              testCaseRows[idx].produceOutputLoading = false;
              showSuccessToast("Success", "Output produced.");
              this.setState({
                testCaseRows: testCaseRows,
                produceOutputToken: "",
                produceOutputIdx: -1,
              });
            });
          }
        });
      },
    });

    this.client.activate();
  }

  async componentDidMount() {
    const id = this.props.router.query.id;

    if (id) {
      // edit
      this.setupWebSocket();
      const url = constants.CMS_PROBLEM_URL + "id/" + id;
      const config = {
        headers: {
          Authorization: `Bearer ${getCurrentUserToken()}`,
        },
      };

      axios.get(url, config).then((res) => {
        const data = res.data;

        const argumentRows = [] as any[];
        data.arguments.forEach((item) => {
          argumentRows.push({
            type: item.type,
            underlyingType: item.underlyingType,
            underlyingType2: item.underlyingType2,
          });
        });

        const intuitionRows = [] as any[];
        data.problemSteps.forEach((item) => {
          intuitionRows.push({
            name: item.name,
            time: item.time,
            isQuiz: item.type === "QUIZ",
            content: item.content,
          });
        });

        const solutionRows = [] as any[];
        data.solutions.forEach((item) => {
          solutionRows.push({
            name: item.name,
            isPrimary: item.isPrimary,
            description: item.description,
            language: "python",
            code: {
              python: item.pythonCode,
              java: item.javaCode == null ? "" : item.javaCode,
              javascript: item.javascriptCode == null ? "" : item.javascriptCode,
            },
          });
        });

        const testCaseRows = [] as any[];
        data.testCases.forEach((item) => {
          testCaseRows.push({
            name: item.name,
            isDefault: item.isDefault,
            input: item.input,
            output: item.output,
            produceOutputLoading: false,
            produceOutputToken: "",
            produceOutputLanguage: "PYTHON",
          });
        });

        this.setState({
          preLoading: false,
          problemId: data.id,
          name: data.name,
          urlName: data.urlName,
          plusOnly: data.plusOnly,
          category: data.category,
          difficulty: data.difficulty,
          description: data.description,
          defaultCode: {
            python: data.pythonCode,
            java: data.javaCode == null ? "" : data.javaCode,
            javascript: data.javascriptCode == null ? "" : data.javascriptCode,
          },
          returnType: data.returnType,
          argumentRows: argumentRows,
          intuitionRows: intuitionRows,
          solutionRows: solutionRows,
          testCaseRows: testCaseRows,
        });
      });
    } else {
      this.setState({
        preLoading: false,
      });
    }
  }

  handleDefaultCodeLanguageClick(value) {
    this.setState({
      defaultCodeLanguage: value,
    });
  }

  handleDefaultCodeChange(value) {
    const defaultCode = this.state.defaultCode;
    defaultCode[this.state.defaultCodeLanguage] = value;
    this.setState({ defaultCode: defaultCode });
  }

  handleReturnTypeFieldChange(value, field) {
    const returnType = this.state.returnType;
    returnType[field] = value;
    this.setState({
      returnType: returnType,
    });
  }

  handleArgumentFieldChange(idx, value, field) {
    const rows = this.state.argumentRows;
    rows[idx][field] = value;
    this.setState({
      argumentRows: rows,
    });
  }

  handleIntuitionFieldChange(idx, value, field) {
    const rows = this.state.intuitionRows;
    rows[idx][field] = value;
    this.setState({
      intuitionRows: rows,
    });
  }

  handleSolutionFieldChange(idx, value, field) {
    const rows = this.state.solutionRows;
    rows[idx][field] = value;
    this.setState({
      solutionRows: rows,
    });
  }

  handleSolutionCodeChange(idx, value) {
    const rows = this.state.solutionRows;
    const code = rows[idx].code;
    code[rows[idx].language] = value;
    rows[idx].code = code;
    this.setState({ solutionRows: rows });
  }

  handleTestCaseFieldChange(idx, value, field) {
    const rows = this.state.testCaseRows;
    rows[idx][field] = value;
    this.setState({
      testCaseRows: rows,
    });
  }

  getPrimarySolution(language) {
    const res = this.state.solutionRows.filter((x) => {
      return x.isPrimary;
    });
    if (res.length !== 1) {
      return null;
    }
    return res[0].code[language];
  }

  handleProduceOutput(idx) {
    if (!this.props.router.query.id) {
      // add
      showErrorToast("Produce output is only available for editing", "Save the problem first and then edit it");
      return;
    }

    if (this.state.produceOutputToken !== "") {
      showErrorToast("Produce output is already running", "Wait for it to finish before producing another output");
      return;
    }

    const testCaseRows = this.state.testCaseRows;
    testCaseRows[idx].produceOutputLoading = true;
    this.setState({
      testCaseRows: testCaseRows,
      produceOutputIdx: idx,
    });

    const url = constants.PRODUCE_OUTPUT_URL;
    const token = getCurrentUserToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15 * 1000,
    };
    const request = {
      problemId: this.state.problemId,
      input: this.state.testCaseRows[idx].input,
      language: this.state.testCaseRows[idx].produceOutputLanguage,
      code: this.getPrimarySolution(this.state.testCaseRows[idx].produceOutputLanguage.toLowerCase()),
    };

    axios
      .post(url, request, config)
      .then((res) => {
        this.setState({
          produceOutputToken: res.data.token,
        });
      })
      .catch((err) => {
        if (err.message.includes("timeout")) {
          showErrorToast("Timed Out", "Please try again or report this issue.");
          const testCaseRows = this.state.testCaseRows;
          testCaseRows[idx].produceOutputLoading = false;
          this.setState({
            testCaseRows: testCaseRows,
            produceOutputToken: "",
            produceOutputIdx: -1,
          });
        }
      });
  }

  handleAddRow(section) {
    if (section === "argument") {
      const item = {
        type: "",
        underlyingType: "",
        underlyingType2: "",
      };
      this.setState({
        argumentRows: [...this.state.argumentRows, item],
      });
    } else if (section === "intuition") {
      const item = {
        name: "",
        time: 0,
        isQuiz: false,
        content: "",
      };
      this.setState({
        intuitionRows: [...this.state.intuitionRows, item],
      });
    } else if (section === "solution") {
      const item = {
        name: "",
        isPrimary: false,
        description: "",
        language: "python",
        code: {
          python: "",
          java: "",
          javascript: "",
        },
      };
      this.setState({
        solutionRows: [...this.state.solutionRows, item],
      });
    } else if (section === "testCase") {
      const item = {
        name: "",
        isDefault: false,
        input: "",
        output: "",
      };
      this.setState({
        testCaseRows: [...this.state.testCaseRows, item],
      });
    }
  }

  handleRemoveRow(section) {
    if (section === "argument" && this.state.argumentRows.length > 1) {
      this.setState({
        argumentRows: this.state.argumentRows.slice(0, -1),
      });
    } else if (section === "intuition" && this.state.intuitionRows.length > 1) {
      this.setState({
        intuitionRows: this.state.intuitionRows.slice(0, -1),
      });
    } else if (section === "solution" && this.state.solutionRows.length > 1) {
      this.setState({
        solutionRows: this.state.solutionRows.slice(0, -1),
      });
    } else if (section === "testCase" && this.state.testCaseRows.length > 1) {
      this.setState({
        testCaseRows: this.state.testCaseRows.slice(0, -1),
      });
    }
  }

  handleSubmit() {
    if (this.state.submitStatus === "loading") {
      return;
    }

    this.setState({
      submitStatus: "loading",
    });

    const problemSteps = [];
    this.state.intuitionRows.forEach((row) => {
      const problemStep = {
        name: row.name,
        type: row.isQuiz ? "QUIZ" : "TEXT",
        content: row.content,
        time: row.time,
      };
      // @ts-ignore
      problemSteps.push(problemStep);
    });

    const solutions = [];
    this.state.solutionRows.forEach((row) => {
      const solution = {
        name: row.name,
        isPrimary: row.isPrimary,
        description: row.description,
        pythonCode: row.code.python,
        javaCode: row.code.java,
        javascriptCode: row.code.javascript,
      };
      // @ts-ignore
      solutions.push(solution);
    });

    const body = {
      name: this.state.name,
      urlName: this.state.urlName,
      plusOnly: this.state.plusOnly,
      category: this.state.category,
      difficulty: this.state.difficulty,
      description: this.state.description,
      pythonCode: this.state.defaultCode.python,
      javaCode: this.state.defaultCode.java,
      javascriptCode: this.state.defaultCode.javascript,
      returnType: this.state.returnType,
      arguments: this.state.argumentRows,
      problemSteps: problemSteps,
      testCases: this.state.testCaseRows,
      solutions: solutions,
    };

    let request: {};
    let url = constants.CMS_PROBLEM_URL;
    if (this.props.router.query.id) {
      // edit
      request = {
        id: this.props.router.query.id,
        problem: body,
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
        this.setState({
          submitStatus: "error",
          message: error.response.data || { message: "Error", details: [error.message] },
        });
      });
  }

  categories = [
    { value: "ARRAYS", text: "Arrays" },
    { value: "STRINGS", text: "Strings" },
    { value: "LINKED_LISTS", text: "Linked Lists" },
    { value: "STACKS", text: "Stacks" },
    { value: "QUEUES", text: "Queues" },
    { value: "TREES", text: "Trees" },
    { value: "GRAPHS", text: "Graphs" },
    { value: "BIT_MANIPULATION", text: "Bit Manipulation" },
    { value: "MATH", text: "Math" },
    { value: "BACKTRACKING", text: "Backtracking" },
    { value: "GREEDY", text: "Greedy" },
    { value: "DYNAMIC_PROGRAMMING", text: "Dynamic Programming" },
  ];

  difficulties = [
    { value: "BEGINNER", text: "Beginner" },
    { value: "EASY", text: "Easy" },
    { value: "MEDIUM", text: "Medium" },
    { value: "HARD", text: "Hard" },
  ];

  types = [
    { value: "STRING", text: "String" },
    { value: "INTEGER", text: "Integer" },
    { value: "FLOAT", text: "Float (Double)" },
    { value: "BOOLEAN", text: "Boolean" },
    { value: "LIST", text: "List" },
    { value: "ARRAY_2D", text: "2D Array" },
    { value: "LIST_OF_LISTS", text: "List of Lists" },
    { value: "DICTIONARY", text: "Dictionary (Map)" },
    { value: "TREE", text: "Binary Tree" },
    { value: "LINKED_LIST", text: "Linked List" },
  ];

  underlyingTypes = [
    { value: "NONE", text: "None" },
    { value: "STRING", text: "String" },
    { value: "INTEGER", text: "Integer" },
    { value: "FLOAT", text: "Float (Double)" },
    { value: "BOOLEAN", text: "Boolean" },
  ];

  languages = [
    { value: "PYTHON", text: "Python" },
    { value: "JAVA", text: "Java" },
    { value: "JAVASCRIPT", text: "JavaScript" },
  ];

  render() {
    const { router } = this.props;

    if (this.state.preLoading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

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
      <>
        <Form>
          <StyledGrid>
            <GridRow centered>
              <Header as="h1">{this.props.router.query.id ? "CMS: Edit Problem" : "CMS: Add New Problem"}</Header>
            </GridRow>
            <Divider />
            {/* ----- PROBLEM INFO ----- */}
            <GridRow>
              <StyledSegment raised>
                <Grid stackable>
                  <GridRow centered>
                    <Header>Problem Info</Header>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={8}>
                      <Label>Name</Label>
                      <Input
                        value={this.state.name}
                        onChange={(e) => {
                          this.setState({ name: e.target.value });
                        }}
                        fluid
                      />
                    </GridColumn>
                    <GridColumn width={8}>
                      <Label>URL Name</Label>
                      <Input
                        value={this.state.urlName}
                        onChange={(e) => {
                          this.setState({ urlName: e.target.value });
                        }}
                        fluid
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={4}>
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
                    <GridColumn width={6}>
                      <Label>Category</Label>
                      <Dropdown
                        value={this.state.category}
                        options={this.categories}
                        onChange={(event, data) => {
                          this.setState({ category: data.value });
                        }}
                        selection
                        fluid
                      />
                    </GridColumn>
                    <GridColumn width={6}>
                      <Label>Difficulty</Label>
                      <Dropdown
                        value={this.state.difficulty}
                        options={this.difficulties}
                        onChange={(event, data) => {
                          this.setState({ difficulty: data.value });
                        }}
                        selection
                        fluid
                      />
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={8}>
                      <Label>Description</Label>
                      <TextArea
                        value={this.state.description}
                        rows={10}
                        onChange={(e, { value }) => {
                          this.setState({ description: value });
                        }}
                      />
                    </GridColumn>
                    <GridColumn width={8}>
                      <Label>Description Preview</Label>
                      <Segment raised>
                        <MarkdownRender source={this.state.description} />
                      </Segment>
                    </GridColumn>
                  </GridRow>
                  <GridRow>
                    <GridColumn width={16}>
                      <Label>Default Code</Label>
                      <Menu pointing>
                        <Menu.Item
                          name="python"
                          active={this.state.defaultCodeLanguage === "python"}
                          onClick={(e, { name }) => {
                            this.handleDefaultCodeLanguageClick(name);
                          }}
                        />
                        <Menu.Item
                          name="java"
                          active={this.state.defaultCodeLanguage === "java"}
                          onClick={(e, { name }) => {
                            this.handleDefaultCodeLanguageClick(name);
                          }}
                        />
                        <Menu.Item
                          name="javascript"
                          active={this.state.defaultCodeLanguage === "javascript"}
                          onClick={(e, { name }) => {
                            this.handleDefaultCodeLanguageClick(name);
                          }}
                        />
                      </Menu>
                      <AceEditor
                        width="100%"
                        height="150px"
                        mode={this.state.defaultCodeLanguage}
                        theme="xcode"
                        value={this.state.defaultCode[this.state.defaultCodeLanguage]}
                        editorProps={{ $blockScrolling: true }}
                        onChange={(newValue) => {
                          this.handleDefaultCodeChange(newValue);
                        }}
                        setOptions={{
                          enableBasicAutocompletion: true,
                          enableLiveAutocompletion: true,
                          showLineNumbers: true,
                          tabSize: 4,
                          useWorker: false,
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                </Grid>
              </StyledSegment>
            </GridRow>
            <Divider />
            {/* ----- ARGUMENTS ----- */}
            {this.state.argumentRows.map((item, idx) => (
              <GridRow key={idx}>
                <StyledSegment raised>
                  <Grid stackable>
                    <GridRow centered>
                      <Header>Argument {idx + 1}</Header>
                    </GridRow>
                    <GridRow columns={3}>
                      <GridColumn>
                        <Label>Type</Label>
                        <Dropdown
                          value={this.state.argumentRows[idx].type}
                          options={this.types}
                          onChange={(event, data) => {
                            this.handleArgumentFieldChange(idx, data.value, "type");
                          }}
                          selection
                          fluid
                        />
                      </GridColumn>
                      <GridColumn>
                        <Label>Underlying Type</Label>
                        <Dropdown
                          value={this.state.argumentRows[idx].underlyingType}
                          options={this.underlyingTypes}
                          onChange={(event, data) => {
                            this.handleArgumentFieldChange(idx, data.value, "underlyingType");
                          }}
                          selection
                          fluid
                        />
                      </GridColumn>
                      <GridColumn>
                        <Label>Underlying Type 2 (Dictionary)</Label>
                        <Dropdown
                          value={this.state.argumentRows[idx].underlyingType2}
                          options={this.underlyingTypes}
                          onChange={(event, data) => {
                            this.handleArgumentFieldChange(idx, data.value, "underlyingType2");
                          }}
                          selection
                          fluid
                        />
                      </GridColumn>
                    </GridRow>
                  </Grid>
                </StyledSegment>
              </GridRow>
            ))}
            <GridRow centered>
              <RedButton onClick={() => this.handleRemoveRow("argument")}>Remove Argument</RedButton>
              <GreenButton onClick={() => this.handleAddRow("argument")}>Add Argument</GreenButton>
            </GridRow>
            <Divider />
            {/* ----- RETURN TYPE ----- */}
            <GridRow>
              <StyledSegment raised>
                <Grid stackable>
                  <GridRow centered>
                    <Header>Return Type</Header>
                  </GridRow>
                  <GridRow columns={4}>
                    <GridColumn>
                      <Label>Type</Label>
                      <Dropdown
                        value={this.state.returnType.type}
                        options={this.types}
                        onChange={(event, data) => {
                          this.handleReturnTypeFieldChange(data.value, "type");
                        }}
                        selection
                        fluid
                      />
                    </GridColumn>
                    <GridColumn>
                      <Label>Underlying Type</Label>
                      <Dropdown
                        value={this.state.returnType.underlyingType}
                        options={this.underlyingTypes}
                        onChange={(event, data) => {
                          this.handleReturnTypeFieldChange(data.value, "underlyingType");
                        }}
                        selection
                        fluid
                      />
                    </GridColumn>
                    <GridColumn>
                      <Label>Underlying Type 2 (Dictionary)</Label>
                      <Dropdown
                        value={this.state.returnType.underlyingType2}
                        options={this.underlyingTypes}
                        onChange={(event, data) => {
                          this.handleReturnTypeFieldChange(data.value, "underlyingType2");
                        }}
                        selection
                        fluid
                      />
                    </GridColumn>
                    <GridColumn>
                      <Label>Order Matters</Label>
                      <Radio
                        toggle
                        checked={this.state.returnType.orderMatters}
                        onChange={() => {
                          this.handleReturnTypeFieldChange(!this.state.returnType.orderMatters, "orderMatters");
                        }}
                      />
                    </GridColumn>
                  </GridRow>
                </Grid>
              </StyledSegment>
            </GridRow>
            <Divider />
            {/* ----- INTUITION STEPS ----- */}
            {this.state.intuitionRows.map((item, idx) => (
              <GridRow key={idx}>
                <StyledSegment raised>
                  <Grid stackable>
                    <GridRow centered>
                      <Header>Intuition Step {idx + 1}</Header>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={10}>
                        <Label>Name</Label>
                        <Input
                          value={this.state.intuitionRows[idx].name}
                          onChange={(e) => {
                            this.handleIntuitionFieldChange(idx, e.target.value, "name");
                          }}
                          fluid
                        />
                      </GridColumn>
                      <GridColumn width={3}>
                        <Label>Time</Label>
                        <Input
                          type="number"
                          value={this.state.intuitionRows[idx].time}
                          label={{ basic: true, content: "mins." }}
                          labelPosition="right"
                          onChange={(e) => this.handleIntuitionFieldChange(idx, e.target.value, "time")}
                          fluid
                        />
                      </GridColumn>
                      <GridColumn width={3}>
                        <Label>Text or Quiz</Label>
                        <RadioDiv>
                          <RadioLeftLabel>Text</RadioLeftLabel>
                          <Radio
                            toggle
                            checked={this.state.intuitionRows[idx].isQuiz}
                            onChange={() => {
                              this.handleIntuitionFieldChange(idx, !this.state.intuitionRows[idx].isQuiz, "isQuiz");
                            }}
                          />
                          <RadioRightLabel>Quiz</RadioRightLabel>
                        </RadioDiv>
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        <Label>
                          Content
                          {item.isQuiz && (
                            <TemplateSpan
                              onClick={() => this.handleIntuitionFieldChange(idx, QUIZ_TEMPLATE, "content")}
                            >
                              Fill Template
                            </TemplateSpan>
                          )}
                        </Label>
                        {item.isQuiz ? (
                          <AceEditor
                            width="100%"
                            height="550px"
                            mode="json"
                            theme="xcode"
                            value={item.content}
                            onChange={(newValue) => this.handleIntuitionFieldChange(idx, newValue, "content")}
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
                            value={item.content}
                            rows={10}
                            onChange={(e, { value }) => {
                              this.handleIntuitionFieldChange(idx, value, "content");
                            }}
                          />
                        )}
                      </GridColumn>
                      <GridColumn width={8}>
                        <Label>Content Preview</Label>
                        <Segment raised>
                          {item.isQuiz ? (
                            isJsonArray(item.content) ? (
                              <Quiz quiz={wrapQuestions(item.content)} />
                            ) : (
                              <div>Quiz not formatted properly</div>
                            )
                          ) : (
                            <MarkdownRender source={item.content} />
                          )}
                        </Segment>
                      </GridColumn>
                    </GridRow>
                  </Grid>
                </StyledSegment>
              </GridRow>
            ))}
            <GridRow centered>
              <RedButton onClick={() => this.handleRemoveRow("intuition")}>Remove Intuition Step</RedButton>
              <GreenButton onClick={() => this.handleAddRow("intuition")}>Add Intuition Step</GreenButton>
            </GridRow>
            <Divider />
            {/* ----- SOLUTIONS ----- */}
            {this.state.solutionRows.map((item, idx) => (
              <GridRow key={idx}>
                <StyledSegment raised>
                  <Grid stackable>
                    <GridRow centered>
                      <Header>Solution {idx + 1}</Header>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={12}>
                        <Label>Name</Label>
                        <Input
                          value={this.state.solutionRows[idx].name}
                          onChange={(e) => {
                            this.handleSolutionFieldChange(idx, e.target.value, "name");
                          }}
                          fluid
                        />
                      </GridColumn>
                      <GridColumn width={4}>
                        <Label>Is Primary</Label>
                        <RadioDiv>
                          <RadioLeftLabel>Not Primary</RadioLeftLabel>
                          <Radio
                            toggle
                            checked={this.state.solutionRows[idx].isPrimary}
                            onChange={() => {
                              this.handleSolutionFieldChange(idx, !this.state.solutionRows[idx].isPrimary, "isPrimary");
                            }}
                          />
                          <RadioRightLabel>Primary</RadioRightLabel>
                        </RadioDiv>
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        <Label>Description</Label>
                        <TextArea
                          value={this.state.solutionRows[idx].description}
                          onChange={(e, { value }) => {
                            this.handleSolutionFieldChange(idx, value, "description");
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Label>Description Preview</Label>
                        <Segment raised>
                          <MarkdownRender source={this.state.solutionRows[idx].description} />
                        </Segment>
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={16}>
                        <Label>Code</Label>
                        <Menu pointing>
                          <Menu.Item
                            name="python"
                            active={this.state.solutionRows[idx].language === "python"}
                            onClick={(e, { name }) => this.handleSolutionFieldChange(idx, name, "language")}
                          />
                          <Menu.Item
                            name="java"
                            active={this.state.solutionRows[idx].language === "java"}
                            onClick={(e, { name }) => this.handleSolutionFieldChange(idx, name, "language")}
                          />
                          <Menu.Item
                            name="javascript"
                            active={this.state.solutionRows[idx].language === "javascript"}
                            onClick={(e, { name }) => this.handleSolutionFieldChange(idx, name, "language")}
                          />
                        </Menu>
                        <AceEditor
                          width="100%"
                          height="400px"
                          mode={this.state.solutionRows[idx].language}
                          theme="xcode"
                          value={this.state.solutionRows[idx].code[this.state.solutionRows[idx].language]}
                          editorProps={{ $blockScrolling: true }}
                          onChange={(value) => this.handleSolutionCodeChange(idx, value)}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            tabSize: 4,
                            useWorker: false,
                          }}
                        />
                      </GridColumn>
                    </GridRow>
                  </Grid>
                </StyledSegment>
              </GridRow>
            ))}
            <GridRow centered>
              <RedButton onClick={() => this.handleRemoveRow("solution")}>Remove Solution</RedButton>
              <GreenButton onClick={() => this.handleAddRow("solution")}>Add Solution</GreenButton>
            </GridRow>
            <Divider />
            {/* ----- TEST CASES ----- */}
            {this.state.testCaseRows.map((item, idx) => (
              <GridRow key={idx}>
                <StyledSegment raised>
                  <Grid stackable>
                    <GridRow centered>
                      <Header>Test Case {idx + 1}</Header>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={12}>
                        <Label>Name</Label>
                        <Input
                          value={this.state.testCaseRows[idx].name}
                          onChange={(e) => {
                            this.handleTestCaseFieldChange(idx, e.target.value, "name");
                          }}
                          fluid
                        />
                      </GridColumn>
                      <GridColumn width={4}>
                        <Label>Is Default</Label>
                        <RadioDiv>
                          <RadioLeftLabel>Not Default</RadioLeftLabel>
                          <Radio
                            toggle
                            checked={this.state.testCaseRows[idx].isDefault}
                            onChange={() => {
                              this.handleTestCaseFieldChange(idx, !this.state.testCaseRows[idx].isDefault, "isDefault");
                            }}
                          />
                          <RadioRightLabel>Default</RadioRightLabel>
                        </RadioDiv>
                      </GridColumn>
                    </GridRow>
                    <GridRow verticalAlign="middle">
                      <GridColumn width={7}>
                        <Label>Input</Label>
                        <AceEditor
                          width="100%"
                          height="150px"
                          mode="plain_text"
                          theme="xcode"
                          value={this.state.testCaseRows[idx].input}
                          editorProps={{ $blockScrolling: true }}
                          onChange={(value) => this.handleTestCaseFieldChange(idx, value, "input")}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            tabSize: 4,
                            useWorker: false,
                          }}
                          style={{ marginTop: 5 }}
                        />
                      </GridColumn>
                      <GridColumn width={2} textAlign="center">
                        <GridRow>
                          <Dropdown
                            value={this.state.testCaseRows[idx].produceOutputLanguage}
                            options={this.languages}
                            onChange={(event, data) => {
                              this.handleTestCaseFieldChange(idx, data.value, "produceOutputLanguage");
                            }}
                            selection
                            fluid
                          />
                        </GridRow>
                        <GridRow style={{ marginTop: 10 }}>
                          <GrayButton
                            type="button"
                            loading={this.state.testCaseRows[idx].produceOutputLoading}
                            onClick={() => this.handleProduceOutput(idx)}
                            content="Produce Output"
                          />
                        </GridRow>
                      </GridColumn>
                      <GridColumn width={7}>
                        <Label>Output (not necessary - just for verification)</Label>
                        <AceEditor
                          width="100%"
                          height="150px"
                          mode="plain_text"
                          theme="xcode"
                          value={this.state.testCaseRows[idx].output}
                          editorProps={{ $blockScrolling: true }}
                          onChange={(value) => this.handleTestCaseFieldChange(idx, value, "output")}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            showLineNumbers: true,
                            tabSize: 4,
                            useWorker: false,
                          }}
                          style={{ marginTop: 5 }}
                        />
                      </GridColumn>
                    </GridRow>
                  </Grid>
                </StyledSegment>
              </GridRow>
            ))}
            <GridRow centered>
              <RedButton onClick={() => this.handleRemoveRow("testCase")}>Remove Test Case</RedButton>
              <GreenButton onClick={() => this.handleAddRow("testCase")}>Add Test Case</GreenButton>
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
                <Link href="/admin/cms/problems">
                  <Button primary>Back</Button>
                </Link>
              </GridRow>
            ) : (
              <GridRow centered>
                <Link href="/admin/cms/problems">
                  <RedButton>{router.query.id ? "Back" : "Cancel"}</RedButton>
                </Link>
                {router.query.id && (
                  <GrayButton
                    onClick={() => window.open(constants.WEB_BASE_URL + "/problem/" + this.state.urlName, "_blank")}
                  >
                    Preview
                  </GrayButton>
                )}
                <Button primary loading={this.state.submitStatus === "loading"} onClick={() => this.handleSubmit()}>
                  Save Problem
                </Button>
              </GridRow>
            )}
          </StyledGrid>
        </Form>
      </>
    );
  }
}

export default withRouter(withGlobalContext(ProblemAdd));
