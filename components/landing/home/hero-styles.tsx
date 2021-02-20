import styled from "styled-components";
import tw from "twin.macro";
import Image from "next/image";
import {PrimaryButton as PrimaryButtonBase} from "../landing-styles";

export const OuterContainer = tw.div`relative`;

export const MiddleContainer = tw.div`flex items-center justify-center`;

export const InnerContainer = tw.div`relative pb-32 mt-16 xl:mt-0`;

export const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;

export const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;

export const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

export const Heading = tw.h1`font-bold mb-12 text-4xl md:text-4xl lg:text-5xl xl:text-5.5xl text-gray-900 leading-tight`;

export const Paragraph = tw.p`lg:my-8 text-lg md:text-2xl`;

export const PrimaryButton = styled(PrimaryButtonBase)((props) => [
  tw`mt-8 rounded-full inline-block w-3/6 tracking-wide font-medium text-lg text-center py-5`,
]);

export const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

export const StyledImage = tw(Image)`min-w-0 w-full max-w-2xl xl:max-w-3xl`;

export const DecoratorBlob1 = tw.img`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 translate-y-12 -z-10`;
