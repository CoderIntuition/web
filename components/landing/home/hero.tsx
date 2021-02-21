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
            <MiddleContainer style={{height: "50vh"}}>
                <InnerContainer style={{marginTop: 200}}>
                    <TwoColumn>
                        <LeftColumn>
                            <Heading>
                                Learn Algorithmic <HighlightedText style={{color: "#FFA630"}}>Intuition</HighlightedText> Interactively
                            </Heading>
                            <Paragraph>
                                Don't just memorize the solutions, learn the actual intuition
                                required to solve the problems step-by-step on our interactive
                                platform.
                            </Paragraph>
                            <Link href="/problems">
                                <PrimaryButton style={{backgroundColor: "#fff", color: "#4d69e9"}}>Get Started</PrimaryButton>
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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,256L60,240C120,224,240,192,360,170.7C480,149,600,139,720,138.7C840,139,960,149,1080,138.7C1200,128,1320,96,1380,80L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
            <DecoratorBlob1
            src="/images/svg-decorator-blob-1.svg"
            alt="Decorator blob"
            />
        </OuterContainer>
    );
};

export default Hero;
