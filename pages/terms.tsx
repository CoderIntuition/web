import React, { FC } from "react";
import Head from "next/head";
import Terms from "../components/landing/terms/terms";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const TermsPage: FC = () => {
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
      <PageWrapper>
        <Terms />
      </PageWrapper>
    </>
  );
};

export default TermsPage;
