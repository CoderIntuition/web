import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import RemarkMathPlugin from "remark-math";
import RemarkGfm from "remark-gfm";
import { BlockMath, InlineMath } from "react-katex";
import "github-markdown-css";
import "katex/dist/katex.min.css";
import { StyledDiv } from "./markdown-render-styles";

interface MarkdownRenderProps {
  source: string
}

const MarkdownRender: FC<MarkdownRenderProps> = (props) => {
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
      <StyledDiv className="markdown-body">
        <ReactMarkdown {...newProps(props)} />
      </StyledDiv>
    </>
  );
};

export default MarkdownRender;
