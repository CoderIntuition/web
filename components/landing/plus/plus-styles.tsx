import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Button } from "semantic-ui-react";
import { SectionDescription, SectionHeading, Subheading as SubheadingBase } from "../landing-styles";

export const HeaderContainer = tw.div`w-full flex flex-col items-center`;

export const Subheading = tw(SubheadingBase)`mb-4 uppercase tracking-widest font-bold text-primary-500`;

export const Heading = tw(SectionHeading)`w-full`;

export const Description = tw(SectionDescription)`w-full text-center`;

export const PlanDurationSwitcher = tw.div`block w-full max-w-xs sm:inline-block sm:w-auto border-2 rounded-full px-1 py-1 mt-8`;

export const SwitchButton = styled.button`
  ${tw`w-1/2 sm:w-32 px-4 sm:px-8 py-3 rounded-full focus:outline-none text-sm font-bold text-gray-700 transition duration-300`} ${(
    props
  ) => props.active && tw`bg-primary-500 text-gray-100`}
`;

export const PlansContainer = tw.div`flex justify-center flex-col md:flex-row items-center md:items-start relative`;

export const Plan = styled.div`
  ${tw`w-full max-w-80 mt-16 md:mr-12 md:last:mr-0 text-center px-8 rounded-lg relative text-gray-900 bg-white flex flex-col shadow-raised`} ${(
    props
  ) =>
    props.featured &&
    css`
      ${tw`border-2 border-gray-200 shadow-none`}
    `}
`;

export const PlanHeader = styled.div`
  ${tw`flex flex-col leading-relaxed py-8 -mx-8 bg-gray-100 rounded-t-lg`}
  .name {
    ${tw`font-bold text-xl`}
  }

  .price {
    ${tw`font-bold text-4xl sm:text-5xl my-1`}
  }

  .slash {
    ${tw`text-xl text-gray-600`}
  }

  .duration {
    ${tw`lowercase text-gray-600 font-medium tracking-widest`}
  }

  .mainFeature {
    ${tw`text-gray-600 text-sm font-medium tracking-wide`}
  }
`;

export const PlanFeatures = styled.div`
  ${tw`flex flex-col -mx-8 px-8 py-8 flex-1 text-base`}
  .feature {
    ${tw`mt-5 first:mt-0 font-normal text-secondary-200`}
  }
`;

export const PlanAction = tw.div`px-4 pb-8`;

export const DecoratorBlob1 = tw.img`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-25 transform -translate-x-2/3 -translate-y-1/2`;

export const DecoratorBlob2 = tw.img`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-5 transform translate-x-2/3 translate-y-1/2 fill-current text-teal-300`;

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
