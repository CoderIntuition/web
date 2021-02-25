import React, { FC } from "react";
import Head from "next/head";
import Faq from "components/landing/faq/faq";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const FaqPage: FC = () => {
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
      <PageWrapper>
        <Faq />
      </PageWrapper>
    </>
  );
};

export default FaqPage;
