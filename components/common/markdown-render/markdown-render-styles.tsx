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
  }
`;
