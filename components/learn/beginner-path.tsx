import React, { RefObject } from "react";
import { NextRouter, withRouter } from "next/router";
import axios from "axios";
import { CardGroup, GridRow, Header, List, Loader } from "semantic-ui-react";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import { SimpleProblem } from "common/types";
import {
  Check,
  ItemCard,
  ItemHeader,
  StyledCard,
  StyledCardGroup,
  StyledGrid,
  StyledListItem,
} from "./beginner-path-styles";
import { Heading, HeadingSection, Subheading } from "./overview-styles";
import { withGlobalContext } from "common/utils";
import { constants } from "common/constants";
import { getCurrentUserToken } from "../../common/auth-service";

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

  createCard(router, completedList, color, type, urlName, name) {
    return (
      <ItemCard raised fluid sidecolor={color} onClick={() => router.push("/" + type + "/" + urlName)}>
        <ItemHeader size="small">
          {name}
          {completedList.includes(urlName) ? (
            <Check color="#20bf6b" size={20} />
          ) : (
            <Check color="#00000030" size={20} />
          )}
        </ItemHeader>
      </ItemCard>
    );
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
                    In this learning path, you'll understand the prerequisites that you need before you start using
                    CoderIntuition. You will also be introduced to Big O notation and simple algorithmic problems.
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
                    <StyledListItem>Basic Linked Lists</StyledListItem>
                  </List>
                </StyledCard>

                <div ref={this.contentsRefs[0]} />
                <StyledCard raised fluid>
                  <Header size="medium">
                    1 - Introduction
                    <Check color="#00000030" size={20} style={{ marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    {this.createCard(
                      router,
                      this.state.completedReadings,
                      this.TEXT_COLOR,
                      "reading",
                      "who-is-the-beginner-path-meant-for",
                      "Who is the Beginner Path meant for?"
                    )}
                    {this.createCard(
                      router,
                      this.TEXT_COLOR,
                      this.state.completedReadings,
                      "reading",
                      "why-should-i-use-a-learning-path",
                      "Why should I use a Learning Path?"
                    )}
                    {this.createCard(
                      router,
                      this.PROBLEM_COLOR,
                      this.state.completedProblems,
                      "problem",
                      "fizz-buzz",
                      "Problem: Fizz Buzz"
                    )}
                    {this.createCard(
                      router,
                      this.PROBLEM_COLOR,
                      this.state.completedProblems,
                      "problem",
                      "sum-of-array",
                      "Problem: Sum of Array"
                    )}
                    {this.createCard(
                      router,
                      this.QUIZ_COLOR,
                      this.state.completedReadings,
                      "quiz",
                      "prerequisites",
                      "Quiz: Prerequisites"
                    )}
                  </CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[1]} />
                <StyledCard raised fluid>
                  <Header size="medium">
                    2 - Big O Notation
                    <Check color="#00000030" size={20} style={{ marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/why-do-i-need-to-know-big-o-notation")}
                    >
                      <ItemHeader size="small">
                        Why do I need to know Big O notation?
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/big-o-notation")}
                    >
                      <ItemHeader size="small">
                        Big O Notation
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/time-complexity")}
                    >
                      <ItemHeader size="small">
                        Time Complexity
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.QUIZ_COLOR}
                      onClick={() => router.push("/quiz/time-complexity-quiz")}
                    >
                      <ItemHeader size="small">
                        Quiz: Time Complexity
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/space-complexity")}
                    >
                      <ItemHeader size="small">
                        Space Complexity
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.QUIZ_COLOR}
                      onClick={() => router.push("/quiz/space-complexity-quiz")}
                    >
                      <ItemHeader size="small">
                        Quiz: Space Complexity
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TIPS_COLOR}
                      onClick={() => router.push("/reading/using-time-and-space-complexity")}
                    >
                      <ItemHeader size="small">
                        Interview Tip: Using Time and Space Complexity
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                  </CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[2]} />
                <StyledCard raised fluid>
                  <Header size="medium">
                    4 - Basic Strings and Arrays
                    <Check color="#00000030" size={20} style={{ marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/overview-of-basic-strings-and-arrays")}
                    >
                      <ItemHeader size="small">
                        Overview of Basic Strings and Arrays
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/the-array-data-structure")}
                    >
                      <ItemHeader size="small">
                        The Array Data Structure
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/longest-common-prefix")}
                    >
                      <ItemHeader size="small">
                        Problem: Longest Common Prefix
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/the-two-pointer-method")}
                    >
                      <ItemHeader size="small">
                        The Two-Pointer Method
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/reverse-an-array")}
                    >
                      <ItemHeader size="small">
                        Problem: Reverse an Array
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/valid-palindrome")}
                    >
                      <ItemHeader size="small">
                        Problem: Valid Palindrome
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/move-zeros-to-the-end")}
                    >
                      <ItemHeader size="small">
                        Problem: Move Zeros to the End
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/searching-arrays")}
                    >
                      <ItemHeader size="small">
                        Searching Arrays
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/binary-search")}
                    >
                      <ItemHeader size="small">
                        Problem: Binary Search
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/sorting-arrays")}
                    >
                      <ItemHeader size="small">
                        Sorting Arrays
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/insertion-sort")}
                    >
                      <ItemHeader size="small">
                        Problem: Insertion Sort
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.QUIZ_COLOR}
                      onClick={() => router.push("/reading/sorting-arrays")}
                    >
                      <ItemHeader size="small">
                        Quiz: Sorting Arrays
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/buy-low-sell-high")}
                    >
                      <ItemHeader size="small">
                        Problem: Buy Low Sell High
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/merge-two-sorted-arrays")}
                    >
                      <ItemHeader size="small">
                        Problem: Merge Two Sorted Arrays
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TIPS_COLOR}
                      onClick={() => router.push("/reading/how-to-spot-an-array-problem")}
                    >
                      <ItemHeader size="small">
                        Interview Tip: How to Spot an Array Problem
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TIPS_COLOR}
                      onClick={() => router.push("/reading/approaching-array-problems")}
                    >
                      <ItemHeader size="small">
                        Interview Tip: Approaching Array Problems
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                  </CardGroup>
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
