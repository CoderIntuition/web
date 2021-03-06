import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import ProblemAdd from "../../../../components/admin/cms/problem-add";

const ProblemAddPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>CMS: Add Problem</title>
        <meta charSet="utf-8" name="description" content="CoderIntuition CMS add problem." />
        <link rel="canonical" href="https://www.coderintuition.com/admin/cms/problems/add" />
      </Head>
    );
  };

  return (
    <>
      <PageWrapper>
        {head()}
        <ProblemAdd />
      </PageWrapper>
    </>
  );
};

export default ProblemAddPage;
