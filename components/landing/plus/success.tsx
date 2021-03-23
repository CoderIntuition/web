import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Loader } from "semantic-ui-react";
import { constants } from "common/constants";
import { getCurrentUserToken } from "common/auth-service";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import { Container, ContentWithPaddingXl } from "../landing-styles";
import { ImageColumn, TextColumn, TextContent, TwoColumn } from "../home/difference-styles";
import { DecoratorBlob1, Heading2 } from "./plus-styles";
import Emoji from "../../common/emoji/emoji";
import Image from "next/image";

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
                    Hey {name}, you made the right choice to invest in yourself.
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
      </AnimationRevealPage>
    </>
  );
};

export default Success;
