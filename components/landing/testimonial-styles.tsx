import styled from "styled-components";
import tw from "twin.macro";
import NextImage from "next/image";
import Slider from "react-slick";
import {SectionHeading, Subheading as SubheadingBase,} from "./landing-styles";

export const Row = tw.div`flex flex-col md:flex-row justify-between items-center`;

export const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

export const ImageColumn = tw(
  Column
)`md:w-4/12 xl:w-5/12 flex-shrink-0 relative`;

export const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 xl:w-6/12 mt-16 md:mt-0 `,
  props.textOnLeft
    ? tw`md:pr-12 lg:pr-16 md:order-first text-center md:text-left`
    : tw`md:pl-12 lg:pl-16 md:order-last text-center md:text-left`,
]);

export const Image = styled(NextImage)((props) => [
  props.imagerounded && tw`rounded`,
  props.imageborder && tw`border`,
  props.imageshadow && tw`shadow`,
]);

export const CompanyImage = styled.img(tw`w-24 block my-0 mx-auto md:inline md:my-0 md:mx-0`);

export const Subheading = tw(
  SubheadingBase
)`mb-4 uppercase tracking-widest font-bold text-primary-500`;

export const Heading = tw(SectionHeading)`text-left text-center md:text-left`;

export const Description = tw.p`mt-6 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

export const TestimonialSlider = styled(Slider)`
  ${tw`w-full mt-10 text-center md:text-left`}
  .slick-track {
    ${tw`flex`}
  }

  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;

export const Testimonial = tw.div`outline-none h-full flex! flex-col`;

export const TestimonialHeading = tw.div`mt-4 text-xl font-bold`;

export const Quote = tw.blockquote`mt-4 mb-8 sm:mb-10 leading-relaxed font-medium text-gray-700`;

export const CustomerInfoAndControlsContainer = tw.div`mt-auto flex justify-between items-center flex-col sm:flex-row`;

export const CustomerInfo = tw.div`flex flex-col sm:flex-row items-center justify-center lg:justify-start`;

export const CustomerProfilePicture = tw(NextImage)`rounded-full w-20 h-20 sm:w-32 sm:h-32`;

export const CustomerTextInfo = tw.div`text-center justify-center md:text-left sm:ml-6 mt-2 sm:mt-0`;

export const CustomerName = tw.h5`font-bold text-xl`;

export const CustomerTitle = tw.p`font-medium text-secondary-100`;

export const Controls = styled.div`
  ${tw`flex mt-8 sm:mt-0`}
  .divider {
    ${tw`my-3 border-r`}
  }
`;

export const ControlButton = styled.button`
  ${tw`mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline`}
  svg {
    ${tw`w-4 h-4 stroke-3`}
  }
`;

export const DecoratorBlob = tw.img`pointer-events-none absolute left-0 bottom-0 w-64 opacity-25 transform -translate-x-32 translate-y-32`;
