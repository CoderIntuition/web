import cntl from "cntl";

export const TwoColumn = cntl`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;

export const ImageColumn = cntl`w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-5/12 flex-shrink-0 relative`;

export const TextColumn = cntl`w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-6/12 mt-16 md:mt-0 md:mr-12 lg:mr-16 md:order-first`;

export const TextContent = cntl`lg:py-8 text-center md:text-left`;

export const Subheading = cntl`text-lg md:text-2xl font-normal text-primary-500 mb-0 md:mb-4 uppercase tracking-widest`;

export const Heading = cntl`text-3xl md:text-5xl font-semibold tracking-wide text-center md:text-left`;

export const Description = cntl`mt-4 text-base lg:text-lg leading-relaxed text-secondary-100 md:text-left text-center`;

export const Form = cntl`mt-8 md:mt-10 text-sm flex flex-col max-w-md mx-auto md:mx-0`;

export const Input = cntl`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none transition duration-300 focus:border-primary-500`;

export const TextArea = cntl`mt-6 h-32 first:mt-0 border-b-2 py-3 focus:outline-none transition duration-300 focus:border-primary-500`;
