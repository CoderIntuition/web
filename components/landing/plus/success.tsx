import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { Loader } from "semantic-ui-react";
import { constants } from "common/constants";
import { getCurrentUserToken } from "common/auth-service";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import Emoji from "components/common/emoji/emoji";
import Footer from "components/common/footer/footer";
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
} from "../home/hero-styles";

const Success: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");

  useEffect(() => {
    const sessionId = router.query.session_id;
    console.log(sessionId);

    if (!sessionId) {
      router.push("/plus");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${getCurrentUserToken()}`,
      },
    };

    axios
      .get(constants.CHECKOUT_SESSION_URL + "/" + sessionId, config)
      .then((res) => {
        setName(res.data.name);
        setLoading(false);
      })
      .catch((_err) => {
        router.push("/plus");
      });
  }, []);

  if (loading) {
    return (
      <Loader active inverted size="large">
        Loading
      </Loader>
    );
  }

  return (
    <>
      <AnimationRevealPage>
        <OuterContainer style={{ marginTop: -50 }}>
          <MiddleContainer>
            <InnerContainer>
              <TwoColumn>
                <LeftColumn>
                  <Heading>
                    Thanks for subscribing to Intuition+ <Emoji symbol="🎉" />
                  </Heading>
                  <Paragraph>Hey {name}, you made the right choice to invest in yourself.</Paragraph>
                  <Paragraph>
                    You're now one step closer to acing those coding interviews and landing your dream job!
                  </Paragraph>
                  <Paragraph>Make sure to start your exclusive Intuition+ learning path experience!</Paragraph>
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
          <DecoratorBlob1 src="/images/svg-decorator-blob-1.svg" alt="Decorator blob" />
        </OuterContainer>
      </AnimationRevealPage>
      <Footer />
    </>
  );
};

export default Success;
