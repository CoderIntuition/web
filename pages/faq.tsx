import React, { FC, useEffect } from "react";
import Head from "next/head";
import Faq from "components/landing/faq/faq";

const FaqPage: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const head = () => {
    return (
      <Head>
        <title>FAQ</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com/faq" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <Faq />
    </>
  );
};

export default FaqPage;
