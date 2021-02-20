import React from "react";
import Link from "next/link";
import {HighlightedText} from "./landing-styles";
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
      <MiddleContainer style={{height: "calc(100vh - 80px)"}}>
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
                  src="/landing.svg"
                  alt="Landing page illustration"
                  layout="fill"
                />
              </IllustrationContainer>
            </RightColumn>
          </TwoColumn>
        </InnerContainer>
      </MiddleContainer>
      <DecoratorBlob1
        src="/svg-decorator-blob-1.svg"
        alt="Decorator blob"
        layout="fill"
      />
    </OuterContainer>
  );
};

export default Hero;
