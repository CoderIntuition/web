import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import PlusPath from "components/learn/plus-path";

const BeginnerPathPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Intuition+ Path</title>
        <meta
          charSet="utf-8"
          name="description"
          content="CoderIntuition Intuition+ learning path"
        />
        <link rel="canonical" href="https://www.coderintuition.com/learning-path/plus-path" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <PlusPath />
      </PageWrapper>
    </>
  );
};

export default BeginnerPathPage;
