import styled from "styled-components";
import { Button, Form, FormField, Grid, GridColumn, Input } from "semantic-ui-react";

export const Wrapper = styled.div`
  &&& {
    display: flex;
    background-color: #4d69e9;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

export const StyledGrid = styled(Grid)`
  &&& {
    width: 1100px;
    background-color: rgb(255, 255, 255);
    color: rgb(26, 32, 44);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    border-radius: 15px;
  }
`;

export const StyledGraphicColumn = styled(GridColumn)`
  &&&&& {
    padding: 0;
    background: #eaedfc;
    border-radius: 0 15px 15px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 767px) {
      display: none;
    }
  }
`;

export const StyledTextColumn = styled(GridColumn)`
  &&&&& {
    padding: 48px;
  }
`;

export const Heading = styled.h1`
  &&& {
    font-weight: 600;
    color: #243e63;
    font-size: 30px;
    margin-top: 48px;
  }
`;

export const StyledLoginInput = styled(Input)`
  &&& {
    margin-bottom: 20px;
  }
`;

export const StyledSignUpInput = styled(Input)`
  &&& {
    margin-bottom: 10px;
  }
`;

export const StyledForm = styled(Form)`
  &&& {
    margin-top: 32px;
  }
`;

export const StyledFormField = styled(FormField)`
  &&& {
    width: 100%;
    flex: 1 1 0%;
    margin-left: auto;
    margin-right: auto;
    max-width: 320px;
  }
`;

export const StyledSignInButton = styled(Button)`
  &&& {
    width: 100%;
    max-width: 320px;
    letter-spacing: 0.025em;
    padding-block: 12px;
    border-radius: 10px;
    font-weight: 400;
  }
`;

export const StyledSignUpButton = styled(Button)`
  &&& {
    width: 100%;
    max-width: 320px;
    letter-spacing: 0.025em;
    margin-top: 10px;
    padding-block: 12px;
    border-radius: 10px;
    font-weight: 400;
  }
`;

export const ForgotPassword = styled.p`
  &&& {
    margin-top: 24px;
    font-size: 12px;
    color: rgb(113, 128, 150);
    text-align: center;
    font-weight: 400;
  }
`;

export const EmailLabel = styled.span`
  &&& {
    display: block;
    margin-bottom: 4px;
    color: #000000de;
    font-size: 13px;
    font-weight: 600;
  }
`;

export const OAuthButton = styled(Button)`
  &&&&& {
    padding: 10px 20px;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    margin-left: 10px;
    &:hover {
      background-color: #f4f4f4;
    }
  }
`;

export const StyledLink = styled.a`
  &&& {
    border-bottom: 1px dotted rgb(160, 174, 192);
    color: inherit;
    cursor: pointer;
    &:hover {
      color: #4d69e9;
    }
  }
`;

export const SeparatorWrapper = styled.div`
  &&& {
    max-width: 320px;
    width: 80%;
    margin: 0 auto;
  }
`;

export const Separator = styled.div`
  &&& {
    display: flex;
    align-items: center;
    text-align: center;
    color: rgb(113, 128, 150);
    margin-top: 35px;
    margin-bottom: 20px;
    &:before,
    &:after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #e0e0e0;
    }
    &:before {
      margin-right: 10px;
    }
    &:after {
      margin-left: 10px;
    }
  }
`;

export const PromptText = styled.p`
  &&& {
    margin-top: 32px;
    font-size: 14px;
    color: rgb(113, 128, 150);
    text-align: center;
    font-weight: 400;
  }
`;
