import styled from "styled-components";
import { Button } from "semantic-ui-react";
import cntl from "cntl";

export const HeaderContainer = cntl`w-full flex flex-col items-center`;

export const Subheading = cntl`mb-4 text-center text-lg md:text-2xl font-normal text-primary-500 mb-0 md:mb-4 uppercase tracking-widest`;

export const Heading = cntl`text-3xl md:text-5xl font-semibold tracking-wide text-center w-full`;

export const Heading2 = cntl`text-3xl md:text-5xl font-semibold tracking-wide w-full`;

export const Description = cntl`mt-4 text-base lg:text-lg leading-relaxed text-secondary-100 max-w-xl w-full text-center`;

export const PlanDurationSwitcher = cntl`block w-full max-w-xs sm:inline-block sm:w-auto border-2 rounded-full px-1 py-1 mt-8`;

export const SwitchButton = cntl`w-1/2 sm:w-32 px-4 sm:px-8 py-3 rounded-full focus:outline-none text-sm font-bold text-gray-700 transition duration-300`;

export const SwitchButtonActive = cntl`w-1/2 sm:w-32 px-4 sm:px-8 py-3 rounded-full focus:outline-none text-sm font-bold transition duration-300 bg-primary-500 text-gray-100`;

export const PlansContainer = cntl`flex justify-center flex-col md:flex-row items-center md:items-start relative pb-24`;

export const Plan = cntl`w-full max-w-80 mt-16 md:mr-12 md:last:mr-0 text-center px-8 rounded-2xl relative text-gray-900 bg-white flex flex-col shadow-lg`;

export const PlanHeader = cntl`flex flex-col leading-relaxed py-8 -mx-8 bg-primary-100 rounded-t-lg`;

export const PlanPrice = cntl`font-bold text-gray-800 text-4xl sm:text-5xl my-1`;

export const PlanSlash = cntl`text-xl text-gray-600`;

export const PlanDuration = cntl`lowercase text-gray-600 font-medium tracking-widest`;

export const PlanFreeName = cntl`font-semibold text-gray-800 text-xl`;

export const PlanPlusName = cntl`font-semibold text-primary-500 text-xl`;

export const PlanMainFeature = cntl`text-gray-600 text-sm font-medium tracking-wide`;

export const PlanFeatures = cntl`flex flex-col -mx-8 px-8 py-4 flex-1 text-base`;

export const PlanFeaturesSpan = cntl`mt-5 first:mt-0 font-normal text-secondary-200`;

export const PlanAction = cntl`px-4 pb-8 mt-4`;

export const DecoratorBlob1 = cntl`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-10 transform translate-x-40 fill-current text-teal-300`;

export const DecoratorBlob2 = cntl`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-32 -translate-y-1/2`;

export const StyledButton = styled(Button)`
  &&& {
    color: #f7fafc;
    border-radius: 9999px;
    width: 140px;
    padding: 12px 0 !important;
    font-size: 14px;
    transition-duration: 300ms;
    letter-spacing: 0.025em;
`;

export const OuterContainer = styled.div`
  margin-bottom: -20px;
  position: relative;
  background: linear-gradient(160deg, rgba(84,51,255,1) 0%, rgba(77,105,233,1) 50%, rgba(81,210,255,1) 100%);
  text-align: center;
  overflow: hidden;
`;

export const InnerContainer = cntl`relative md:pb-32 md:mt-16 xl:mt-0`;
