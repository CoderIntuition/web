import styled from "styled-components";

export const StyledDiv = styled.div`
  &&& {
    font-family: Inter, serif;

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

    table {
      font-size: 14px;
      width: fit-content;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #dfe2e5;
    }
    
    td {
      padding: 4px 8px;
      border-left: none;
      border-bottom: none;
    }
    
    th {
      padding: 4px 8px;
      border: none;
      background-color: #f6f8fa;
    }
    
    tr {
      border: none;
      background-color: #ffffff;
    }
  }
`;

export const StyledDivDark = styled.div`
  &&& {
    font-family: Inter, serif;
    color: #e0e0e0 !important;

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
    
    code {
      background-color: #333333;  
    }

    table {
      font-size: 14px;
      width: fit-content;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
      border: 1px solid #dfe2e5;
    }

    td {
      padding: 4px 8px;
      border-left: none;
      border-bottom: none;
    }

    th {
      padding: 4px 8px;
      border: none;
      background-color: #2a2a2a;
    }

    tr {
      border: none;
      background-color: #202020;
    }
  }
`;
