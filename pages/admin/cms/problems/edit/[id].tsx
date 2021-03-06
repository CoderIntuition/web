import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from "lodash";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import ProblemAdd from "components/admin/cms/problem-add";

const ProblemEditPage: FC = () => {
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
        <title>CMS: Edit Problem {router.query.id}</title>
        <meta charSet="utf-8" name="description" content={"CoderIntuition CMS edit problem " + router.query.id + "."} />
        <link rel="canonical" href={"https://www.coderintuition.com/admin/cms/problems/edit/" + router.query.id} />
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
            <ProblemAdd />
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default ProblemEditPage;
