import React, { FC } from "react";
import Head from "next/head";
import OAuth2RedirectHandler from "../../components/auth/oauth2-redirect-handler";

const RedirectPage: FC = () => {
  const head = () => {
    return (
      <Head>
        <title>Redirecting...</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com/oauth2/redirect" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <OAuth2RedirectHandler />
    </>
  );
};

export default RedirectPage;
