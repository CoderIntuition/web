import React, { FC } from "react";
import Head from "next/head";
import Success from "../components/landing/plus/success";

const CheckoutSuccessPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Thanks for Subscribing to Intuition+</title>
        <meta charSet="utf-8" name="description" content="Thanks for subscribing to Intuition+" />
        <link rel="canonical" href="https://www.coderintuition.com/checkout-success" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <Success />
    </>
  );
};

export default CheckoutSuccessPage;
