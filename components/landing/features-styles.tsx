import styled from "styled-components";
import tw from "twin.macro";
import {SectionDescription, SectionHeading, Subheading as SubheadingBase,} from "./landing-styles";
import Image from "next/image";

export const Container = tw.div`relative`;

export const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-lg mx-auto py-20 md:py-24`}
`;

export const Subheading = tw(
  SubheadingBase
)`mb-4 uppercase tracking-widest font-bold text-primary-500`;

export const Heading = tw(SectionHeading)`w-full`;

export const Description = tw(SectionDescription)`w-full text-center`;

export const VerticalSpacer = tw.div`mt-10 w-full`;

export const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 max-w-sm`}
`;

export const FeatureIconContainer = tw.div`text-primary-500`;

export const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left h-full mx-4 px-2 py-8`}
  .imageContainer {
    ${tw`border text-center rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }

  .title {
    ${tw`mt-4 tracking-wide font-bold text-2xl leading-none`}
  }

  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-base text-secondary-100 leading-loose`}
  }
`;

export const DecoratorBlob1 = tw.img`pointer-events-none absolute right-0 top-0 w-64 opacity-25 transform translate-x-40 -translate-y-4`;
export const DecoratorBlob2 = tw.img`pointer-events-none absolute left-0 bottom-0 w-64 opacity-25 transform -translate-x-40 translate-y-24`;
