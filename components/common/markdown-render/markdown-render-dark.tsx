import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import { BlockMath, InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import { StyledDivDark } from "./markdown-render-styles";

interface MarkdownRenderDarkProps {
  source: string;
}

const MarkdownRenderDark: FC<MarkdownRenderDarkProps> = (props) => {
  const newProps = (props) => ({
    ...props,
    escapeHtml: false,
    plugins: [RemarkMathPlugin],
    renderers: {
      ...props.renderers,
      math: ({ value }) => <BlockMath>{value}</BlockMath>,
      inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
    },
  });

  return (
    <>
      <StyledDivDark className="markdown-body">
        <ReactMarkdown {...newProps(props)} />
      </StyledDivDark>
    </>
  );
};

export default MarkdownRenderDark;
