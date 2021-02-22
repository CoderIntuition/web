/** @jsxImportSource @emotion/react */
import tw from "twin.macro";
import cntl from "cntl";

export const Container = cntl`relative`;

export const HighlightedText = cntl`text-primary-500 font-semibold`;

export const PrimaryButton = cntl`px-8 py-3 font-bold rounded bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;

export const SectionHeading = tw.h1`text-3xl md:text-5xl font-bold tracking-wide text-center`;
export const Subheading = tw.h1`text-lg md:text-2xl font-bold text-primary-500`;

export const ContentWithPaddingXl = cntl`max-w-screen-xl mx-auto py-20 lg:py-24`;
export const ContentWithPaddingLg = cntl`max-w-screen-lg mx-auto py-4 lg:py-10`;
export const ContentWithVerticalPadding = tw.div`py-20 lg:py-24`;
export const ContentXl = tw.div`max-w-screen-xl mx-auto`;

export const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 p-8 overflow-hidden`;

export const PrimaryLink = tw.a`cursor-pointer font-bold text-primary-500 border-b-2 border-transparent hocus:border-primary-500 hocus:text-primary-800 transition duration-300`;

export const SectionDescription = tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100 max-w-xl`;
