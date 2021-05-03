import styled from "styled-components";
import { Card, CardGroup, Grid, Header, ListItem } from "semantic-ui-react";
import { CheckCircle } from "react-feather";

export const StyledHeader = styled(Header)`
  &&& {
    font-weight: 500;
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

export const StyledGrid = styled(Grid)`
  &&& {
    margin: 10px;
  }
`;

export const StyledCardGroup = styled(CardGroup)`
  &&& {
    width: 100%;
    max-width: 1280px;
  }
`;

export const StyledCard = styled(Card)`
  &&& {
    padding: 20px;
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

export const Check = styled(CheckCircle)`
  float: right;
`;

export const ItemHeader = styled(Header)`
  &&& {
    font-weight: 500;
  }
`;

export const StyledListItem = styled(ListItem)`
  &&& {
    font-size: 15px;
    color: #4d69e9;
    cursor: pointer;

    &:hover {
      color: #1c41e3;
    }
  }
`;
