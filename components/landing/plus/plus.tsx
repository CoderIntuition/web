import React, { useState } from "react";
import Link from "next/link";
import "@stripe/stripe-js";
import { withGlobalContext } from "common/utils";
import { constants } from "common/constants";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import Footer from "components/common/footer/footer";
import Checkout from "./checkout";
import Emoji from "components/common/emoji/emoji";
import { isPlus } from "common/auth-service";
import { Container, ContentWithPaddingLg, HighlightedText } from "../landing-styles";
import {
  Heading as Heading2,
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
} from "../home/hero-styles";
import {
  DecoratorBlob1,
  DecoratorBlob2,
  Description,
  HeaderContainer,
  Heading,
  Plan,
  PlanAction,
  PlanDurationSwitcher,
  PlanFeatures,
  PlanHeader,
  PlansContainer,
  StyledButton,
  Subheading,
  SwitchButton,
} from "./plus-styles";

const Plus = (props) => {
  const plans = [
    {
      name: "Free Plan",
      durationPrices: ["$0", "$0"],
      mainFeature: "For Getting Started",
      features: ["15 Sample Problems", "Beginner Learning Path"],
    },
    {
      name: "Intuition+ Plan",
      durationPrices: ["$12", "$84"],
      mainFeature: "For Landing a Tech Job",
      features: [
        "Over 80 Problems",
        "Intuition+ Learning Path",
        "Intuition Steps - Concise Descriptions, Hints, and Quizzes",
        "Interview Preparation Schedule Creator",
      ],
      featured: true,
    },
  ];

  const planDurations = [
    {
      text: "Month",
      switcherText: "Monthly",
    },
    {
      text: "Year",
      switcherText: "Yearly",
    },
  ];

  const [activeDurationIndex, setActiveDurationIndex] = useState(0);

  return (
    <>
      <AnimationRevealPage>
        {props.authenticated && isPlus(props.currentUser.roles) ? (
          <OuterContainer style={{ marginTop: -50 }}>
            <MiddleContainer>
              <InnerContainer>
                <TwoColumn>
                  <LeftColumn>
                    <Heading2>
                      Thanks for subscribing to Intuition+ <Emoji symbol="🎉" />
                    </Heading2>
                    <Paragraph>
                      Hey {props.currentUser.name.split(" ")[0]}, you made the right choice to invest in yourself.
                    </Paragraph>
                    <Paragraph>
                      To get the most out of your subscription, try our exclusive Intuition+ learning path!
                    </Paragraph>
                    <Link href="/problems">
                      <PrimaryButton>Intuition+ Learning Path</PrimaryButton>
                    </Link>
                  </LeftColumn>
                  <RightColumn>
                    <IllustrationContainer>
                      <StyledImage src="/images/success.svg" alt="Success graphic" width="800px" height="800px" />
                    </IllustrationContainer>
                  </RightColumn>
                </TwoColumn>
              </InnerContainer>
            </MiddleContainer>
            <DecoratorBlob1 src="svg-decorator-blob-6.svg" alt="Decorator blob" />
          </OuterContainer>
        ) : (
          <Container>
            <ContentWithPaddingLg>
              <HeaderContainer>
                <Subheading>Pricing</Subheading>
                <Heading>
                  Maximize Your <HighlightedText>Intuition</HighlightedText>
                </Heading>
                <Description>Intuition+ gives you full access to the CoderIntuition platform.</Description>
                <PlanDurationSwitcher>
                  {planDurations.map((planDuration, index) => (
                    <SwitchButton
                      active={activeDurationIndex === index}
                      key={index}
                      onClick={() => setActiveDurationIndex(index)}
                    >
                      {planDuration.switcherText}
                    </SwitchButton>
                  ))}
                </PlanDurationSwitcher>
              </HeaderContainer>
              <PlansContainer>
                {plans.map((plan, index) => (
                  <Plan key={index} featured={plan.featured}>
                    <PlanHeader>
                      <span className="priceAndDuration">
                        <span className="price">{plan.durationPrices[activeDurationIndex]}</span>
                        <span className="slash"> / </span>
                        <span className="duration">{planDurations[activeDurationIndex].text}</span>
                      </span>
                      <span className="name">{plan.name}</span>
                      <span className="mainFeature">{plan.mainFeature}</span>
                    </PlanHeader>
                    <PlanFeatures>
                      {plan.features.map((feature, index) => (
                        <span key={index} className="feature">
                          {feature}
                        </span>
                      ))}
                    </PlanFeatures>
                    <PlanAction>
                      {index == 0 ? (
                        <Link href="/signup">
                          <StyledButton primary disabled={props.authenticated}>
                            Try Now
                          </StyledButton>
                        </Link>
                      ) : (
                        <Checkout
                          priceId={activeDurationIndex === 0 ? constants.MONTHLY_PRICE_ID : constants.YEARLY_PRICE_ID}
                        />
                      )}
                    </PlanAction>
                  </Plan>
                ))}
              </PlansContainer>
            </ContentWithPaddingLg>
            <DecoratorBlob1 src="svg-decorator-blob-6.svg" alt="Decorator blob" />
            <DecoratorBlob2 src="svg-decorator-blob-1.svg" alt="Decorator blob" />
          </Container>
        )}
      </AnimationRevealPage>
      <Footer />
    </>
  );
};

export default withGlobalContext(Plus);
