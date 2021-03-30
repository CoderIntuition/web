import React from "react";
import Image from "next/image";
import { Info, Zap } from "react-feather";
import { Container, ContentWithPaddingXl, HighlightedText } from "../landing-styles";
import {
  DecoratorBlob,
  Description,
  Emphasis,
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
  const description = "Unlike other interview preparation websites, we value:";

  const values = [
    {
      Icon: Info,
      title: "Intuition",
      description: (
        <>
          <span className={HighlightedText}>Don't memorize solutions!</span>
          <br />
          Instead, let us help you understand the <Emphasis>intuition</Emphasis> and{" "}
          <Emphasis>thought process</Emphasis> that can be repeatedly applied.
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
          Don't sit and watch 45-minute solution videos. Instead, get your hands dirty with our{" "}
          <Emphasis>intuition steps </Emphasis>and <Emphasis>quizzes</Emphasis>.
        </>
      ),
    },
  ];

  return (
    <div className={Container}>
      <div className={ContentWithPaddingXl}>
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
      </div>
      <img className={DecoratorBlob} src="/images/svg-decorator-blob-4.svg" alt="Decorator blob" />
    </div>
  );
};

export default Difference;
