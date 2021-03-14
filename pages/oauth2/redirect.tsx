import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import _ from "lodash";
import OAuth2RedirectHandler from "components/auth/oauth2-redirect-handler";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import { Loader } from "semantic-ui-react";

const RedirectPage: FC = () => {
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
      <PageWrapper>
        {loading ? (
          <Loader active inverted size="large">
            Redirecting...
          </Loader>
        ) : (
          <>
            {head()}
            <OAuth2RedirectHandler />
          </>
        )}
      </PageWrapper>
    </>
  );
};

export default RedirectPage;
