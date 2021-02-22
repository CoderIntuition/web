import styled from "styled-components";
import cntl from "cntl";

export const OuterContainer = styled.div`
  background: rgb(77, 105, 233);
  background: linear-gradient(90deg, rgba(77, 105, 233, 1) 0%, rgba(123, 97, 220, 1) 59%, rgba(151, 90, 205, 1) 100%);
  text-align: center;
  overflow: hidden;
`;

export const MiddleContainer = cntl`flex items-center justify-center`;

export const InnerContainer = cntl`relative text-white pb-32 mt-16 xl:mt-0`;

export const TwoColumn = cntl`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;

export const LeftColumn = cntl`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;

export const RightColumn = cntl`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

export const Heading = cntl`font-bold mb-12 text-4xl md:text-4xl lg:text-5xl xl:text-5.5xl leading-tight`;

export const Paragraph = cntl`lg:my-8 text-lg md:text-2xl`;

export const PrimaryButton = cntl`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300 mt-8 rounded-full inline-block w-3/6 tracking-wide font-medium text-lg text-center py-5`;

export const IllustrationContainer = cntl`flex justify-center lg:justify-end items-center`;

export const StyledImage = cntl`min-w-0 w-full max-w-2xl xl:max-w-3xl`;

export const DecoratorBlob1 = cntl`pointer-events-none opacity-100 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 translate-y-12 z-10`;
