import React from "react";
import Image from "next/image";
import { Info, Zap } from "react-feather";
import { Container, HighlightedText } from "../landing-styles";
import {
  DecoratorBlob,
  Description,
  Feature,
  FeatureDescription,
  FeatureHeading,
  FeatureHeadingContainer,
  FeatureIcon,
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
      What Sets Us <span className={HighlightedText}>Apart</span>
    </>
  );
  const description = "Unlike other interview preparation websites, we believe in two core values:";

  const values = [
    {
      Icon: Info,
      title: "Intuition",
      description: (
        <>
          <span className={HighlightedText}>Don't memorize solutions!</span>
          <br />
          Instead, let us help you understand intuition that can be repeatably applied in interview settings.
        </>
      ),
    },
    {
      Icon: Zap,
      title: "Efficiency",
      description: (
        <>
          <span className={HighlightedText}>Your time matters!</span>
          <br />
          Don't watch 45-minute solution videos. Instead, learn by experience with our hints, interactive quizzes, and
          concise explanations.
        </>
      ),
    },
  ];

  return (
    <div className={Container}>
      <div className={TwoColumn}>
        <div className={ImageColumn}>
          <Image src="/images/difference.svg" alt="CoderIntuition's difference" width="800px" height="800px" />
        </div>
        <div className={TextColumn}>
          <div className={TextContent}>
            <h1 className={Subheading}>{subheading}</h1>
            <h2 className={Heading}>{heading}</h2>
            <p className={Description}>{description}</p>
            <div className={Features}>
              {values.map((value, index) => (
                <div className={Feature} key={index}>
                  <div className={FeatureHeadingContainer}>
                    <div className={FeatureIconContainer}>{<value.Icon className={FeatureIcon} />}</div>
                    <span className={FeatureHeading}>{value.title}</span>
                  </div>
                  <span className={FeatureDescription}>{value.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <img className={DecoratorBlob} src="/images/svg-decorator-blob-4.svg" alt="Decorator blob" />
    </div>
  );
};

export default Difference;
