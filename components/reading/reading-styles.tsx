import styled from "styled-components";

export const CenteredDiv = styled.div`
  &&& {
    position: relative;
    width: 900px;
    margin: 30px auto 60px auto;
  }
`;

export const LeftDiv = styled.div`
  &&& {
    position: absolute;
    top: 0;
    right: 100%;
    width: 60px;
    height: 60px;
  }
`;

export const ReadingStyles = styled.div`
  &&& {
    ul {
      list-style: disc;
      font-size: 16px;
    }

    ol {
      list-style: decimal;
      font-size: 16px;
    }

    p {
      font-size: 16px;
      line-height: 1.6;
    }
  }
`;
