import React from "react";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import { Button, Grid, Icon, Loader, Message, Pagination, Search, Table } from "semantic-ui-react";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import { constants } from "common/constants";
import { capitalize, withGlobalContext } from "common/utils";
import _ from "lodash";
import {
  GrayBackground,
  Heading,
  HeadingSection,
  SearchInput,
  StyledGrid,
  Subheading,
  TitleSection,
  TitleSpacer,
} from "./overview-styles";
import { NotFoundWrapper } from "./problems-styles";

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

interface SimpleProblem {
  id: number;
  name: string;
  urlName: string;
  category: string;
  difficulty: string;
  plusOnly: boolean;
  totalPages: number;
}

interface ProblemsState {
  loading: boolean;
  notFound: boolean;
  page: number;
  totalPages: number;
  problems: SimpleProblem[] | [];
  searching: boolean;
  searchValue: string;
  searchResults: SimpleProblem[] | [];
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
      searchResults: [],
    };
  }

  fetchProblems(page, category) {
    this.setState({ loading: true });
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
          loading: false,
          problems: res.data.problems,
          totalPages: res.data.totalPages,
        });
      })
      .catch((_err) => {
        this.setState({
          loading: false,
        });
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
        this.fetchProblems(this.state.page, category);
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
      this.fetchProblems(this.state.page, category);
    }
  }

  handlePageChange = (e, props) => {
    const { category } = this.props.router.query;

    this.fetchProblems(props.activePage, category);
    this.setState({
      page: props.activePage,
    });
  };

  handleSearchChange = (e, { value }) => {
    this.setState({ searching: true, searchValue: value });

    setTimeout(() => {
      if (this.state.searchValue.length < 1) {
        return this.setState({ searching: false, searchResults: [] });
      }

      const re = new RegExp(_.escapeRegExp(this.state.searchValue), "i");
      const isMatch = (result) => {
        return re.test(result.title);
      };

      const filteredResults = _.filter(this.state.problems, isMatch);

      this.setState({
        searching: false,
        searchResults: filteredResults,
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

    return (
      <GrayBackground>
        <div>
          <ProblemsSidebar active={category ? category : ""}>
            <>
              <TitleSection>
                <HeadingSection>
                  <Subheading>CATEGORY</Subheading>
                  <Heading>{categories[category]}</Heading>
                </HeadingSection>
                <TitleSpacer />
                <Search
                  category
                  loading={this.state.searching}
                  value={this.state.searchValue}
                  onResultSelect={(e, { result }) => this.props.router.push("/problem/" + result.urlName)}
                  onSearchChange={
                    _.debounce(this.handleSearchChange, 500, {
                      leading: true,
                    }) as any
                  }
                  results={this.state.searchResults}
                  input={<SearchInput placeholder="Search for a problem" />}
                />
              </TitleSection>
              <StyledGrid>
                {this.state.loading ? (
                  <Loader active inverted size="large">
                    Loading
                  </Loader>
                ) : (
                  <Grid.Row>
                    <Table padded selectable style={{ marginBottom: 70, minWidth: 600, marginRight: 10 }}>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell colSpan="4" verticalAlign="middle"></Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                          <Table.HeaderCell className="second" width={1} style={{ paddingLeft: 30 }}>
                            ID
                          </Table.HeaderCell>
                          <Table.HeaderCell className="second" width={10}>
                            Name
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
                        {(this.state.problems as any[]).map((problem, i) => (
                          <Table.Row key={i} onClick={() => router.push("/problem/" + problem.urlName)}>
                            <Table.Cell style={{ paddingLeft: 30 }}>{problem.id}</Table.Cell>
                            <Table.Cell>{problem.name}</Table.Cell>
                            <Table.Cell>{capitalize(problem.category)}</Table.Cell>
                            <Table.Cell>{capitalize(problem.difficulty)}</Table.Cell>
                          </Table.Row>
                        ))}
                        <Table.Row disabled>
                          <Table.Cell />
                          <Table.Cell />
                          <Table.Cell />
                          <Table.Cell />
                        </Table.Row>
                      </Table.Body>
                    </Table>
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
                  </Grid.Row>
                )}
              </StyledGrid>
            </>
          </ProblemsSidebar>
        </div>
      </GrayBackground>
    );
  }
}

export default withRouter(withGlobalContext(Problems));
