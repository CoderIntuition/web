import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { Loader } from "semantic-ui-react";
import PageWrapper from "../../components/common/page-wrapper/page-wrapper";
import Unsubscribe from "../../components/user/unsubscribe";

const UnsubscribePage: FC = () => {
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
                <title>Email Unsubscribe</title>
                <meta charSet="utf-8" name="description" content="Unsubscribe to CoderIntuition emails." />
                <link rel="canonical" href="https://www.coderintuition.com/unsubscribe" />
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
                        <Unsubscribe />
                    </>
                )}
            </PageWrapper>
        </>
    );
};
export default UnsubscribePage;
