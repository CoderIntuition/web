import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "semantic-ui-react";
import "@stripe/stripe-js";
import { withGlobalContext } from "common/utils";
import { constants } from "common/constants";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import Checkout from "./checkout";
import Emoji from "components/common/emoji/emoji";
import { isPlus } from "common/auth-service";
import { Container, ContentWithPaddingLg, ContentWithPaddingXl, HighlightedText } from "../landing-styles";
import {
  DecoratorBlob1,
  DecoratorBlob2,
  Description,
  HeaderContainer,
  Heading,
  Heading2,
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
import { ImageColumn, TextColumn, TextContent, TwoColumn } from "../home/difference-styles";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <>
      <AnimationRevealPage>
        {props.authenticated && isPlus(props.currentUser.roles) ? (
          <div className={Container}>
            <div className={ContentWithPaddingXl} style={{ marginTop: -50 }}>
              <div className={TwoColumn}>
                <div className={TextColumn}>
                  <div className={TextContent}>
                    <br />
                    <h2 className={Heading2} style={{ fontSize: 40 }}>
                      Welcome to Intuition+ <Emoji symbol="🎉" />
                    </h2>
                    <div style={{ fontSize: 20, lineHeight: 1.2, marginTop: 50 }}>
                      Hey {props.currentUser.name.split(" ")[0]}, you made the right choice to invest in yourself.
                    </div>
                    <div style={{ fontSize: 20, lineHeight: 1.2, marginTop: 20 }}>
                      To get the most out of your subscription, try our exclusive Intuition+ Learning Path!
                    </div>
                    <Button
                      primary
                      style={{ padding: 15, borderRadius: 12, marginTop: 50 }}
                      onClick={() => router.push("/learning-path/plus-path")}
                    >
                      Intuition+ Learning Path
                    </Button>
                  </div>
                </div>
                <div className={ImageColumn}>
                  <Image src="/images/success.svg" alt="Success graphic" width="800px" height="800px" />
                </div>
              </div>
            </div>
            <img className={DecoratorBlob1} src="/images/svg-decorator-blob-6.svg" alt="Decorator blob" />
          </div>
        ) : (
          <div className={Container}>
            <div className={ContentWithPaddingLg}>
              <div className={HeaderContainer}>
                <h1 className={Subheading}>Intuition+</h1>
                <h2 className={Heading}>
                  Maximize Your <span className={HighlightedText}>Intuition</span>
                </h2>
                <p className={Description}>Intuition+ gives you full access to the CoderIntuition platform.</p>
                <div className={PlanDurationSwitcher}>
                  {planDurations.map((planDuration, index) => {
                    if (activeDurationIndex == index) {
                      return (
                        <button
                          className={SwitchButtonActive}
                          key={index}
                          onClick={() => setActiveDurationIndex(index)}
                        >
                          {planDuration.switcherText}
                        </button>
                      );
                    }
                    return (
                      <button className={SwitchButton} key={index} onClick={() => setActiveDurationIndex(index)}>
                        {planDuration.switcherText}
                      </button>
                    );
                  })}
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
                        <PlanFeaturesSpan key={index}>{feature}</PlanFeaturesSpan>
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
