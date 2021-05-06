import ProblemsSidebar from "components/common/problems-sidebar/problems-sidebar";
import React from "react";
import { GridRow, List } from "semantic-ui-react";
import { StyledCard, StyledCardGroup, StyledGrid, StyledHeader, StyledListItem } from "./beginner-path-styles";
import { Heading, HeadingSection, Subheading } from "./overview-styles";

class PlusPath extends React.Component {
  render() {
    return (
      <ProblemsSidebar active="plusPath">
        <>
          <HeadingSection>
            <Subheading>LEARNING PATH</Subheading>
            <Heading>Intuition+ Path</Heading>
          </HeadingSection>
          <StyledGrid>
            <GridRow>
              <StyledCardGroup>
                <StyledCard raised fluid>
                  <StyledHeader size="medium" style={{ marginBottom: 10 }}>
                    Overview
                  </StyledHeader>
                  <p style={{ color: "#00000090", fontSize: 15 }}>
                    The <b style={{ fontWeight: 600 }}>Intuition+ Learning Path</b> is coming soon!
                  </p>
                </StyledCard>
                <StyledCard raised fluid>
                  <StyledHeader size="medium" style={{ marginBottom: 0 }}>
                    Contents
                  </StyledHeader>
                  <List ordered>
                    <StyledListItem>&nbsp;Introduction</StyledListItem>
                    <StyledListItem>&nbsp;Hash Tables</StyledListItem>
                    <StyledListItem>&nbsp;Advanced Arrays and Strings</StyledListItem>
                    <StyledListItem>&nbsp;Stacks</StyledListItem>
                    <StyledListItem>&nbsp;Queues</StyledListItem>
                    <StyledListItem>&nbsp;Trees</StyledListItem>
                    <StyledListItem>&nbsp;Heaps</StyledListItem>
                    <StyledListItem>&nbsp;Graphs</StyledListItem>
                    <StyledListItem>&nbsp;Backtracking</StyledListItem>
                    <StyledListItem>&nbsp;Greedy</StyledListItem>
                    <StyledListItem>&nbsp;Dynamic Programming</StyledListItem>
                  </List>
                </StyledCard>
              </StyledCardGroup>
            </GridRow>
          </StyledGrid>
        </>
      </ProblemsSidebar>
    );
  }
}

export default PlusPath;
