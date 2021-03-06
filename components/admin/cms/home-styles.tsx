import styled from "styled-components";
import { Button, Grid } from "semantic-ui-react";

export const StyledGrid = styled(Grid)`
  &&& {
    margin-top: 20px;
  }
`;

export const StyledButton = styled(Button)`
  &&& {
    width: 300px;
    height: 80px;
    font-size: 18px;
  }
`;
