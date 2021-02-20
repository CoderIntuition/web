import React, {FC, useEffect, useState} from "react";
import Head from "next/head";
import Home from "components/landing/home";

const HomePage: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }

  const head = () => {
    return (
      <Head>
        <title>CoderIntuition</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com"/>
      </Head>
    );
  }

  return (
    <>
      {head()}
      <Home/>
    </>
  )
}

export default HomePage;
