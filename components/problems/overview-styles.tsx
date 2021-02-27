import styled from "styled-components";
import { Grid, Input } from "semantic-ui-react";

export const GrayBackground = styled.div`
  background-color: #fcfcfe;
`;

export const TitleSection = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const HeadingSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const TitleSpacer = styled.div`
  width: 50px;
`

export const Subheading = styled.h2`
  color: #4d69e9;
  font-size: 16px;
  font-weight: normal;
  letter-spacing: 0.05em;
  margin-bottom: -15px;
`;

export const Heading = styled.h1`
  color: #243e63;
  font-size: 30px;
  font-weight: 500;
  letter-spacing: 0.025em;
`;

export const SearchInput = styled(Input)`
  width: 20vw;
  min-width: 200px;
  margin-right: 10px;
`

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 0;
  }
`;
