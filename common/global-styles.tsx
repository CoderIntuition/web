import styled from "styled-components";
import { Button } from "semantic-ui-react";

export const BodyWrapper = styled.div`
  &&& {
    width: 100%;
    min-height: 100vh;
    padding-left: 60px;
    padding-right: 60px;
  }
`;

export const BodyWrapper1280 = styled.div`
  &&& {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 1280px;
    height: 100%;
    min-height: 720px;
    padding-left: 60px;
    padding-right: 60px;
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
