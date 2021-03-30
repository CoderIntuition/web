import React, { FC } from "react";
import dynamic from "next/dynamic";
import Hero from "./hero";

const AnimationRevealPage = dynamic(() => import("components/common/helpers/animation-reveal-page"));
const Difference = dynamic(() => import("./difference"));
const Features = dynamic(() => import("./features"));
const Testimonials = dynamic(() => import("./testimonials"));

const Home: FC = () => {
  return (
    <>
      <Hero />
      <AnimationRevealPage>
        <Features />
        <Difference />
        <Testimonials />
      </AnimationRevealPage>
    </>
  );
};

export default Home;
