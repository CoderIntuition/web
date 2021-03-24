import React, { FC } from "react";
import Head from "next/head";
import Success from "../components/landing/plus/success";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const CheckoutSuccessPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Thanks for Subscribing to Intuition+</title>
        <meta charSet="utf-8" name="description" content="Welcome to Intuition+" />
        <link rel="canonical" href="https://www.coderintuition.com/checkout-success" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <Success />
      </PageWrapper>
    </>
  );
};

export default CheckoutSuccessPage;
