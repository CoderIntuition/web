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
  PlanDuration,
  PlanDurationSwitcher,
  PlanFeatures,
  PlanFeaturesSpan,
  PlanFreeName,
  PlanHeader,
  PlanMainFeature,
  PlanPlusName,
  PlanPrice,
  PlansContainer,
  PlanSlash,
  StyledButton,
  Subheading,
  SwitchButton,
  SwitchButtonActive,
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
          <div className={Container}>
            <div className={MiddleContainer}>
              <div className={InnerContainer}>
                <div className={TwoColumn}>
                  <div className={LeftColumn}>
                    <span className={Heading2}>
                      Thanks for subscribing to Intuition+ <Emoji symbol="🎉" />
                    </span>
                    <span className={Paragraph}>
                      Hey {props.currentUser.name.split(" ")[0]}, you made the right choice to invest in yourself.
                    </span>
                    <span className={Paragraph}>
                      To get the most out of your subscription, try our exclusive Intuition+ learning path!
                    </span>
                    <Link href="/problems">
                      <button className={PrimaryButton}>Intuition+ Learning Path</button>
                    </Link>
                  </div>
                  <div className={RightColumn}>
                    <div className={IllustrationContainer}>
                      <img className={StyledImage} src="/images/success.svg" alt="Success graphic" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img className={DecoratorBlob1} src="/images/svg-decorator-blob-6.svg" alt="Decorator blob" />
          </div>
        ) : (
          <div className={Container}>
            <div className={ContentWithPaddingLg}>
              <div className={HeaderContainer}>
                <h1 className={Subheading}>Pricing</h1>
                <h2 className={Heading}>
                  Maximize Your <span className={HighlightedText}>Intuition</span>
                </h2>
                <p className={Description}>Intuition+ gives you full access to the CoderIntuition platform.</p>
                <div className={PlanDurationSwitcher}>
                  {planDurations.map((planDuration, index) => (
                    <>
                      {activeDurationIndex == index ? (
                        <button
                          className={SwitchButtonActive}
                          key={index}
                          onClick={() => setActiveDurationIndex(index)}
                        >
                          {planDuration.switcherText}
                        </button>
                      ) : (
                        <button className={SwitchButton} key={index} onClick={() => setActiveDurationIndex(index)}>
                          {planDuration.switcherText}
                        </button>
                      )}
                    </>
                  ))}
                </div>
              </div>
              <div className={PlansContainer}>
                {plans.map((plan, index) => (
                  <div className={Plan} key={index}>
                    <div className={PlanHeader}>
                      <div>
                        <span className={PlanPrice}>{plan.durationPrices[activeDurationIndex]}</span>
                        <span className={PlanSlash}> / </span>
                        <span className={PlanDuration}>{planDurations[activeDurationIndex].text}</span>
                      </div>
                      <span className={index === 0 ? PlanFreeName : PlanPlusName}>{plan.name}</span>
                      <span className={PlanMainFeature}>{plan.mainFeature}</span>
                    </div>
                    <div className={PlanFeatures}>
                      {plan.features.map((feature, index) => (
                        <span key={index} className={PlanFeaturesSpan}>
                          {feature}
                        </span>
                      ))}
                    </div>
                    <div className={PlanAction}>
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <img className={DecoratorBlob1} src="/images/svg-decorator-blob-1.svg" alt="Decorator blob" />
            <img className={DecoratorBlob2} src="/images/svg-decorator-blob-6.svg" alt="Decorator blob" />
          </div>
        )}
      </AnimationRevealPage>
    </>
  );
};

export default withGlobalContext(Plus);
