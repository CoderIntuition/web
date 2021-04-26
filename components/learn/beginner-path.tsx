import React, { RefObject } from "react";
import { NextRouter, withRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { CardGroup, GridRow, Header, List, Loader, Popup } from "semantic-ui-react";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import { SimpleProblem } from "common/types";
import { constants } from "common/constants";
import { getCurrentUserToken } from "common/auth-service";
import { withGlobalContext } from "common/utils";
import { Heading, HeadingSection, Subheading } from "./overview-styles";
import {
  Check,
  ItemCard,
  ItemHeader,
  StyledCard,
  StyledCardGroup,
  StyledGrid,
  StyledListItem,
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

  introductionData = [
    {
      type: "reading",
      urlName: "who-is-the-beginner-path-meant-for",
      name: "Who is the Beginner Path meant for?",
    },
    {
      type: "reading",
      urlName: "why-should-i-use-a-learning-path",
      name: "Why should I use a Learning Path?",
    },
    {
      type: "problem",
      urlName: "fizz-buzz",
      name: "Problem: Fizz Buzz",
    },
    {
      type: "problem",
      urlName: "sum-of-array",
      name: "Problem: Sum of Array",
    },
    {
      type: "quiz",
      urlName: "prerequisites",
      name: "Quiz: Prerequisites",
    },
  ];

  bigONotationData = [
    {
      type: "reading",
      urlName: "why-do-i-need-to-know-big-o-notation",
      name: "Why do I need to know Big O notation?",
    },
    {
      type: "reading",
      urlName: "big-o-notation",
      name: "Big O Notation",
    },
    {
      type: "reading",
      urlName: "time-complexity",
      name: "Time Complexity",
    },
    {
      type: "quiz",
      urlName: "time-complexity-quiz",
      name: "Quiz: Time Complexity",
    },
    {
      type: "reading",
      urlName: "space-complexity",
      name: "Space Complexity",
    },
    {
      type: "quiz",
      urlName: "space-complexity-quiz",
      name: "Quiz: Space Complexity",
    },
    {
      type: "tip",
      urlName: "using-time-and-space-complexity",
      name: "Interview Tip: Using Time and Space Complexity",
    },
  ];

  stringsAndArraysData = [
    {
      type: "reading",
      urlName: "overview-of-basic-strings-and-arrays",
      name: "Overview of Basic Strings and Arrays",
    },
    {
      type: "reading",
      urlName: "the-array-data-structure",
      name: "The Array Data Structure",
    },
    {
      type: "problem",
      urlName: "longest-common-prefix",
      name: "Problem: Longest Common Prefix",
    },
    {
      type: "reading",
      urlName: "the-two-pointer-method",
      name: "The Two-Pointer Method",
    },
    {
      type: "problem",
      urlName: "reverse-an-array",
      name: "Problem: Reverse an Array",
    },
    {
      type: "problem",
      urlName: "valid-palindrome",
      name: "Problem: Valid Palindrome",
    },
    {
      type: "problem",
      urlName: "remove-duplicates-from-sorted-array",
      name: "Problem: Remove Duplicates from Sorted Array",
    },
    {
      type: "quiz",
      urlName: "two-pointer-method-quiz",
      name: "Quiz: Two-Pointer Method",
    },
    {
      type: "reading",
      urlName: "searching-arrays",
      name: "Searching Arrays",
    },
    {
      type: "problem",
      urlName: "find-element-in-array",
      name: "Problem: Find Element in Array",
    },
    {
      type: "reading",
      urlName: "modifying-binary-search",
      name: "Modifying Binary Search",
    },
    {
      type: "problem",
      urlName: "find-element-in-rotated-sorted-array",
      name: "Problem: Find Element in Rotated Sorted Array",
    },
    {
      type: "problem",
      urlName: "calculate-the-square-root",
      name: "Problem: Calculate the Square Root",
    },
    {
      type: "quiz",
      urlName: "searching-arrays-quiz",
      name: "Quiz: Searching Arrays",
    },
    {
      type: "reading",
      urlName: "sorting-arrays",
      name: "Sorting Arrays",
    },
    {
      type: "problem",
      urlName: "insertion-sort",
      name: "Problem: Practice Insertion Sort",
    },
    {
      type: "problem",
      urlName: "buy-low-sell-high",
      name: "Problem: Buy Low Sell High",
    },
    {
      type: "problem",
      urlName: "merge-two-sorted-arrays",
      name: "Problem: Merge Two Sorted Arrays",
    },
    {
      type: "quiz",
      urlName: "sorting-arrays-quiz",
      name: "Quiz: Sorting Arrays",
    },
    {
      type: "tip",
      urlName: "plan-of-attack-for-array-problems",
      name: "Interview Tip: Plan of Attack for Array Problems",
    },
  ];

  linkedListsData = [
    {
      type: "reading",
      urlName: "the-linked-list-data-structure",
      name: "The Linked List Data Structure",
    },
    {
      type: "problem",
      urlName: "delete-node-from-linked-list",
      name: "Problem: Delete Node from Linked List",
    },
    {
      type: "problem",
      urlName: "reverse-a-linked-list",
      name: "Problem: Reverse a Linked List",
    },
    {
      type: "problem",
      urlName: "remove-duplicates-from-sorted-linked-list",
      name: "Problem: Remove Duplicates from Sorted Linked List",
    },
    {
      type: "reading",
      urlName: "the-two-pointer-method-linked-list-edition",
      name: "The Two Pointer Method: Linked List Edition",
    },
    {
      type: "problem",
      urlName: "detect-cycle-in-linked-list",
      name: "Problem: Detect Cycle in Linked List",
    },
  ];

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
                  <Header size="medium">Overview</Header>
                  <p style={{ color: "#00000090", fontSize: 15 }}>
                    In this learning path, you'll understand the <b style={{ fontWeight: 600 }}>prerequisites</b> for
                    using CoderIntuition and get introduced to easier coding interview problems.
                    <br />
                    Most importantly, you'll learn the <b style={{ fontWeight: 600 }}>intuition</b> and{" "}
                    <b style={{ fontWeight: 600 }}>repeatable patterns</b> behind these concepts.
                  </p>
                </StyledCard>

                <StyledCard raised fluid>
                  <Header size="medium" style={{ marginBottom: 0 }}>
                    Contents
                  </Header>
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
                  <Header size="medium" style={{ marginBottom: 15 }}>
                    1 - Introduction
                    {headerCheck(this.introductionData)}
                  </Header>
                  <CardGroup>{cardGroupContents(this.introductionData)}</CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[1]} />
                <StyledCard raised fluid>
                  <Header size="medium" style={{ marginBottom: 15 }}>
                    2 - Big O Notation
                    {headerCheck(this.bigONotationData)}
                  </Header>
                  <CardGroup>{cardGroupContents(this.bigONotationData)}</CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[2]} />
                <StyledCard raised fluid>
                  <Header size="medium" style={{ marginBottom: 15 }}>
                    4 - Basic Strings and Arrays
                    {headerCheck(this.stringsAndArraysData)}
                  </Header>
                  <CardGroup>{cardGroupContents(this.stringsAndArraysData)}</CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[3]} />
                <StyledCard raised fluid>
                  <Header size="medium" style={{ marginBottom: 15 }}>
                    5 - Linked Lists
                    {headerCheck(this.linkedListsData)}
                  </Header>
                  <CardGroup>{cardGroupContents(this.linkedListsData)}</CardGroup>
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
