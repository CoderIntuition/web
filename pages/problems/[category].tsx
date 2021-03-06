import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from 'lodash';
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import Problems from "components/learn/problems";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";

const OverviewPage: FC = () => {
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
        <title>CoderIntuition</title>
        <meta charSet="utf-8" name="description" content="CoderIntuition" />
        <link rel="canonical" href={"https://www.coderintuition.com/reading/" + router.query.urlName} />
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
            <Problems />
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default OverviewPage;
