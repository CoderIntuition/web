import React from "react";
import { NextRouter, withRouter } from "next/router";
import Image from "next/image";
import _ from "lodash";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import {
  Card,
  CardGroup,
  Grid,
  Header,
  Loader,
  Search,
} from "semantic-ui-react";
// import array from "assets/graphics/array.svg";
// import string from "assets/graphics/string.svg";
// import linkedList from "assets/graphics/linkedlist.svg";
// import stack from "assets/graphics/stack.svg";
// import queue from "assets/graphics/queue.svg";
// import tree from "assets/graphics/tree.svg";
// import graph from "assets/graphics/graph.svg";
// import backtracking from "assets/graphics/backtracking.svg";
// import dp from "assets/graphics/dp.svg";
import axios from "axios";
import { constants } from "common/constants";
import { StyledGrid, StyledImage, StyledInput } from "./overview-styles";

interface OverviewProps {
  router: NextRouter;
}

class Overview extends React.Component<OverviewProps> {
  state = {
    loading: true,
    results: {} as any,
    searching: false,
    searchValue: "",
    searchResults: {} as any,
  };

  componentDidMount() {
    window.scrollTo(0, 0);

    axios.get(constants.ALL_PROBLEMS_URL).then((res) => {
      this.setState({
        loading: false,
        results: res.data,
      });
    });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ searching: true, searchValue: value });

    setTimeout(() => {
      if (this.state.searchValue.length < 1)
        return this.setState({ searching: false, searchResults: [] });

      const re = new RegExp(_.escapeRegExp(this.state.searchValue), "i");
      const isMatch = (result) => {
        return re.test(result.name);
      };

      const filteredResults = _.reduce(
        this.state.results,
        (memo, data, name) => {
          let results = _.filter(data.results, isMatch);
          results = _.map(results, (result) => {
            return {
              title: result.name,
              category: result.category,
              urlName: result.urlName,
            };
          });
          if (results.length) memo[name] = { name, results };
          return memo;
        },
        {}
      );

      this.setState({
        searching: false,
        searchResults: filteredResults,
      });
    }, 300);
  };

  render() {
    if (this.state.loading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    return (
      <>
        <ProblemsSidebar active="overview">
          <Grid.Row>
            <StyledGrid>
              <Grid.Row>
                <Header as="h2">Overview</Header>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <Search
                    category
                    loading={this.state.searching}
                    value={this.state.searchValue}
                    onResultSelect={(e, { result }) =>
                      this.props.router.push("/problem/" + result.urlName)
                    }
                    onSearchChange={
                      _.debounce(this.handleSearchChange, 500, {
                        leading: true,
                      }) as any
                    }
                    results={this.state.searchResults}
                    input={
                      <StyledInput placeholder="Search for a problem" size="large" />
                    }
                    style={{marginLeft: -12}}
                  />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <CardGroup>
                  <Card raised onClick={() => this.props.router.push("/problems/arrays")}>
                    <Image src="/images/array.svg" width="300px" height="300px" />
                    <Card.Content>
                      <Card.Header>Arrays</Card.Header>
                      <Card.Description>
                        Problems related to manipulating arrays
                      </Card.Description>
                    </Card.Content>
                  </Card>
                  {/*<Card raised onClick={() => this.props.router.push("/problems/strings")}>*/}
                  {/*  <StyledImage src={string} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Strings</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems related to manipulating strings*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                  {/*<Card*/}
                  {/*  raised*/}
                  {/*  onClick={() => this.props.router.push("/problems/linked-lists")}*/}
                  {/*>*/}
                  {/*  <StyledImage src={linkedList} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Linked Lists</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems related to traversing and manipulating linked*/}
                  {/*      lists*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                  {/*<Card raised onClick={() => this.props.router.push("/problems/stacks")}>*/}
                  {/*  <StyledImage src={stack} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Stacks</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems related to using stacks to solve problems*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                  {/*<Card raised onClick={() => this.props.router.push("/problems/queues")}>*/}
                  {/*  <StyledImage src={queue} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Queues</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems related to using queues to solve problems*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                  {/*<Card raised onClick={() => this.props.router.push("/problems/trees")}>*/}
                  {/*  <StyledImage src={tree} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Trees</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems related to traversing trees*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                  {/*<Card raised onClick={() => this.props.router.push("/problems/graphs")}>*/}
                  {/*  <StyledImage src={graph} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Graphs</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems related to traversing graphs*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                  {/*<Card*/}
                  {/*  raised*/}
                  {/*  onClick={() => this.props.router.push("/problems/backtracking")}*/}
                  {/*>*/}
                  {/*  <StyledImage src={backtracking} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Backtracking</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems involving backtracking and recursion*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                  {/*<Card*/}
                  {/*  raised*/}
                  {/*  onClick={() => this.props.router.push("/problems/greedy")}*/}
                  {/*  header="Greedy"*/}
                  {/*  description="Problems that are solved using a greedy approach"*/}
                  {/*/>*/}
                  {/*<Card*/}
                  {/*  raised*/}
                  {/*  onClick={() => this.props.router.push("/problems/dynamic-programming")}*/}
                  {/*>*/}
                  {/*  <StyledImage src={dp} wrapped ui={false} />*/}
                  {/*  <Card.Content>*/}
                  {/*    <Card.Header>Dynamic Programming</Card.Header>*/}
                  {/*    <Card.Description>*/}
                  {/*      Problems that are can be optimized using a dynamic*/}
                  {/*      programming approach*/}
                  {/*    </Card.Description>*/}
                  {/*  </Card.Content>*/}
                  {/*</Card>*/}
                </CardGroup>
              </Grid.Row>
            </StyledGrid>
          </Grid.Row>
        </ProblemsSidebar>
      </>
    );
  }
}

export default withRouter(Overview);
