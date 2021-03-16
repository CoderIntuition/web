import React, { RefObject } from "react";
import { NextRouter, withRouter } from "next/router";
import { CardGroup, GridRow, Header, List } from "semantic-ui-react";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import NotFound from "components/common/404/404";
import { SimpleProblem } from "../../common/types";
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

interface BeginnerPathProps {
  router: NextRouter;
}

interface BeginnerPathState {
  notFound: boolean;
  problems: SimpleProblem[];
  page: number;
  totalPages: number;
  activeIndex: number;
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
      notFound: false,
      page: 1,
      problems: [],
      totalPages: 0,
      activeIndex: 0,
    };
    this.contentsRefs = [...Array(5)].map((_, _i) => React.createRef());
  }

  handleResultSelect(result) {
    this.props.router.push("/problem/" + result.urlName);
  }

  render() {
    const { router } = this.props;

    if (this.state.notFound) {
      return <NotFound />;
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
                      Basic Strings
                    </StyledListItem>
                    <StyledListItem onClick={() => this.contentsRefs[3].current.scrollIntoView()}>
                      Basic Arrays
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
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/who-is-the-beginner-path-meant-for")}
                    >
                      <ItemHeader size="small">
                        Who is the Beginner Path meant for?
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.TEXT_COLOR}
                      onClick={() => router.push("/reading/why-should-i-use-a-learning-path")}
                    >
                      <ItemHeader size="small">
                        Why should I use a Learning Path?
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/fizz-buzz")}
                    >
                      <ItemHeader size="small">
                        Problem: Fizz Buzz
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.PROBLEM_COLOR}
                      onClick={() => router.push("/problem/sum-of-array")}
                    >
                      <ItemHeader size="small">
                        Problem: Sum of Array
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard
                      raised
                      fluid
                      sidecolor={this.QUIZ_COLOR}
                      onClick={() => router.push("/quiz/prerequisites")}
                    >
                      <ItemHeader size="small">
                        Quiz: Prerequisites
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
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
                      onClick={() => router.push("/quiz/time-complexity")}
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
                      onClick={() => router.push("/quiz/space-complexity")}
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
                    3 - Basic Strings
                    <Check color="#00000030" size={20} style={{ marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        Overview of Basic Strings
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: To Lowercase
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Longest Common Prefix
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        The Two-Pointer Method
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Reverse a String
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Valid Palindrome
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.QUIZ_COLOR}>
                      <ItemHeader size="small">
                        Quiz: Strings
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Determining if a Problem is a String Problem
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Approaching String Problems
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                  </CardGroup>
                </StyledCard>

                <div ref={this.contentsRefs[3]} />
                <StyledCard raised fluid>
                  <Header size="medium">
                    4 - Basic Arrays
                    <Check color="#00000030" size={20} style={{ marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        Overview of Basic Arrays
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        The Two-Pointer Method
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Reverse an Array
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Move Zeros to the End
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        How to search an array
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Binary Search
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        How to sort an array
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Insertion Sort
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.QUIZ_COLOR}>
                      <ItemHeader size="small">
                        Quiz: Sorting an Array
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Buy Low Sell High
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Merge Two Sorted Arrays
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Determining if a Problem is an Array Problem
                        <Check color="#00000030" size={20} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
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

export default withRouter(BeginnerPath);
