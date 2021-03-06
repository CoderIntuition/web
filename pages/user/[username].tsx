import React, { FC, useEffect, useState } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import PageWrapper from "../../components/common/page-wrapper/page-wrapper";
import { User } from "../../components/user/user";

const UserPage: FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!_.isEmpty(router.query)) {
      setLoading(false);
    }
  }, [router.query]);

  return (
    <>
      <PageWrapper>
        {loading ? (
          <Loader active inverted size="large">
            Loading
          </Loader>
        ) : (
          <User router={router} />
        )}
      </PageWrapper>
    </>
  );
};
export default UserPage;
