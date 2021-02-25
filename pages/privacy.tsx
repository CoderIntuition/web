import React, { FC } from "react";
import Head from "next/head";
import Privacy from "../components/landing/privacy/privacy";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const PrivacyPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Privacy Policy</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com/privacy" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <Privacy />
      </PageWrapper>
    </>
  );
};

export default PrivacyPage;
