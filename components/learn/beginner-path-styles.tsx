import styled from "styled-components";
import { Card, Grid, Header } from "semantic-ui-react";

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 10px;
  }
`;

export const ItemCard = styled(Card)`
  &&& {
    display: flex;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1) !important;
    border-radius: 12px !important;
    border-left: 2px solid ${(props) => props.sidecolor};
    padding-inline: 20px;
    padding-block: 12px;
    vertical-align: center;
    cursor: pointer;
    margin-bottom: 0;

    &:hover {
      border-left: 2px solid ${(props) => props.sidecolor} !important;
      background-color: #4d69e90a !important;
    }

    &:last-child {
      margin-bottom: 15px;
    }
  }
`;

export const ItemHeader = styled(Header)`
  &&& {
    font-weight: 500;
  }
`;
