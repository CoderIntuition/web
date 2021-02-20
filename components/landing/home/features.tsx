import React from "react";
import {BookOpen, Code, EyeOff, Globe, Info, List} from "react-feather";
import {HighlightedText} from "../landing-styles";
import {
  Card,
  Column,
  Container,
  DecoratorBlob1,
  DecoratorBlob2,
  Description,
  FeatureIconContainer,
  Heading,
  Subheading,
  ThreeColumnContainer,
  VerticalSpacer,
} from "./features-styles";

const Features = () => {
  const cards = [
    {
      imageSrc: List,
      title: "100+ Problems",
      description:
        "Our problems teach you intuition that you can repeatably apply to other problems.",
    },
    {
      imageSrc: Info,
      title: "Interactive Intuition",
      description:
        "Our hints, quizzes, and concise explanations build your intuition while you code.",
    },
    {
      imageSrc: EyeOff,
      title: "Hidden Solutions",
      description:
        "We have solutions, but they are hidden until you actually try the problem with our tips.",
    },
    {
      imageSrc: BookOpen,
      title: "Learning Paths",
      description:
        "We have standard learning paths for beginners to follow to build stronger intuition.",
    },
    {
      imageSrc: Globe,
      title: "Multiple Languages",
      description:
        "Although we recommend Python for speed, we support a variety of other languages.",
    },
    {
      imageSrc: Code,
      title: "Code Execution",
      description:
        "Learn with hands-on experience. Run and test your code directly on our website.",
    },
  ];
  const subheading = "FEATURES";
  const heading = <>Designed for Maximum <HighlightedText>Intuition.</HighlightedText></>;
  const description = "This is what we have to offer you.";

  return (
    <Container>
      <ThreeColumnContainer>
        <Subheading>{subheading}</Subheading>
        <Heading>{heading}</Heading>
        <Description>{description}</Description>
        <VerticalSpacer/>
        {cards.map((card, i) => (
          <Column key={i}>
            <Card>
              <span className="imageContainer">
                <FeatureIconContainer>
                  <card.imageSrc/>
                </FeatureIconContainer>
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                <p className="description">{card.description}</p>
              </span>
            </Card>
          </Column>
        ))}
      </ThreeColumnContainer>
      <DecoratorBlob1
        src="/images/svg-decorator-blob-2.svg"
        alt="Decorator blob"
        width="100px"
        height="100px"
      />
      <DecoratorBlob2
        src="/images/svg-decorator-blob-3.svg"
        alt="Decorator blob"
        width="100px"
        height="100px"
      />
    </Container>
  );
};

export default Features;
