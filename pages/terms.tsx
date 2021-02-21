import React, { FC, useEffect } from "react";
import Head from "next/head";
import Home from "components/landing/home/home";

const TermsPage: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const head = () => {
    return (
      <Head>
        <title>Terms of Service</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com/terms" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <Home />
    </>
  );
};

export default TermsPage;
