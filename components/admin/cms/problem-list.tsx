import React, { Component } from "react";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import { Button, Confirm, Dropdown, Grid, Icon, Loader, Pagination, Table } from "semantic-ui-react";
import { constants } from "common/constants";
import { getCurrentUserToken, isMod } from "common/auth-service";
import { GrayButton, GreenButton, RedButton, YellowButton } from "common/global-styles";
import { withGlobalContext } from "common/utils";
import {
  BackGrid,
  BottomRow,
  Container,
  FirstCell,
  FirstHeaderCell,
  FirstRow,
  Heading,
  HeadingSection,
  StyledGrid,
  StyledSegment,
  StyledTable,
  Subheading,
} from "./list-styles";

interface ProblemListProps {
  router: NextRouter;
  contextLoading: boolean;
  authenticated: boolean;
  currentUser: any;
}

class ProblemList extends Component<ProblemListProps> {
  state = {
    loading: true,
    category: "ARRAYS",
    page: 1,
    problems: {} as any,
    totalPages: 0,
    confirmDelete: null as any,
  };

  handleDelete() {
    const token = getCurrentUserToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios.post(constants.CMS_PROBLEM_URL + "delete", { id: this.state.confirmDelete.id }, config).then((_res) => {
      this.fetchProblems(this.state.page, this.state.category);
      this.setState({
        confirmDelete: null,
      });
    });
  }

  handlePageChange = (e, props) => {
    this.fetchProblems(props.activePage, this.state.category);
    this.setState({
      page: props.activePage,
    });
  };

  fetchProblems(page, category) {
    axios
      .get(constants.PROBLEMS_URL + category, {
        params: {
          page: page - 1,
          size: 10,
        },
      })
      .then((res) => {
        this.setState({
          loading: false,
          problems: res.data.problems,
          totalPages: res.data.totalPages,
        });
      });
  }

  componentDidMount() {
    this.fetchProblems(this.state.page, this.state.category);
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

  render() {
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

    if (this.state.loading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    return (
      <Container>
        <HeadingSection>
          <Subheading>CMS</Subheading>
          <Heading>Problem List</Heading>
        </HeadingSection>
        <StyledSegment raised>
          <StyledGrid>
            <FirstRow>
              <Grid.Column floated="left" verticalAlign="middle" width={8}>
                <Dropdown
                  value={this.state.category}
                  placeholder="Select Category"
                  selection
                  options={this.categories}
                  onChange={(event, data) => {
                    this.setState({ category: data.value, page: 1 });
                    this.fetchProblems(1, data.value);
                  }}
                  style={{ float: "left" }}
                />
              </Grid.Column>
              <Grid.Column floated="right" width={8}>
                <Link href="/admin/cms/problems/add">
                  <GreenButton positive style={{ float: "right" }}>
                    Add New Problem
                  </GreenButton>
                </Link>
              </Grid.Column>
            </FirstRow>
            <Grid.Row>
              <StyledTable striped selectable compact>
                <Table.Header>
                  <Table.Row>
                    <FirstHeaderCell width={1} className="second">
                      ID
                    </FirstHeaderCell>
                    <Table.HeaderCell width={9} className="second">
                      Name
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3} className="second">
                      Category
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3} className="second">
                      Actions
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.state.problems.map((problem, i) => (
                    <Table.Row key={i}>
                      <FirstCell>{problem.id}</FirstCell>
                      <Table.Cell>{problem.name}</Table.Cell>
                      <Table.Cell>{problem.category}</Table.Cell>
                      <Table.Cell>
                        <a href={constants.WEB_BASE_URL + "/problem/" + problem.urlName} target="_blank">
                          <GrayButton size="tiny" icon="external alternate" circular />
                        </a>
                        <Button size="tiny" icon="info" primary circular />
                        <a href={constants.WEB_BASE_URL + "/admin/cms/problems/edit/" + problem.id} target="_blank">
                          <YellowButton size="tiny" icon="edit" color="yellow" circular />
                        </a>
                        <RedButton
                          size="tiny"
                          icon="remove"
                          negative
                          circular
                          onClick={() => this.setState({ confirmDelete: problem })}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </StyledTable>
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
        </StyledSegment>
        <BackGrid>
          <Grid.Row centered>
            <Link href="/admin/cms">
              <RedButton>Back</RedButton>
            </Link>
          </Grid.Row>
        </BackGrid>
        <Confirm
          open={this.state.confirmDelete != null}
          header={"Delete Problem: " + this.state.confirmDelete?.name}
          confirmButton="Delete"
          onCancel={() => this.setState({ confirmDelete: null })}
          onConfirm={() => this.handleDelete()}
        />
      </Container>
    );
  }
}

export default withRouter(withGlobalContext(ProblemList));
