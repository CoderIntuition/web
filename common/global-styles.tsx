import styled from "styled-components";
import { Button, Header } from "semantic-ui-react";

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const FlexContent = styled.div`
  flex: 1;
  min-height: calc(100vh - 80px);
`;

export const Label = styled.span`
  display: block;
  margin-bottom: 4px;
  color: #000000de;
  font-size: 13px;
  font-weight: 600;
`;

export const VHeader = styled(Header)`
  &&& {
    color: ${(props) => props.dark ? "#e0e0e0" : ""};
    font-size: 20px;
    font-weight: 500;
  }
`;

export const GreenButton = styled(Button)`
  &&& {
    color: #ffffff;
    background-color: #20bf6b !important;

    &:hover {
      background-color: #1eae61 !important;
    }
  }
`;

export const RedButton = styled(Button)`
  &&& {
    color: #ffffff;
    background-color: #fc5c65 !important;

    &:hover {
      background-color: #fb4751 !important;
    }
  }
`;

export const YellowButton = styled(Button)`
  &&& {
    color: #ffffff;
    background-color: #fbbd08;

    &:hover {
      background-color: #e7ae04 !important;
    }
  }
`;

export const GrayButton = styled(Button)`
  &&& {
    color: #000000de;
    background-color: #e0e1e2 !important;

    &:hover {
      background-color: #caccce !important;
    }
  }
`;

export const WhiteButton = styled(Button)`
  &&& {
    color: #000000de;
    background-color: #ffffff !important;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #f0f1f2 !important;
    }
  }
`;
