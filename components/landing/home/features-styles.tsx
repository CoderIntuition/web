import cntl from "cntl";

export const Container = cntl`relative`;

export const ThreeColumnContainer = cntl`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 mb-4 md:pb-4 md:pt-0`;

export const Subheading = cntl`text-lg md:text-2xl font-normal text-primary-500 mb-0 md:mb-4 uppercase tracking-widest`;

export const Heading = cntl`text-3xl md:text-5xl font-semibold tracking-wide text-center w-full`;

export const Description = cntl`mt-4 text-base lg:text-lg leading-relaxed text-secondary-100 max-w-xl w-full text-center`;

export const VerticalSpacer = cntl`mt-4 md:mt-10 w-full`;

export const Column = cntl`md:w-1/2 lg:w-1/3 max-w-sm`;

export const Card = cntl`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-4 md:py-8`;

export const CardImageContainer = cntl`border text-center rounded-full p-5 flex-shrink-0`;

export const CardImageContainerImage = cntl`w-6 h-6`;

export const CardFeatureIconContainer = cntl`text-primary-500`;

export const CardTextContainer = cntl`sm:ml-4 mt-4 sm:mt-2`;

export const CardTitle = cntl`mt-4 tracking-wide font-semibold text-2xl leading-none`;

export const CardDescription = cntl`mt-1 sm:mt-4 font-normal text-base text-secondary-100 leading-loose`;

export const DecoratorBlob = cntl`pointer-events-none absolute left-0 bottom-0 w-48 sm:w-64 opacity-25 transform -translate-x-32 sm:-translate-x-40 translate-y-24`;
