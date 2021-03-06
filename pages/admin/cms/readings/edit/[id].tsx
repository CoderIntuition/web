import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from "lodash";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import ReadingAdd from "components/admin/cms/reading-add";

const ReadingEditPage: FC = () => {
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
        <title>CMS: Edit Reading {router.query.id}</title>
        <meta charSet="utf-8" name="description" content={"CoderIntuition CMS edit reading " + router.query.id + "."} />
        <link rel="canonical" href={"https://www.coderintuition.com/admin/cms/readings/edit/" + router.query.id} />
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
            <ReadingAdd />
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default ReadingEditPage;
