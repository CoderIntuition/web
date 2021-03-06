import styled from "styled-components";
import { Accordion, AccordionTitle, GridColumn, GridRow, TextArea } from "semantic-ui-react";
import { X, Check, CheckCircle, XCircle } from "react-feather";

export const StyledTextArea = styled(TextArea)`
  &&& {
    padding-block: 2px;
    height: ${(props) => props.height}px;
    min-height: ${(props) => props.height}px;
    background-color: ${(props) => (props.dark ? "#303136" : "")};
    border: ${(props) => (props.dark ? "none !important" : "")};
    color: ${(props) => (props.dark ? "#c0c0c0 !important" : "")};
  }
`;

export const TopRow = styled(GridRow)`
  &&& {
    margin-top: -5px;
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};
  }
`;

export const LeftColumn = styled(GridColumn)`
  &&& {
    flex: 0 0 100px;
    color: ${(props) => (props.dark ? "#e0e0e0" : "")};
  }
`;

export const RightColumn = styled(GridColumn)`
  &&& {
    flex: 1;
  }
`;

export const StatusText = styled.span`
  &&& {
    font-weight: 500;
    font-size: 16px;
  }
`;

export const StyledCheckCircle = styled(CheckCircle)`
  &&& {
    display: inline;
    margin-right: 10px;
    color: #20bf6b;
  }
`;

export const StyledXCircle = styled(XCircle)`
  &&& {
    display: inline;
    margin-right: 10px;
    color: #fc5c65;
  }
`;

export const CheckRight = styled(Check)`
  &&& {
    float: right;
    color: #20bf6b;
  }
`;

export const XRight = styled(X)`
  &&& {
    float: right;
    color: #fc5c65;
  }
`;

export const StyledAccordion = styled(Accordion)`
  &&& {
    background-color: ${(props) => (props.dark ? "#242529" : "")};
  }
`;

export const AccordionTitleSpan = styled.span`
  color: ${(props) => (props.dark ? "#e0e0e0" : "")};
`;
