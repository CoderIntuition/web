import tw from "twin.macro";
import { motion } from "framer-motion";
import styled from "styled-components";
import { SectionDescription, SectionHeading, Subheading as SubheadingBase } from "../landing-styles";

export const Subheading = tw(SubheadingBase)`mb-4 text-center uppercase tracking-widest font-bold text-primary-500`;

export const Heading = tw(SectionHeading)`w-full`;

export const Description = tw(SectionDescription)`w-full text-center`;

export const Column = tw.div`flex flex-col items-center`;

export const HeaderContent = tw.div``;

export const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;

export const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;

export const Question = tw.dt`flex justify-between items-center`;

export const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;

export const QuestionToggleIcon = motion.custom(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);

export const Answer = motion.custom(tw.dd`pointer-events-none text-sm sm:text-lg leading-relaxed`);

export const DecoratorBlob1 = tw.img`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`;

export const DecoratorBlob2 = tw.img`pointer-events-none -z-20 absolute left-0 top-0 h-64 w-64 opacity-15 transform -translate-x-2/3 translate-y-80 text-primary-500`;
