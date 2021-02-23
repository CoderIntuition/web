import styled from "styled-components";
import Slider from "react-slick";
import cntl from "cntl";

export const Row = cntl`flex flex-col md:flex-row justify-between items-center`;

export const ImageColumn = cntl`w-full max-w-md mx-auto md:max-w-none md:w-4/12 md:w-5/12 flex-shrink-0 relative`;

export const TextColumn = cntl`w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-7/12 xl:w-6/12 mt-16 md:mt-0 md:pl-12 lg:pl-16 md:order-last text-center md:text-left`;

export const Subheading = cntl`text-lg md:text-2xl font-normal text-primary-500 mb-0 md:mb-4 uppercase tracking-widest`;

export const Heading = cntl`text-3xl md:text-5xl font-semibold tracking-wide text-center md:text-left`;

export const Description = cntl`mt-4 text-base lg:text-lg leading-relaxed text-secondary-100 md:text-left text-center`;

export const TestimonialSliderStyles = cntl`w-full mt-16 text-center sh md:text-left`;

export const TestimonialSlider = styled(Slider)`
  .slick-track {
    display: flex;
  }

  .slick-slide {
    height: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 0.25rem;
  }
`;

export const Testimonial = cntl`outline-none h-full flex! flex-col`;

export const TestimonialHeading = cntl`mt-4 text-xl font-semibold`;

export const Quote = cntl`mt-4 mb-8 leading-relaxed text-secondary-100`;

export const CustomerInfoAndControlsContainer = cntl`mt-auto flex justify-between items-center flex-col sm:flex-row`;

export const CustomerInfo = cntl`flex flex-col sm:flex-row items-center justify-center lg:justify-start`;

export const CustomerProfilePicture = cntl`rounded-full w-20 h-20 sm:w-32 sm:h-32`;

export const CustomerTextInfo = cntl`text-center justify-center md:text-left sm:ml-6 mt-4`;

export const CustomerName = cntl`font-semibold text-lg`;

export const CustomerTitle = cntl`text-secondary-100`;

export const CompanyImage = cntl`w-24 block my-0 mx-auto md:inline md:my-0 md:mx-0`;

export const Controls = cntl`flex mt-8 sm:mt-0`;

export const ControlsDivider = cntl`my-3 border-r`;

export const ControlButton = cntl`mx-3 p-4 rounded-full transition duration-300 bg-gray-200 hover:bg-gray-300 text-primary-500 hover:text-primary-700 focus:outline-none focus:shadow-outline`;

export const ControlButtonIcon = cntl`w-4 h-4 stroke-3`;

export const DecoratorBlob = cntl`pointer-events-none absolute left-0 bottom-0 w-56 sm:w-64 opacity-15 transform -translate-x-32 translate-y-32`;
