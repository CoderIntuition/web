import React, { FC, useEffect } from "react";
import Head from "next/head";
import Terms from "../components/landing/terms/terms";
import Navbar from "../components/common/home-navbar/HomeNavbar";

const TermsPage: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Navbar>
        <Terms />
      </Navbar>
    </>
  );
};

export default TermsPage;
