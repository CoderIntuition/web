import React, { FC } from "react";
import Head from "next/head";
import Home from "components/landing/home/home";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const HomePage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CoderIntuition</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <Home />
      </PageWrapper>
    </>
  );
};

export default HomePage;
