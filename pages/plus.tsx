import React, { FC } from "react";
import Head from "next/head";
import Plus from "components/landing/plus/plus";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const PlusPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Intuition+</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com/plus" />
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
