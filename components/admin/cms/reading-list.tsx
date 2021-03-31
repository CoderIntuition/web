import React, { Component } from "react";
import Link from "next/link";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import { Button, Grid, GridRow, Icon, Loader, Pagination, Table } from "semantic-ui-react";
import { constants } from "common/constants";
import { isMod } from "common/auth-service";
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

interface ReadingListProps {
  router: NextRouter;
  contextLoading: boolean;
  authenticated: boolean;
  currentUser: any;
}

class ReadingList extends Component<ReadingListProps> {
  state = {
    loading: true,
    page: 1,
    readings: {} as any,
    totalPages: 0,
  };

  handlePageChange = (e, props) => {
    this.fetchReadings(props.activePage);
    this.setState({
      page: props.activePage,
    });
  };

  fetchReadings(page) {
    axios
      .get(constants.READINGS_URL, {
        params: {
          page: page - 1,
          size: 10,
        },
      })
      .then((res) => {
        this.setState({
          loading: false,
          readings: res.data.readings,
          totalPages: res.data.totalPages,
        });
      });
  }

  componentDidMount() {
    this.fetchReadings(this.state.page);
  }

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
          <Heading>Reading List</Heading>
        </HeadingSection>
        <StyledSegment raised>
          <StyledGrid>
            <FirstRow>
              <Grid.Column floated="right">
                <Link href="/admin/cms/readings/add">
                  <GreenButton positive style={{ float: "right" }}>
                    Add New Reading
                  </GreenButton>
                </Link>
              </Grid.Column>
            </FirstRow>
            <GridRow>
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
                      Actions
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {this.state.readings.map((reading, i) => (
                    <Table.Row key={i}>
                      <FirstCell>{reading.id}</FirstCell>
                      <Table.Cell>{reading.name}</Table.Cell>
                      <Table.Cell>
                        <a href={constants.WEB_BASE_URL + "/reading/" + reading.urlName} target="_blank">
                          <GrayButton size="tiny" icon="external alternate" circular />
                        </a>
                        <Button size="tiny" icon="info" primary circular />
                        <a href={constants.WEB_BASE_URL + "/admin/cms/readings/edit/" + reading.id} target="_blank">
                          <YellowButton size="tiny" icon="edit" color="yellow" circular />
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </StyledTable>
            </GridRow>
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
      </Container>
    );
  }
}

export default withRouter(withGlobalContext(ReadingList));
