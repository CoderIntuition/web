import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import ReadingAdd from "components/admin/cms/reading-add";

const ReadingAddPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CMS: Add Reading</title>
        <meta charSet="utf-8" name="description" content="CoderIntuition CMS add reading." />
        <link rel="canonical" href="https://www.coderintuition.com/admin/cms/readings/add" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <ReadingAdd />
      </PageWrapper>
    </>
  );
};

export default ReadingAddPage;
