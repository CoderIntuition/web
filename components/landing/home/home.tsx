import React, { FC, useEffect, useState } from "react";
import AnimationRevealPage from "components/common/helpers/animation-reveal-page";
import Hero from "./hero";
import Difference from "./difference";
import Features from "./features";
import Testimonials from "./testimonials";
import { Loader } from "semantic-ui-react";

const Home: FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader active inverted size="large">
      Loading
    </Loader>
  }

  return (
    <>
      <Hero />
      <AnimationRevealPage>
        <Features />
        <Difference/>
        <Testimonials/>
      </AnimationRevealPage>
    </>
  );
};

export default Home;
