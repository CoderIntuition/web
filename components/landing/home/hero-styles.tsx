import styled from "styled-components";
import cntl from "cntl";

export const OuterContainer = styled.div`
  margin-bottom: -20px;
  position: relative;
  background: linear-gradient(160deg, rgba(84,51,255,1) 0%, rgba(77,105,233,1) 50%, rgba(81,210,255,1) 100%);
  text-align: center;
  overflow: hidden;
`;

export const MiddleContainer = cntl`flex items-center justify-center h-1/8 md:h-128`;

export const InnerContainer = cntl`relative text-white pb-32 mt-16 xl:mt-0`;

export const TwoColumn = cntl`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto px-4 py-20 md:py-24`;

export const LeftColumn = cntl`relative lg:w-5/12 text-center max-w-lg mt-24 mx-auto lg:max-w-none lg:text-left`;

export const RightColumn = cntl`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

export const Heading = cntl`font-light mb-12 text-4xl md:text-5xl lg:text-5xl xl:text-5.5xl leading-tight`;

export const Paragraph = cntl`lg:my-8 text-lg lg:text-xl xl:text-2xl`;

export const PrimaryButton = cntl`px-24 py-4 font-medium rounded mt-8 rounded-full tracking-wide text-lg text-center`;

export const IllustrationContainer = cntl`flex justify-center lg:justify-end items-center`;

export const StyledImage = cntl`min-w-0 w-full max-w-2xl xl:max-w-3xl`;

export const DecoratorBlob = cntl`pointer-events-none opacity-10 absolute right-0 bottom-0 h-64 w-64 transform translate-x-40 translate-y-8 z-10`;
