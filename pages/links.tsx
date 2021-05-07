import React, { FC } from "react";
import Head from "next/head";
import Links from "components/landing/links/links";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const FaqPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CoderIntuition Links</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Links to CoderIntuition resources"
        />
        <link rel="canonical" href="https://www.coderintuition.com/faq" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <Links />
      </PageWrapper>
    </>
  );
};

export default FaqPage;
