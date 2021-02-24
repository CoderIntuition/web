import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StyledDiv } from "components/landing/landing-styles";

function AnimationReveal({ disabled, children }) {
  if (disabled) {
    return <>{children}</>;
  }

  if (!Array.isArray(children)) children = [children];

  const directions = ["left", "right"];
  const childrenWithAnimation = children.map((child, i) => {
    return (
      <AnimatedSlideInComponent key={i} direction={directions[i % directions.length]}>
        {child}
      </AnimatedSlideInComponent>
    );
  });
  return <>{childrenWithAnimation}</>;
}

function AnimatedSlideInComponent({ direction = "left", children }) {
  const [ref, inView] = useInView({ rootMargin: "-100px" });

  const x = { target: "0%" };

  if (direction === "right") {
    x.initial = "10%";
  } else {
    x.initial = "-10%";
  }

  return (
    <motion.section
      initial={{ x: x.initial }}
      animate={{
        x: inView && x.target,
        transitionEnd: {
          x: inView && 0,
        },
      }}
      transition={{ type: "spring", damping: 60 }}
      ref={ref}
    >
      {children}
    </motion.section>
  );
}

const AnimationRevealPage = (props) => (
  <div className="App">
    <div className={StyledDiv}>
      <AnimationReveal {...props} />
    </div>
  </div>
);

export default AnimationRevealPage;
