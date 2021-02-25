import React, { FC } from "react";
import Head from "next/head";
import Contact from "components/landing/contact/contact";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";

const ContactPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Contact</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com/contact" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <Contact />
      </PageWrapper>
    </>
  );
};

export default ContactPage;
