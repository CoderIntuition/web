import React, { FC, useEffect } from "react";
import Head from "next/head";
import Home from "components/landing/home/home";
import Navbar from "../components/common/navbar/Navbar";
import Footer from "../components/common/footer/footer";

const HomePage: FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const head = () => {
    return (
      <Head>
        <title>CoderIntuition</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <Navbar>
        <Home />
        {/*<Footer/>*/}
      </Navbar>
    </>
  );
};

export default HomePage;
