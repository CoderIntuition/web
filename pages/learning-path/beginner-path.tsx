import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import BeginnerPath from "components/learn/beginner-path";

const BeginnerPathPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Beginner Path</title>
        <meta
          charSet="utf-8"
          name="description"
          content="CoderIntuition beginner learning path"
        />
        <link rel="canonical" href="https://www.coderintuition.com/learning-path/beginner-path" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <BeginnerPath />
      </PageWrapper>
    </>
  );
};

export default BeginnerPathPage;
