import React, { FC } from "react";
import Head from "next/head";
import Plus from "components/landing/plus/plus";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const PlusPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Sign Up</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Sign up for a CoderIntuition account."
        />
        <link rel="canonical" href="https://www.coderintuition.com/signup" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <Plus />
      </PageWrapper>
    </>
  );
};

export default PlusPage;
