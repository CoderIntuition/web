import React, { RefObject } from "react";
import { NextRouter, withRouter } from "next/router";
import { Card, CardGroup, GridRow, Header, List, ListItem } from "semantic-ui-react";
import { CheckCircle } from "react-feather";
import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import NotFound from "components/common/404/404";
import { SimpleProblem } from "../../common/types";
import { ItemCard, ItemHeader, StyledGrid } from "./beginner-path-styles";
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
              <CardGroup style={{ width: "100%", maxWidth: 1280 }}>
                <Card raised fluid style={{ padding: 20 }}>
                  <Header size="medium">Overview</Header>
                  <p style={{ color: "#00000090", fontSize: 15 }}>
                    In this learning path, you'll understand the prerequisites that you need before you start using
                    CoderIntuition. You will also be introduced to Big O notation and simple algorithmic problems.
                  </p>
                </Card>

                <Card raised fluid style={{ padding: 20 }}>
                  <Header size="medium" style={{ marginBottom: 0 }}>
                    Contents
                  </Header>
                  <List ordered style={{ fontSize: 15 }}>
                    <ListItem as="a" onClick={() => this.contentsRefs[0].current.scrollIntoView()}>
                      Introduction
                    </ListItem>
                    <ListItem as="a" onClick={() => this.contentsRefs[1].current.scrollIntoView()}>
                      Big-O Notation
                    </ListItem>
                    <ListItem as="a" onClick={() => this.contentsRefs[2].current.scrollIntoView()}>
                      Basic Strings
                    </ListItem>
                    <ListItem as="a" onClick={() => this.contentsRefs[3].current.scrollIntoView()}>
                      Basic Arrays
                    </ListItem>
                    <ListItem as="a">Basic Linked Lists</ListItem>
                  </List>
                </Card>

                <div ref={this.contentsRefs[0]} />
                <Card raised fluid style={{ padding: 20 }}>
                  <Header size="medium">
                    1 - Introduction
                    <CheckCircle color="#00000030" size={20} style={{ float: "right", marginRight: 23 }} />
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
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
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
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
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
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
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
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
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
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                  </CardGroup>
                </Card>

                <div ref={this.contentsRefs[1]} />
                <Card raised fluid style={{ padding: 20 }}>
                  <Header size="medium">
                    2 - Big O Notation
                    <CheckCircle color="#00000030" size={20} style={{ float: "right", marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        Why do I need to know about Big O notation?
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        What is time complexity?
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.QUIZ_COLOR}>
                      <ItemHeader size="small">
                        Quiz: Time Complexity
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        What is space complexity?
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.QUIZ_COLOR}>
                      <ItemHeader size="small">
                        Quiz: Space Complexity
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Using Time and Space Complexity
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                  </CardGroup>
                </Card>

                <div ref={this.contentsRefs[2]} />
                <Card raised fluid style={{ padding: 20 }}>
                  <Header size="medium">
                    3 - Basic Strings
                    <CheckCircle color="#00000030" size={20} style={{ float: "right", marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        Overview of Basic Strings
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: To Lowercase
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Longest Common Prefix
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        The Two-Pointer Method
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Reverse a String
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Valid Palindrome
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.QUIZ_COLOR}>
                      <ItemHeader size="small">
                        Quiz: Strings
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Determining if a Problem is a String Problem
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Approaching String Problems
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                  </CardGroup>
                </Card>

                <div ref={this.contentsRefs[3]} />
                <Card raised fluid style={{ padding: 20 }}>
                  <Header size="medium">
                    4 - Basic Arrays
                    <CheckCircle color="#00000030" size={20} style={{ float: "right", marginRight: 23 }} />
                  </Header>
                  <CardGroup>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        Overview of Basic Arrays
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        The Two-Pointer Method
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Reverse an Array
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Move Zeros to the End
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        How to search an array
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Binary Search
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TEXT_COLOR}>
                      <ItemHeader size="small">
                        How to sort an array
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Insertion Sort
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.QUIZ_COLOR}>
                      <ItemHeader size="small">
                        Quiz: Sorting an Array
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Buy Low Sell High
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.PROBLEM_COLOR}>
                      <ItemHeader size="small">
                        Problem: Merge Two Sorted Arrays
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Determining if a Problem is an Array Problem
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                    <ItemCard raised fluid sidecolor={this.TIPS_COLOR}>
                      <ItemHeader size="small">
                        Interview Tip: Approaching Array Problems
                        <CheckCircle color="#00000030" size={20} style={{ float: "right" }} />
                      </ItemHeader>
                    </ItemCard>
                  </CardGroup>
                </Card>
              </CardGroup>
            </GridRow>
          </StyledGrid>
        </>
      </ProblemsSidebar>
    );
  }
}

export default withRouter(BeginnerPath);
