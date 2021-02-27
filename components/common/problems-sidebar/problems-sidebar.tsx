import React, { Component } from "react";
import Link from "next/link";
import { Menu } from "semantic-ui-react";
import {
  ContentDiv,
  FlexWrapper,
  SidebarContainer,
  SidebarMenu,
  Spacer,
  StyledMenuHeader,
  StyledMenuItem,
} from "./problems-sidebar-styles";
import AnimationRevealPage from "../helpers/animation-reveal-page";

class ProblemsSidebar extends Component<{ active: string }, {}> {
  render() {
    return (
      <FlexWrapper>
        <SidebarContainer>
          <SidebarMenu vertical>
            <Menu.Item>
              <StyledMenuHeader>General</StyledMenuHeader>
              <Menu.Menu>
                <Link href="/problems/overview" passHref>
                  <a>
                    <StyledMenuItem active={this.props.active === "overview"}>Overview</StyledMenuItem>
                  </a>
                </Link>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              <StyledMenuHeader>Learning Paths</StyledMenuHeader>
              <Menu.Menu>
                <Link href="/learning-path/beginner-path">
                  <a>
                    <StyledMenuItem active={this.props.active === "beginnerPath"}>Beginner Path</StyledMenuItem>
                  </a>
                </Link>
                <Link href="/learning-path/plus-path">
                  <a>
                    <StyledMenuItem active={this.props.active === "plusPath"}>Intuition+ Path</StyledMenuItem>
                  </a>
                </Link>
              </Menu.Menu>
            </Menu.Item>
            <Menu.Item>
              <StyledMenuHeader>Categories</StyledMenuHeader>
              <Menu.Menu>
                <Link href="/problems/arrays">
                  <a>
                    <StyledMenuItem active={this.props.active === "arrays"}>Arrays</StyledMenuItem>
                  </a>
                </Link>

                <Link href="/problems/strings">
                  <StyledMenuItem active={this.props.active === "strings"}>Strings</StyledMenuItem>
                </Link>

                <Link href="/problems/linked-lists">
                  <StyledMenuItem active={this.props.active === "linked-lists"}>Linked Lists</StyledMenuItem>
                </Link>

                <Link href="/problems/stacks">
                  <StyledMenuItem active={this.props.active === "stacks"}>Stacks</StyledMenuItem>
                </Link>

                <Link href="/problems/queues">
                  <StyledMenuItem active={this.props.active === "queues"}>Queues</StyledMenuItem>
                </Link>

                <Link href="/problems/trees">
                  <StyledMenuItem active={this.props.active === "trees"}>Trees</StyledMenuItem>
                </Link>

                <Link href="/problems/graphs">
                  <StyledMenuItem active={this.props.active === "graphs"}>Graphs</StyledMenuItem>
                </Link>

                <Link href="/problems/bit-manipulation">
                  <StyledMenuItem active={this.props.active === "bit-manipulation"}>Bit Manipulation</StyledMenuItem>
                </Link>

                <Link href="/problems/math">
                  <StyledMenuItem active={this.props.active === "math"}>Math</StyledMenuItem>
                </Link>

                <Link href="/problems/backtracking">
                  <StyledMenuItem active={this.props.active === "backtracking"}>Backtracking</StyledMenuItem>
                </Link>

                <Link href="/problems/greedy">
                  <StyledMenuItem active={this.props.active === "greedy"}>Greedy</StyledMenuItem>
                </Link>

                <Link href="/problems/dynamic-programming">
                  <StyledMenuItem active={this.props.active === "dynamic-programming"}>
                    Dynamic Programming
                  </StyledMenuItem>
                </Link>
              </Menu.Menu>
            </Menu.Item>
          </SidebarMenu>
        </SidebarContainer>
        <Spacer />
        <ContentDiv>
          <AnimationRevealPage right>{this.props.children}</AnimationRevealPage>
        </ContentDiv>
      </FlexWrapper>
    );
  }
}

export default ProblemsSidebar;
