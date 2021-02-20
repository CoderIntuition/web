import React, {FC} from "react";
import AnimationRevealPage from "components/helpers/AnimationRevealPage";
import Hero from "./hero";
import Difference from "./difference";
import Features from "./features";
import Testimonials from "./testimonials";

const Home: FC = () => {
  return (
    <>
      <AnimationRevealPage>
        <Hero/>
        <Features/>
        <Difference/>
        <Testimonials/>
      </AnimationRevealPage>
      {/*<Footer />*/}
    </>
  )
}

export default Home;
