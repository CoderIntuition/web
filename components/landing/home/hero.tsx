import React from "react";
import Link from "next/link";
import {HighlightedText} from "../landing-styles";
import {
  DecoratorBlob1,
  Heading,
  IllustrationContainer,
  InnerContainer,
  LeftColumn,
  MiddleContainer,
  OuterContainer,
  Paragraph,
  PrimaryButton,
  RightColumn,
  StyledImage,
  TwoColumn,
} from "./hero-styles";

const Hero = () => {
  return (
    <OuterContainer>
      <MiddleContainer style={{height: "calc(100vh)"}}>
        <InnerContainer>
          <TwoColumn>
            <LeftColumn>
              <Heading>
                Learn Algorithmic <HighlightedText>Intuition</HighlightedText> Interactively
              </Heading>
              <Paragraph>
                Don't just memorize the solutions, learn the actual intuition
                required to solve the problems step-by-step on our interactive
                platform.
              </Paragraph>
              <Link href="/problems">
                <PrimaryButton>Get Started</PrimaryButton>
              </Link>
            </LeftColumn>
            <RightColumn>
              <IllustrationContainer>
                <StyledImage
                  src="/images/landing.svg"
                  alt="Landing page illustration"
                  width="800px"
                  height="800px"
                />
              </IllustrationContainer>
            </RightColumn>
          </TwoColumn>
        </InnerContainer>
      </MiddleContainer>
      <DecoratorBlob1
        src="/images/svg-decorator-blob-1.svg"
        alt="Decorator blob"
      />
    </OuterContainer>
  );
};

export default Hero;
