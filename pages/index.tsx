import React, { FC } from "react";
import Head from "next/head";
import Home from "components/landing/home/home";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const HomePage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CoderIntuition | Learn Algorithmic Intuition For Coding Interviews</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Stop memorizing solutions! CoderIntuition offers coding interview practice and teaches you repeatable algorithmic intuition via an interactive platform with built-in quizzes so that you can ace your coding interviews."
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
