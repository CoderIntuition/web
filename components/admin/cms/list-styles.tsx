import styled from "styled-components";
import { Grid, Segment, Table } from "semantic-ui-react";

export const Container = styled.div`
  margin: 30px;
`;

export const HeadingSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
`;

export const Subheading = styled.h2`
  color: #4d69e9;
  font-size: 21px;
  font-weight: normal;
  letter-spacing: 0.05em;
  margin-bottom: -15px;
`;

export const Heading = styled.h1`
  color: #243e63;
  font-size: 38px;
  font-weight: 600;
  letter-spacing: 0.025em;
`;

export const StyledSegment = styled(Segment)`
  &&& {
    padding: 0;
    margin: 15px;
  }
`;

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 0;
  }
`;

export const StyledTable = styled(Table)`
  &&& {
    width: 100%;
    margin: 0;
  }
`;

export const FirstHeaderCell = styled(Table.HeaderCell)`
  &&&&& {
    padding-left: 30px;
  }
`;

export const FirstCell = styled(Table.Cell)`
  &&&&& {
    padding-left: 30px;
  }
`;

export const FirstRow = styled(Grid.Row)`
  margin: 10px 15px 0 15px;
`;

export const BottomRow = styled(Grid.Row)`
  margin: -5px 0 5px 0;
`;

export const BackGrid = styled(Grid)`
  &&& {
    margin-block: 10px;
  }
`;
