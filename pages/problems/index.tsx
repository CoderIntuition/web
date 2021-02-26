import React, { FC } from "react";
import Head from "next/head";
import Overview from "../../components/problems/overview";
import PageWrapper from "../../components/common/page-wrapper/page-wrapper";

const OverviewPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Problems Overview</title>
        <meta charSet="utf-8" name="description" content="Overview of the problems that CoderIntuition has to offer." />
        <link rel="canonical" href="https://www.coderintuition.com/problems" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <Overview />
      </PageWrapper>
    </>
  );
};

export default OverviewPage;
