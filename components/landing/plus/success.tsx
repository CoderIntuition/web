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
  DecoratorBlob,
  Heading,
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
        <div style={{ marginTop: -50 }}>
          <div className={MiddleContainer}>
            <div className={InnerContainer}>
              <div className={TwoColumn}>
                <div className={LeftColumn}>
                  <h1 className={Heading}>
                    Thanks for subscribing to Intuition+ <Emoji symbol="🎉" />
                  </h1>
                  <p className={Paragraph}>Hey {name}, you made the right choice to invest in yourself.</p>
                  <p className={Paragraph}>
                    You're now one step closer to acing those coding interviews and landing your dream job!
                  </p>
                  <p className={Paragraph}>Make sure to start your exclusive Intuition+ learning path experience!</p>
                  <Link href="/problems">
                    <button className={PrimaryButton}>Intuition+ Learning Path</button>
                  </Link>
                </div>
                <div className={RightColumn}>
                  <div className={IllustrationContainer}>
                    <img
                      className={StyledImage}
                      src="/images/success.svg"
                      alt="Success graphic"
                      width="800px"
                      height="800px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <img className={DecoratorBlob} src="/images/svg-decorator-blob-1.svg" alt="Decorator blob" />
        </div>
      </AnimationRevealPage>
    </>
  );
};

export default Success;
