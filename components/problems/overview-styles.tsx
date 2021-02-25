import styled from "styled-components";
import { Grid, Image, Input } from "semantic-ui-react";

export const StyledGrid = styled(Grid)`
  &&& {
    margin-bottom: 50px;
  }
`;

export const StyledImage = styled(Image)`
  &&& {
    padding: 10px;
  }
`;

export const StyledInput = styled(Input)`
  &&& {
    width: 400px;
  }
`;
