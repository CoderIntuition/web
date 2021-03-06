import React, { FC, useEffect, useState } from "react";
import Head from "next/head";
import _ from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import PageWrapper from "../../components/common/page-wrapper/page-wrapper";
import Settings from "../../components/settings/settings";

const SettingsPage: FC = () => {
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
        <title>Settings</title>
        <meta charSet="utf-8" name="description" content="Change information on your CoderIntuition account." />
        <link rel="canonical" href="https://www.coderintuition.com/settings" />
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
            <Settings router={router} />
          </>
        )}
      </PageWrapper>
    </>
  );
};
export default SettingsPage;
