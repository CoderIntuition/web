import React from "react";
import Link from "next/link";
import {
  DecoratorBlob,
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
import { motion } from "framer-motion";
import { Image } from "semantic-ui-react";

const Hero = () => {
  return (
    <OuterContainer>
      <div className={MiddleContainer}>
        <div className={InnerContainer} style={{ marginTop: 250 }}>
          <motion.section
            initial={{ x: "8%" }}
            animate={{
              x: "0%",
              transitionEnd: {
                x: 0,
              },
            }}
            transition={{ type: "spring", damping: 30 }}
          >
            <div className={TwoColumn}>
              <div className={LeftColumn}>
                <h1 className={Heading}>
                  Learn Algorithmic <span style={{ color: "#fbc30d" }}>Intuition</span>
                </h1>
                <p className={Paragraph} style={{ fontWeight: 300 }}>
                  <b>Stop memorizing solutions! </b>
                  <p style={{marginTop: 10}}>
                    CoderIntuition teaches you <span style={{ color: "#fbc30d" }}>repeatable</span> algorithmic
                    intuition so that you can <span style={{ color: "#fbc30d" }}>ace</span> your coding interviews.
                  </p>
                </p>
                <Link href="/problems">
                  <button className={PrimaryButton} style={{ backgroundColor: "#ffffffd0", color: "#4d69e9" }}>
                    Get Started
                  </button>
                </Link>
              </div>
              <div className={RightColumn}>
                <div className={IllustrationContainer}>
                  <Image className={StyledImage} src="/images/landing.svg" alt="Landing page illustration" />
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#fcfcfe"
          fillOpacity="1"
          d="M0,256L60,240C120,224,240,192,360,170.7C480,149,600,139,720,138.7C840,139,960,149,1080,138.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>
      <img className={DecoratorBlob} src="/images/svg-decorator-blob-1.svg" alt="Decorator blob" />
    </OuterContainer>
  );
};

export default Hero;
