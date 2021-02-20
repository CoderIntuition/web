import React from "react";
import tw from "twin.macro";
import Image from "next/image";
import {Info, Zap} from "react-feather";
import {HighlightedText} from "./landing-styles";
import {
  Container,
  DecoratorBlob1,
  Description,
  Feature,
  FeatureDescription,
  FeatureHeading,
  FeatureHeadingContainer,
  FeatureIconContainer,
  Features,
  Heading,
  ImageColumn,
  Subheading,
  TextColumn,
  TextContent,
  TwoColumn,
} from "./difference-styles";

const Difference = () => {
  const subheading = "DIFFERENCE";
  const heading = (
    <>
      What Sets Us <HighlightedText>Apart</HighlightedText>
    </>
  );
  const description =
    "Unlike other interview preparation websites, we believe in two core values:";

  const values = [
    {
      Icon: Info,
      title: "Intuition",
      description: (
        <>
          <HighlightedText>Don't memorize solutions!</HighlightedText>
          <br/>
          Instead, let us help you understand intuition that can be repeatably
          applied in interview settings.
        </>
      ),
      iconContainerCss: tw`bg-teal-300 text-teal-800`,
    },
    {
      Icon: Zap,
      title: "Efficiency",
      description: (
        <>
          <HighlightedText>Your time matters!</HighlightedText>
          <br/>
          Don't watch 45-minute solution videos. Instead, learn by experience
          with our hints, interactive quizzes, and concise explanations.
        </>
      ),
      iconContainerCss: tw`bg-red-300 text-red-800`,
    },
  ];

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image
            src="/difference.svg"
            alt="CoderIntuition's difference"
            layout="fill"
          />
        </ImageColumn>
        <TextColumn textOnLeft={true}>
          <TextContent>
            <Subheading>{subheading}</Subheading>
            <Heading>{heading}</Heading>
            <Description>{description}</Description>
            <Features>
              {values.map((value, index) => (
                <Feature key={index}>
                  <FeatureHeadingContainer>
                    <FeatureIconContainer
                      iconFilled={true}
                      iconRoundedFull={true}
                      css={value.iconContainerCss}
                    >
                      {<value.Icon/>}
                    </FeatureIconContainer>
                    <FeatureHeading>{value.title}</FeatureHeading>
                  </FeatureHeadingContainer>
                  <FeatureDescription>{value.description}</FeatureDescription>
                </Feature>
              ))}
            </Features>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      <DecoratorBlob1
        src="/svg-decorator-blob-2.svg"
        alt="Decorator blob"
        layout="fill"
      />
    </Container>
  );
};

export default Difference;
