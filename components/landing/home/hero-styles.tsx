import styled from "styled-components";
import cntl from "cntl";

export const OuterContainer = styled.div`
  margin-bottom: -80px;
  position: relative;
  background: linear-gradient(160deg, rgba(84,51,255,1) 0%, rgba(77,105,233,1) 50%, rgba(81,210,255,1) 100%);
  text-align: center;
  overflow: hidden;
`;

export const MiddleContainer = cntl`flex items-center justify-center h-108 md:h-128`;

export const InnerContainer = cntl`relative text-white md:pb-32 md:mt-16 xl:mt-0`;

export const TwoColumn = cntl`flex flex-col lg:flex-row lg:items-center w-full max-w-screen-xl mx-auto px-16 xl:px-4 py-0 md:py-24`;

export const LeftColumn = cntl`relative lg:w-5/12 text-center max-w-lg mt-0 mb-16 xs:mb-16 sm:mb-0 md:mt-32 lg:mt-16 mx-auto lg:max-w-none lg:text-left`;

export const RightColumn = cntl`relative mb-16 lg:mb-0 flex-1 flex flex-col justify-center lg:self-end`;

export const Heading = cntl`font-medium mb-8 sm:mb-16 text-3.5xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-5.5xl leading-tight`;

export const Paragraph = cntl`lg:my-4 text-md sm:text-lg lg:text-xl xl:text-2xl`;

export const PrimaryButton = cntl`px-24 py-4 font-medium rounded mt-12 rounded-full tracking-wide text-lg text-center`;

export const IllustrationContainer = cntl`flex justify-center mt-16 lg:justify-end items-center`;

export const StyledImage = cntl`min-w-0 w-0 h-0 invisible lg:visible lg:w-11/12 lg:h-11/12 max-w-4xl xl:max-w-3xl`;

export const DecoratorBlob = cntl`pointer-events-none opacity-10 absolute right-0 bottom-0 h-24 w-24 sm:h-48 sm:w-48 lg:h-64 lg:w-64 transform translate-x-16 sm:translate-x-32 lg:translate-x-40 translate-y-4 sm:translate-y-6 md:translate-y-8 z-10`;
