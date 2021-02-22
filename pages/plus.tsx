import React, { FC, useEffect } from "react";
import Head from "next/head";
import Plus from "components/landing/plus/plus";
import Navbar from "../components/common/navbar/Navbar";

const PlusPage: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <Navbar>
        <Plus />
      </Navbar>
    </>
  );
};

export default PlusPage;
