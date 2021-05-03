import styled from "styled-components";
import { Grid, Input } from "semantic-ui-react";

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

export const SearchInput = styled(Input)`
  width: 20vw;
  min-width: 200px;
  border-radius: 999px !important;
  float: right;
`;

export const FirstRow = styled(Grid.Row)`
  margin: 10px 15px 0 15px;
  padding-bottom: 0 !important;
`;

export const BottomRow = styled(Grid.Row)`
  margin: -5px 0 5px 0;
`;
