import React from "react";
import Link from "next/link";
import { HighlightedText } from "../landing-styles";
import Image from "next/image";
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
      <div className={MiddleContainer} style={{ height: "60vh" }}>
        <div className={InnerContainer} style={{ marginTop: 200 }}>
          <div className={TwoColumn}>
            <div className={LeftColumn}>
              <h1 className={Heading}>
                Learn Algorithmic <HighlightedText style={{ color: "#FFA630" }}>Intuition</HighlightedText>{" "}
                Interactively
              </h1>
              <p className={Paragraph}>
                Don't just keep memorizing solutions! Learn the actual intuition required to solve interview
                problems.
              </p>
              <Link href="/problems">
                <button className={PrimaryButton} style={{ backgroundColor: "#fff", color: "#4d69e9" }}>
                  Get Started
                </button>
              </Link>
            </div>
            <div className={RightColumn}>
              <div className={IllustrationContainer}>
                <Image
                  className={StyledImage}
                  src="/images/landing.svg"
                  alt="Landing page illustration"
                  width="800px"
                  height="800px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fff"
          fillOpacity="1"
          d="M0,256L60,240C120,224,240,192,360,170.7C480,149,600,139,720,138.7C840,139,960,149,1080,138.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        ></path>
      </svg>
      <img className={DecoratorBlob1} src="/images/svg-decorator-blob-1.svg" alt="Decorator blob" />
    </OuterContainer>
  );
};

export default Hero;
