import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import RemarkGfm from "remark-gfm";
import { BlockMath, InlineMath } from "react-katex";
import "github-markdown-css";
import "katex/dist/katex.min.css";
import { StyledDivDark } from "./markdown-render-styles";

interface MarkdownRenderDarkProps {
  source: string;
}

const MarkdownRenderDark: FC<MarkdownRenderDarkProps> = (props) => {
  const newProps = (props) => ({
    ...props,
    escapeHtml: false,
    plugins: [RemarkMathPlugin, RemarkGfm],
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
