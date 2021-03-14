import React, { FC } from "react";
import Head from "next/head";
import Home from "components/landing/home/home";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const HomePage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CoderIntuition | Learn Algorithmic Intuition</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't keep memorizing solutions! CoderIntuition teaches you repeatable algorithmic intuition so that you can ace your coding interviews."
        />
        <link rel="canonical" href="https://www.coderintuition.com" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper homeNavbar>
        <Home />
      </PageWrapper>
    </>
  );
};

export default HomePage;
