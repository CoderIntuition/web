import React, { RefObject } from "react";
import { NextRouter, withRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { CardGroup, GridRow, Header, List, Loader, Popup } from "semantic-ui-react";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import { SimpleProblem } from "common/types";
import { beginnerPathData, constants } from "common/constants";
import { getCurrentUserToken } from "common/auth-service";
import { withGlobalContext } from "common/utils";
import { Heading, HeadingSection, Subheading } from "./overview-styles";
import {
  Check,
  ItemCard,
  ItemHeader,
  StyledCard,
  StyledCardGroup,
  StyledGrid, StyledHeader,
  StyledListItem
} from "./beginner-path-styles";

interface BeginnerPathProps {
  router: NextRouter;
  contextLoading: boolean;
  authenticated: boolean;
  currentUser: any;
}

interface BeginnerPathState {
  problems: SimpleProblem[];
  page: number;
  totalPages: number;
  activeIndex: number;
  loading: boolean;
  completedProblems: string[];
  completedReadings: string[];
}

class BeginnerPath extends React.Component<BeginnerPathProps, BeginnerPathState> {
  TEXT_COLOR = "#c4cfc4";
  PROBLEM_COLOR = "#4d69e9";
  QUIZ_COLOR = "#f79862";
  TIPS_COLOR = "#77df79";
  contentsRefs: RefObject<any>[];

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      problems: [],
      totalPages: 0,
      activeIndex: 0,
      loading: true,
      completedProblems: [],
      completedReadings: [],
    };

    this.contentsRefs = [...Array(4)].map((_, _i) => React.createRef());
  }

  componentDidMount() {
    if (this.props.authenticated) {
      const url = constants.ACTIVITY_URL + "completed/" + this.props.currentUser.id;
      const config = {
        headers: {
          Authorization: `Bearer ${getCurrentUserToken()}`,
        },
      };
      axios.get(url, config).then((res) => {
        this.setState({
          loading: false,
          completedProblems: res.data.completedProblems,
          completedReadings: res.data.completedReadings,
        });
      });
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps === this.props) return;

    if (
      (this.state.completedProblems.length === 0 || this.state.completedReadings.length === 0) &&
      !this.props.contextLoading &&
      this.props.authenticated
    ) {
      this.setState({ loading: true });
      const url = constants.ACTIVITY_URL + "completed/" + this.props.currentUser.id;
      const config = {
        headers: {
          Authorization: `Bearer ${getCurrentUserToken()}`,
        },
      };
      axios.get(url, config).then((res) => {
        this.setState({
          loading: false,
          completedProblems: res.data.completedProblems,
          completedReadings: res.data.completedReadings,
        });
      });
    }
  }

  createCard(idx, router, completedList, color, type, urlName, name) {
    return (
      <ItemCard raised fluid sidecolor={color} key={idx} onClick={() => router.push("/" + type + "/" + urlName)}>
        <ItemHeader size="small">
          {name}
          {completedList.includes(urlName) ? (
            <Check color="#20bf6b" size={20} />
          ) : this.props.authenticated ? (
            <Check color="#00000030" size={20} />
          ) : (
            <Popup
              basic
              hoverable
              content={
                <>
                  <Link href="/login">Log in</Link> or <Link href="/signup">Sign Up</Link> to save your progress
                </>
              }
              trigger={<Check color="#00000030" size={20} />}
            />
          )}
        </ItemHeader>
      </ItemCard>
    );
  }

  getColor(introduction) {
    let color;
    switch (introduction.type) {
      case "problem":
        color = this.PROBLEM_COLOR;
        break;
      case "reading":
        color = this.TEXT_COLOR;
        break;
      case "quiz":
        color = this.QUIZ_COLOR;
        break;
      case "tip":
        color = this.TIPS_COLOR;
        break;
    }
    return color;
  }

  render() {
    const { router } = this.props;

    if (this.state.loading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    const headerCheck = (data) => {
      const completed = data.every((val) =>
        this.state.completedProblems.concat(this.state.completedReadings).includes(val.urlName)
      );
      return completed ? (
        <Check color="#20bf6b" size={20} style={{ marginRight: 23 }} />
      ) : this.props.authenticated ? (
        <Check color="#00000030" size={20} style={{ marginRight: 23 }} />
      ) : (
        <Popup
          basic
          hoverable
          content={
            <>
              <Link href="/login">Log in</Link> or <Link href="/signup">Sign Up</Link> to save your progress
            </>
          }
          trigger={<Check color="#00000030" size={20} style={{ marginRight: 23 }} />}
        />
      );
    };

    const cardGroupContents = (data) => (
      <>
        {data.map((introduction, idx) => {
          if (introduction.type === "break") {
            return <br/>
          }

          let completedList;
          if (introduction.type === "problem") {
            completedList = this.state.completedProblems;
          } else {
            completedList = this.state.completedReadings;
          }

          let color = this.getColor(introduction);

          if (introduction.type === "tip") {
            introduction.type = "reading";
          }

          return this.createCard(
            idx,
            router,
            completedList,
            color,
            introduction.type,
            introduction.urlName,
            introduction.name
          );
        })}
      </>
    );

    return (
      <ProblemsSidebar active="beginnerPath">
        <>
          <HeadingSection>
            <Subheading>LEARNING PATH</Subheading>
            <Heading>Beginner Path</Heading>
          </HeadingSection>
          <StyledGrid>
            <GridRow>
              <StyledCardGroup>
                <StyledCard raised fluid>
                  <StyledHeader size="medium" style={{marginBottom: 10}}>Overview</StyledHeader>
                  <p style={{ color: "#00000090", fontSize: 15 }}>
                    In this learning path, you'll understand the <b style={{ fontWeight: 600 }}>prerequisites</b> for
                    using CoderIntuition and get introduced to easier coding interview problems.
                    <br />
                    Most importantly, you'll learn the <b style={{ fontWeight: 600 }}>intuition</b> and{" "}
                    <b style={{ fontWeight: 600 }}>repeatable patterns</b> behind these concepts.
                  </p>
                </StyledCard>

                <StyledCard raised fluid>
                  <StyledHeader size="medium" style={{ marginBottom: 0 }}>
                    Contents
                  </StyledHeader>
                  <List ordered>
                    <StyledListItem onClick={() => this.contentsRefs[0].current.scrollIntoView()}>
                      Introduction
                    </StyledListItem>
                    <StyledListItem onClick={() => this.contentsRefs[1].current.scrollIntoView()}>
                      Big-O Notation
                    </StyledListItem>
                    <StyledListItem onClick={() => this.contentsRefs[2].current.scrollIntoView()}>
                      Basic Strings and Arrays
                    </StyledListItem>
                    <StyledListItem>Linked Lists</StyledListItem>
                  </List>
                </StyledCard>

                <div ref={this.contentsRefs[0]} />
                <StyledCard raised fluid>
                  <StyledHeader size="medium">
                    1 - Introduction
                    {headerCheck(beginnerPathData.introduction)}
                  </StyledHeader>
                  <CardGroup>{cardGroupContents(beginnerPathData.introduction)}</CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[1]} />
                <StyledCard raised fluid>
                  <StyledHeader size="medium">
                    2 - Big O Notation
                    {headerCheck(beginnerPathData.bigONotation)}
                  </StyledHeader>
                  <CardGroup>{cardGroupContents(beginnerPathData.bigONotation)}</CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[2]} />
                <StyledCard raised fluid>
                  <StyledHeader size="medium">
                    3 - Basic Strings and Arrays
                    {headerCheck(beginnerPathData.stringsAndArrays)}
                  </StyledHeader>
                  <CardGroup>{cardGroupContents(beginnerPathData.stringsAndArrays)}</CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[3]} />
                <StyledCard raised fluid>
                  <StyledHeader size="medium">
                    4 - Linked Lists
                    {headerCheck(beginnerPathData.linkedLists)}
                  </StyledHeader>
                  <CardGroup>{cardGroupContents(beginnerPathData.linkedLists)}</CardGroup>
                </StyledCard>
              </StyledCardGroup>
            </GridRow>
          </StyledGrid>
        </>
      </ProblemsSidebar>
    );
  }
}

export default withGlobalContext(withRouter(BeginnerPath));
