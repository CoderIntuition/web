import React, { FC } from "react";
import Head from "next/head";
import Signup from "../components/auth/signup";

const PlusPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Sign Up</title>
        <meta charSet="utf-8" name="description" content="Sign up for a CoderIntuition account." />
        <link rel="canonical" href="https://www.coderintuition.com/signup" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <Signup />
    </>
  );
};

export default PlusPage;
