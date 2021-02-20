import styled from "styled-components";
import tw from "twin.macro";
import {PrimaryButton as PrimaryButtonBase, SectionHeading, Subheading as SubheadingBase} from "./landing-styles";
import Image from "next/image";

export const Container = tw.div`relative`;

export const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;

export const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

export const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 relative`;

export const TextColumn = styled(Column)((props) => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft
    ? tw`md:mr-12 lg:mr-16 md:order-first`
    : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

export const TextContent = tw.div`lg:py-8 text-center md:text-left`;

export const Subheading = tw(
  SubheadingBase
)`mb-4 uppercase tracking-widest font-bold text-primary-500`;

export const Heading = tw(SectionHeading)`text-left text-center md:text-left`;

export const Description = tw.p`mt-8 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

export const Features = tw.div`mx-auto md:mx-0 flex flex-col lg:flex-row max-w-xs lg:max-w-none`;

export const Feature = tw.div`mt-10 lg:mt-8 flex items-center md:items-start flex-col md:mr-8 last:mr-0`;

export const FeatureHeadingContainer = tw.div`flex items-center`;

export const FeatureIconContainer = styled.div`
  ${tw`mx-auto inline-block border border-primary-500 text-primary-500 text-center rounded p-2 flex-shrink-0`}
  ${(props) => [
    props.iconRoundedFull && tw`rounded-full`,
    props.iconFilled && tw`border-0 bg-primary-500 text-gray-100`,
  ]}
  svg {
    ${tw`w-5 h-5`}
  }
`;

export const FeatureHeading = tw.div`ml-3 font-bold text-xl`;

export const FeatureDescription = tw.div`mt-4 font-medium text-center md:text-left text-secondary-100 leading-loose`;

export const PrimaryButton = styled(PrimaryButtonBase)((props) => [
  tw`mt-12 text-base font-medium inline-block py-4 px-16 mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`,
]);

export const DecoratorBlob1 = tw(Image)`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`;
