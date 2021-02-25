import { motion } from "framer-motion";
import styled from "styled-components";
import cntl from "cntl";

export const Subheading = cntl`mb-4 text-center text-lg md:text-2xl font-normal text-primary-500 mb-0 md:mb-4 uppercase tracking-widest`;

export const Heading = cntl`text-3xl md:text-5xl font-semibold tracking-wide text-center w-full`;

export const Description = cntl`mt-4 text-base lg:text-lg leading-relaxed text-secondary-100 max-w-xl w-full text-center`;

export const Column = cntl`flex flex-col items-center`;

export const FAQSContainer = cntl`mt-12 max-w-4xl relative`;

export const FAQ = cntl`group cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 transition duration-300 shadow-sm`;

export const Question = cntl`flex justify-between items-center`;

export const QuestionText = cntl`text-lg lg:text-xl font-medium`;

export const QuestionToggleIcon = motion.custom(styled.span`
  margin-left: 0.5rem;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`) as any;

export const Answer = motion.custom(styled.dd`
  pointer-events: none;
  font-size: 0.875rem;
  line-height: 1.625;
  @media (min-width: 24rem) {
    font-size: 1.125rem;
  }
`) as any;

export const DecoratorBlob1 = cntl`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-32 text-teal-400`;

export const DecoratorBlob2 = cntl`pointer-events-none -z-20 absolute left-0 top-0 h-64 w-64 opacity-10 transform -translate-x-2/3 translate-y-128 text-primary-500`;
