import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";
import Login from "../components/auth/login";

const PlusPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Log In</title>
        <meta charSet="utf-8" name="description" content="Log in to your CoderIntuition account." />
        <link rel="canonical" href="https://www.coderintuition.com/login" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <Login />
    </>
  );
};

export default PlusPage;
