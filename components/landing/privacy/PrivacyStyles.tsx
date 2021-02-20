import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/common/misc/Headings";

export const HeadingRow = tw.div`flex`;

export const Heading = tw(SectionHeading)`text-gray-900 mb-10`;

export const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }

  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }

  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }

  h3 {
    ${tw`text-xl font-bold mt-6`}
  }

  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;
