import styled from "styled-components";
import { Grid } from "semantic-ui-react";

export const NotFoundWrapper = styled.div`
  width: 400px;
  margin: 10px auto 0 auto;
  padding: 30px;
  text-align: center;
`;

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 0;
  }
`;

export const FirstRow = styled(Grid.Row)`
  margin: 10px 15px 0 15px;
`;

export const SecondRow = styled(Grid.Row)`
  margin: -10px 15px 5px 15px;
`;

export const BottomRow = styled(Grid.Row)`
  margin: 0;
`;

export const RadioLabel = styled.span`
  margin-left: 10px;
  font-weight: 500;
  color: #6c7994;
`;
