import React, { FC } from "react";
import Head from "next/head";
import PageWrapper from "../components/common/page-wrapper/page-wrapper";
import { Button, Header, Image } from "semantic-ui-react";
import { RedButton } from "../common/global-styles";
import { NextRouter, withRouter } from "next/router";

interface NotFoundPageProps {
  router: NextRouter;
}

const NotFoundPage: FC<NotFoundPageProps> = (props) => {
  const head = () => {
    return (
      <Head>
        <title>Page Not Found</title>
        <meta
          charSet="utf-8"
          name="description"
          content="Don't just memorize solutions, learn the actual intuition required to solve interview problems."
        />
        <link rel="canonical" href="https://www.coderintuition.com" />
      </Head>
    );
  };

  return (
    <>
      {head()}
      <PageWrapper>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 70,
          }}
        >
          <Image src="/images/notfound.png" alt="404 not found graphic" size="large" />
          <Header as="h1" style={{ fontSize: "36px", fontWeight: 500 }}>
            Oops! Page Not Found
          </Header>
          <div style={{ marginBlock: 30 }}>
            <RedButton style={{ display: "inline-block" }} onClick={() => props.router.back()}>
              Back
            </RedButton>
            <Button
              primary
              style={{ display: "inline-block", marginLeft: 5 }}
              onClick={() => props.router.push("/contact")}
            >
              Report a Problem
            </Button>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default withRouter(NotFoundPage);
