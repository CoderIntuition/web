import cntl from "cntl";

export const TwoColumn = cntl`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 items-center`;

export const ImageColumn = cntl`w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-5/12 flex-shrink-0 relative`;

export const TextColumn = cntl`w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 mt-16 md:mt-0 md:mr-12 lg:mr-16 md:order-first`;

export const TextContent = cntl`lg:py-8 text-center md:text-left`;

export const Subheading = cntl`text-lg md:text-2xl font-normal text-primary-500 mb-0 md:mb-4 uppercase tracking-widest`;

export const Heading = cntl`text-3xl md:text-5xl font-semibold tracking-wide text-center md:text-left`;

export const Description = cntl`mt-4 text-base lg:text-lg leading-relaxed text-secondary-100 md:text-left text-center`;

export const Features = cntl`mx-auto md:mx-0 flex flex-col lg:flex-row max-w-xs lg:max-w-none`;

export const Feature = cntl`mt-10 lg:mt-8 flex items-center md:items-start flex-col md:mr-8 last:mr-0`;

export const FeatureHeadingContainer = cntl`flex items-center`;

export const FeatureIconContainer = cntl`mx-auto inline-block border border-primary-500 text-primary-500 text-center rounded p-2 flex-shrink-0 rounded-full border-0 bg-primary-500 text-gray-100`;

export const FeatureIcon = cntl`w-5 h-5`;

export const FeatureHeading = cntl`ml-3 font-semibold text-xl`;

export const FeatureDescription = cntl`mt-4 text-center md:text-left text-secondary-100 leading-loose`;

export const DecoratorBlob = cntl`pointer-events-none opacity-15 absolute right-0 bottom-0 h-64 w-64 transform translate-x-48 translate-y-32 -z-10`;
