import styled from "styled-components";
import { Table, TableHeaderCell } from "semantic-ui-react";
import { VHeader } from "../../common/global-styles";

export const ActionText = styled.span`
  &&& {
    font-weight: 400;
    font-size: 14px;
  }
`;

export const VHeaderWithBorder = styled(VHeader)`
  padding-bottom: 0.3em;
  border-bottom: 1px solid #eaecef;
`;

export const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  min-width: 280px;
`;

export const HeaderText = styled.span`
  margin-left: 5px;
  margin-bottom: 1px;
  font-size: 13px;
`;

export const BlurTopDiv = styled.div`
  &&& {
    position: absolute;
    display: flex;
    z-index: 1;
    justify-content: center;
    align-items: center;
    width: calc(100% - 20px);
    height: 80%;
    text-align: center;
  }
`;

export const BlurredDiv = styled.div`
  &&& {
    margin-bottom: 10px;
    filter: blur(7px);
    user-select: none;
  }
`;

export const StatusLinkText = styled.span`
  &&& {
    cursor: pointer;
    color: ${(props) => (props.status === "ACCEPTED" ? "#20BF6B" : "#FC5C65")};

    &:hover {
      color: ${(props) => (props.status === "ACCEPTED" ? "#1eae61" : "#fb4751")};
      text-decoration: underline;
    }
  }
`;

export const StatusText = styled.span`
  &&& {
    color: ${(props) => (props.status === "ACCEPTED" ? "#20BF6B" : "#FC5C65")};
  }
`;

export const TestResultText = styled.span`
  &&& {
    color: ${(props) => (props.color === "green" ? "#20BF6B" : "#FC5C65")};
  }
`;

export const DescriptionStyles = styled.div`
  &&& {
    ul {
      list-style: disc;
      font-size: 14px;
    }

    ol {
      list-style: decimal;
      font-size: 14px;
    }

    p {
      font-size: 14px;
    }

    .markdown-body h2 {
      font-size: 16px;
      font-weight: 500;
    }

    .markdown-body h3 {
      font-size: 16px;
      font-weight: 500;
      margin-top: 20px;
      margin-bottom: 8px;
    }

    .markdown-body h4 {
      font-size: 14px;
      font-weight: 500;
    }
  }
`;

export const StyledTable = styled(Table)`
  &&&&& {
    background-color: ${(props) => (props.dark ? "#202125" : "")};
    color: ${(props) => (props.dark ? "#e0e0e0" : "")} !important;
    margin-bottom: 50px;
  }
`;

export const StyledTableRow = styled(Table.Row)`
  &&&&& {
    background-color: ${(props) => (props.dark ? "#202125" : "")};
    color: ${(props) => (props.dark ? "#e0e0e0" : "")} !important;
  }
`;

export const StyledTableHeaderCell = styled(TableHeaderCell)`
  &&&&& {
    color: ${(props) => (props.dark ? "#e0e0e0" : "")} !important;
  }
`;
