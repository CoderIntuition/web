import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../landing-styles";

export const Container = tw.div`relative`;

export const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;

export const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;

export const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;

export const TextColumn = styled(Column)((props) => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`,
]);

export const Image = styled.div((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);

export const TextContent = tw.div`lg:py-8 text-center md:text-left`;

export const Subheading = tw(SubheadingBase)`mb-4 uppercase tracking-widest font-bold text-primary-500`;

export const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

export const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

export const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`;

const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`;

export const StyledInput = styled(Input)`
  background-color: #f8f8fc;
`;

const Textarea = styled(Input).attrs({ as: "textarea" })`
  ${tw`h-24`}
`;

export const StyledTextarea = styled(Textarea)`
  background-color: #f8f8fc;
`;
