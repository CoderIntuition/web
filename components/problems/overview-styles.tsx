import styled from "styled-components";
import { Grid, Image } from "semantic-ui-react";

export const TitleSection = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
`;

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 0;
  }
`;

export const StyledImage = styled(Image)`
  &&& {
    padding: 10px;
  }
`;
