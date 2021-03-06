import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import CmsProblemList from "components/admin/cms/problem-list";

const CmsProblemListPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CMS: Problems</title>
        <meta charSet="utf-8" name="description" content="CoderIntuition CMS problem list." />
        <link rel="canonical" href="https://www.coderintuition.com/admin/cms/problems" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <CmsProblemList />
      </PageWrapper>
    </>
  );
};

export default CmsProblemListPage;
