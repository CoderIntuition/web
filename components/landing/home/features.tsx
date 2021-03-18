import React from "react";
import { BookOpen, Code, EyeOff, Globe, Info, List } from "react-feather";
import { ContentWithPaddingXl, HighlightedText } from "../landing-styles";
import {
  Card,
  CardDescription,
  CardFeatureIconContainer,
  CardImageContainer,
  CardImageContainerImage,
  CardTextContainer,
  CardTitle,
  Column,
  Container,
  DecoratorBlob,
  Description,
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
      description: "Our problems teach you intuition that you can repeatably apply to other problems.",
    },
    {
      imageSrc: Info,
      title: "Interactive Intuition",
      description: "Our hints, quizzes, and concise explanations build your intuition while you code.",
    },
    {
      imageSrc: EyeOff,
      title: "Hidden Solutions",
      description: "We have solutions, but they're hidden until you actually try the problem with our tips.",
    },
    {
      imageSrc: BookOpen,
      title: "Learning Paths",
      description: "We have standard learning paths for beginners to follow to build stronger intuition.",
    },
    {
      imageSrc: Globe,
      title: "Multiple Languages",
      description: "Although we recommend Python for speed, we support a variety of other languages.",
    },
    {
      imageSrc: Code,
      title: "Code Execution",
      description: "Learn with hands-on experience. Run and test your code directly on our website.",
    },
  ];
  const subheading = "FEATURES";
  const heading = (
    <>
      Designed for Maximum <span className={HighlightedText}>Intuition.</span>
    </>
  );
  const description = "This is what we have to offer you.";

  return (
    <div className={Container}>
      <div className={ContentWithPaddingXl}>
        <div className={ThreeColumnContainer}>
          <h1 className={Subheading}>{subheading}</h1>
          <h2 className={Heading}>{heading}</h2>
          <p className={Description}>{description}</p>
          <div className={VerticalSpacer} />
          {cards.map((card, i) => (
            <div className={Column} key={i}>
              <div className={Card}>
                <span className={CardImageContainer}>
                  <div className={CardFeatureIconContainer}>
                    <card.imageSrc className={CardImageContainerImage} />
                  </div>
                </span>
                <span className={CardTextContainer}>
                  <span className={CardTitle}>{card.title || "Fully Secure"}</span>
                  <p className={CardDescription}>{card.description}</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <img className={DecoratorBlob} src="/images/svg-decorator-blob-3.svg" alt="Decorator blob" />
    </div>
  );
};

export default Features;
