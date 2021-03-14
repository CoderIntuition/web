import React from "react";
import { NextRouter, withRouter } from "next/router";
import { constants } from "common/constants";
import { withGlobalContext } from "common/utils";
import { Loader } from "semantic-ui-react";

interface Oauth2RedirectHandlerProps {
  router: NextRouter;
  loadCurrentUser: (type: string) => void;
}

class OAuth2RedirectHandler extends React.Component<Oauth2RedirectHandlerProps, {}> {
  componentDidMount() {
    const { router } = this.props;
    console.log(router);

    const token: string = router.query.token as string;
    const error: string = router.query.error as string;
    if (token) {
      localStorage.setItem(constants.ACCESS_TOKEN, token);
      this.props.loadCurrentUser("LOGIN");
      const lastUrl = localStorage.getItem(constants.LAST_URL);
      router.push(lastUrl ? lastUrl : "/");
    } else {
      router.push("/login", {
        query: {
          error: error,
        },
      });
    }
  }

  render() {
    return (
      <Loader active inverted size="large">
        Taking you back to CoderIntuition...
      </Loader>
    );
  }
}

export default withRouter(withGlobalContext(OAuth2RedirectHandler));
