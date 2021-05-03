import React from "react";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import _ from "lodash";
import { Button, Grid, Icon, Label, Loader, Message, Pagination, Segment, Table } from "semantic-ui-react";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import { constants } from "common/constants";
import { capitalize, getDifficultyColor, withGlobalContext } from "common/utils";
import { SimpleProblem } from "common/types";
import { GrayBackground, Heading, HeadingSection, Subheading } from "./overview-styles";
import { BottomRow, FirstRow, NotFoundWrapper, SearchInput, StyledGrid } from "./problems-styles";
import Head from "next/head";

const categories = {
  arrays: "Arrays",
  strings: "Strings",
  "linked-lists": "Linked Lists",
  stacks: "Stacks",
  queues: "Queues",
  trees: "Trees",
  graphs: "Graphs",
  "bit-manipulation": "Bit Manipulation",
  math: "Math",
  backtracking: "Backtracking",
  greedy: "Greedy",
  "dynamic-programming": "Dynamic Programming",
};

interface ProblemsProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
}

interface ProblemsState {
  loading: boolean;
  notFound: boolean;
  page: number;
  totalPages: number;
  problems: SimpleProblem[];
  searching: boolean;
  searchValue: string;
  searchedProblems: SimpleProblem[];
}

class Problems extends React.Component<ProblemsProps, ProblemsState> {
  constructor(props) {
    super(props);

    this.state = {
      notFound: false,
      loading: false,
      page: 1,
      problems: [],
      totalPages: 0,
      searching: false,
      searchValue: "",
      searchedProblems: [],
    };
  }

  fetchProblems(page, category, doLoad) {
    if (doLoad) this.setState({ loading: true });
    category = category.replace("-", "_");

    axios
      .get(constants.PROBLEMS_URL + category, {
        params: {
          page: page - 1,
          size: 8,
        },
      })
      .then((res) => {
        this.setState({
          problems: res.data.problems,
          totalPages: res.data.totalPages,
          searchedProblems: res.data.problems,
        });
        if (doLoad) {
          this.setState({ loading: false });
        }
      })
      .catch((_err) => {
        if (doLoad) {
          this.setState({ loading: false });
        }
      });
  }

  componentDidUpdate(prevProps) {
    const { category } = this.props.router.query;

    if (category !== prevProps.router.query.category) {
      window.scrollTo(0, 0);
      if (category && !categories[category as string]) {
        this.setState({
          notFound: true,
        });
      } else {
        this.setState({
          page: 1,
          totalPages: 0,
        });
        this.fetchProblems(this.state.page, category, true);
      }
    }
  }

  componentDidMount() {
    const { category } = this.props.router.query;

    if (category && !categories[category as string]) {
      this.setState({
        notFound: true,
      });
    } else {
      this.fetchProblems(this.state.page, category, true);
    }
  }

  handlePageChange = (e, props) => {
    const { category } = this.props.router.query;

    this.fetchProblems(props.activePage, category, false);
    this.setState({
      page: props.activePage,
    });
  };

  handleSearchChange = (e) => {
    this.setState({ searching: true, searchValue: e.target.value });

    setTimeout(() => {
      if (this.state.searchValue.length < 1) {
        return this.setState({ searching: false, searchedProblems: this.state.problems });
      }

      const re = new RegExp(_.escapeRegExp(this.state.searchValue), "i");
      const isMatch = (result) => {
        return re.test(result.name);
      };

      this.setState({
        searching: false,
        searchedProblems: _.filter(this.state.problems, isMatch),
      });
    }, 300);
  };

  render() {
    const { router } = this.props;
    const category = router.query.category as string;

    if (this.state.notFound) {
      return (
        <NotFoundWrapper>
          <Message error>Error: Category not found.</Message>
          <Button primary onClick={() => router.back()}>
            Back
          </Button>
        </NotFoundWrapper>
      );
    }

    if (this.state.loading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    return (
      <GrayBackground>
        <Head>
          <title>Problems: {categories[category]}</title>
          <meta
            charSet="utf-8"
            name="description"
            content={"Problems under the " + categories[category] + " category."}
          />
          <link rel="canonical" href="https://www.coderintuition.com/problems" />
        </Head>
        <ProblemsSidebar active={category ? category : ""}>
          <>
            <HeadingSection>
              <Subheading>CATEGORY</Subheading>
              <Heading>{categories[category]}</Heading>
            </HeadingSection>
            <Segment raised style={{ padding: 0, margin: 10 }}>
              <StyledGrid>
                <FirstRow>
                  <Grid.Column floated="left" verticalAlign="middle" width={8}>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#595f6b" }}>
                      You have{" "}
                      <Label circular color={this.state.problems.length > 0 ? "yellow" : "green"}>
                        &nbsp;{this.state.problems.length}&nbsp;
                      </Label>{" "}
                      problems to try!
                    </span>
                  </Grid.Column>
                  <Grid.Column floated="right" width={8}>
                    <SearchInput
                      placeholder="Search for a problem"
                      loading={this.state.searching}
                      onChange={_.debounce(this.handleSearchChange, 500, {
                        leading: true,
                      })}
                    />
                  </Grid.Column>
                </FirstRow>
                <Grid.Row centered>
                  <Table padded selectable style={{ width: "92%" }}>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell className="second" width={10} style={{ paddingLeft: 20 }}>
                          Problem Name
                        </Table.HeaderCell>
                        <Table.HeaderCell className="second" width={3}>
                          Category
                        </Table.HeaderCell>
                        <Table.HeaderCell className="second" width={2}>
                          Difficulty
                        </Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {this.state.searchedProblems.map((problem, i) => (
                        <Table.Row key={i} onClick={() => router.push("/problem/" + problem.urlName)}>
                          <Table.Cell style={{ paddingLeft: 20 }}>{problem.name}</Table.Cell>
                          <Table.Cell>
                            <Label circular>{categories[category]}</Label>
                          </Table.Cell>
                          <Table.Cell>
                            <Label color={getDifficultyColor(problem.difficulty)} circular>
                              {capitalize(problem.difficulty)}
                            </Label>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                    <Table.Footer />
                  </Table>
                </Grid.Row>
                <BottomRow centered>
                  <Pagination
                    defaultActivePage={1}
                    ellipsisItem={null}
                    firstItem={null}
                    lastItem={null}
                    prevItem={{
                      content: <Icon name="angle left" />,
                      icon: true,
                    }}
                    nextItem={{
                      content: <Icon name="angle right" />,
                      icon: true,
                    }}
                    totalPages={this.state.totalPages}
                    onPageChange={this.handlePageChange}
                  />
                </BottomRow>
              </StyledGrid>
            </Segment>
          </>
        </ProblemsSidebar>
      </GrayBackground>
    );
  }
}

export default withRouter(withGlobalContext(Problems));
