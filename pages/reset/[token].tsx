import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import ResetPassword from "../../components/user/reset-password";
import PageWrapper from "../../components/common/page-wrapper/page-wrapper";

const ResetPage: FC = () => {
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
        <title>Reset Your Password</title>
        <meta charSet="utf-8" name="description" content="Reset your password." />
        <link rel="canonical" href="https://www.coderintuition.com/reset" />
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
            <ResetPassword />
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default ResetPage;
