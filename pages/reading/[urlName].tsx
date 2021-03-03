import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from "lodash";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import Reading from "../../components/reading/reading";

const ReadingPage: FC = () => {
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
        <title>{router.query.urlName}</title>
        <meta charSet="utf-8" name="description" content={"Reading"} />
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
            <Reading />
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default ReadingPage;
