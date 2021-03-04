import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import Verify from "../../components/user/verify";
import PageWrapper from "../../components/common/page-wrapper/page-wrapper";

const VerifyPage: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      setLoading(false);
    }
  }, [router.query]);

  const head = () => {
    return (
      <Head>
        <title>Verify Your Email</title>
        <meta charSet="utf-8" name="description" content="Verify your email." />
        <link rel="canonical" href="https://www.coderintuition.com/verify" />
      </Head>
    );
  };

  return (
    <>
      <PageWrapper>
        {loading ? (
          <Loader active inverted size="large">
            Loading
          </Loader>
        ) : (
          <>
            {head()}
            <Verify />
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default VerifyPage;
