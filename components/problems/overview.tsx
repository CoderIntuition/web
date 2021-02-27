import React from "react";
import { NextRouter, withRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import _ from "lodash";
import { Card, CardGroup, Grid, Loader, Search } from "semantic-ui-react";
// import array from "assets/graphics/array.svg";
// import string from "assets/graphics/string.svg";
// import linkedList from "assets/graphics/linkedlist.svg";
// import stack from "assets/graphics/stack.svg";
// import queue from "assets/graphics/queue.svg";
// import tree from "assets/graphics/tree.svg";
// import graph from "assets/graphics/graph.svg";
// import backtracking from "assets/graphics/backtracking.svg";
// import dp from "assets/graphics/dp.svg";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import { constants } from "common/constants";
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
      if (this.state.searchValue.length < 1) return this.setState({ searching: false, searchResults: [] });

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
      <GrayBackground>
        <div>
          <ProblemsSidebar active="overview">
            <>
              <TitleSection>
                <HeadingSection>
                  <Subheading>GENERAL</Subheading>
                  <Heading>Overview</Heading>
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
                <Grid.Row>
                  <CardGroup stackable>
                    <Card raised onClick={() => this.props.router.push("/problems/arrays")}>
                      <Image src="/images/array.svg" width="200px" height="200px" />
                      <Card.Content>
                        <Card.Header>Arrays</Card.Header>
                        <Card.Description>Problems related to manipulating arrays</Card.Description>
                      </Card.Content>
                    </Card>
                    <Card raised onClick={() => this.props.router.push("/problems/strings")}>
                      <Image src="/images/string.svg" width="200px" height="200px" />
                      <Card.Content>
                        <Card.Header>Strings</Card.Header>
                        <Card.Description>Problems related to manipulating strings</Card.Description>
                      </Card.Content>
                    </Card>
                    <Card raised onClick={() => this.props.router.push("/problems/linked-lists")}>
                      <Image src="/images/linkedlist.svg" width="200px" height="200px" />
                      <Card.Content>
                        <Card.Header>Linked Lists</Card.Header>
                        <Card.Description>
                          Problems related to traversing and manipulating linked lists
                        </Card.Description>
                      </Card.Content>
                    </Card>
                    <Card raised onClick={() => this.props.router.push("/problems/stacks")}>
                      <Image src="/images/stack.svg" width="200px" height="200px" />
                      <Card.Content>
                        <Card.Header>Stacks</Card.Header>
                        <Card.Description>Problems related to using stacks to solve problems</Card.Description>
                      </Card.Content>
                    </Card>
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
            </>
          </ProblemsSidebar>
        </div>
      </GrayBackground>
    );
  }
}

export default withRouter(Overview);
