import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import ReadingList from "components/admin/cms/reading-list";

const CmsProblemListPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CMS: Readings</title>
        <meta charSet="utf-8" name="description" content="CoderIntuition CMS reading list." />
        <link rel="canonical" href="https://www.coderintuition.com/admin/cms/readings" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <ReadingList />
      </PageWrapper>
    </>
  );
};

export default CmsProblemListPage;
