import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "../landing-styles";
import cntl from "cntl";

export const HeadingRow = cntl`flex`;

export const Heading = cntl`text-3xl md:text-5xl font-semibold tracking-wide text-center text-gray-900 mb-10`;

export const Text = cntl`text-lg text-gray-800`;

export const TextP = cntl`mt-2 leading-loose`;

export const TextH1 = cntl`text-3xl font-semibold mt-10`;

export const TextH2 = cntl`text-2xl font-semibold mt-8`;

export const TextUl = cntl`list-disc list-inside`;

export const TextLi = cntl`ml-2 mb-3`;
