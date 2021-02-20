import React, { FC, useEffect } from "react";
import Head from "next/head";
import Contact from "components/landing/contact/contact";

const ContactPage: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Contact />
    </>
  );
};

export default ContactPage;
