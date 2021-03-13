import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from "lodash";
import PageWrapper from "components/common/page-wrapper/page-wrapper";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import Problem from "components/problem/problem";
import { withGlobalContext } from "../../common/utils";

interface ProblemPageProps {
  darkMode: number;
  setDarkMode: (value: number) => void;
}

const ProblemPage: FC<ProblemPageProps> = (props) => {
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
        <link rel="canonical" href={"https://www.coderintuition.com/problem/" + router.query.urlName} />
      </Head>
    );
  };

  return (
    <>
      <PageWrapper hideFooter darkMode={props.darkMode}>
        {loading ? (
          <Loader active inverted size="large">
            Loading
          </Loader>
        ) : (
          <>
            {head()}
            <Problem setDarkMode={props.setDarkMode}/>
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default withGlobalContext(ProblemPage);
