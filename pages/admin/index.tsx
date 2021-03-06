import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import CmsHome from "components/admin/cms/home";

const CmsHomePage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Admin: Control Panel</title>
        <meta
          charSet="utf-8"
          name="description"
          content="CoderIntuition admin panel."
        />
        <link rel="canonical" href="https://www.coderintuition.com/admin" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <CmsHome />
      </PageWrapper>
    </>
  );
};

export default CmsHomePage;
