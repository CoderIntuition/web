import React from "react";
import { NextRouter, withRouter } from "next/router";
import { getCurrentUser } from "common/auth-service";
import { constants } from "common/constants";
import { getName, showSuccessToast } from "./utils";
import { Loader } from "semantic-ui-react";

export const GlobalContext = React.createContext({
  contextLoading: true,
  darkMode: 0,
  authenticated: false,
  currentUser: null,
  loadCurrentUser: (_type) => {},
  logout: () => {},
  setDarkMode: (_value) => {},
});

interface GlobalContextProviderProps {
  router: NextRouter;
}

interface GlobalContextProviderState {
  contextLoading: boolean;
  darkMode: number;
  authenticated: boolean;
  currentUser: any;
}

class GlobalContextProvider extends React.Component<GlobalContextProviderProps, GlobalContextProviderState> {
  constructor(props) {
    super(props);

    this.state = {
      contextLoading: true,
      darkMode: 0,
      authenticated: false,
      currentUser: null,
    };
  }

  setDarkMode = (value: number) => {
    this.setState({
      darkMode: value,
    });
  };

  loadCurrentUser = (type) => {
    this.setState({
      contextLoading: true,
    });

    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          contextLoading: false,
        });

        switch (type) {
          case "LOGIN":
            showSuccessToast("Success", "Welcome back, " + getName(response.name) + "!");
            break;
          case "SIGNUP":
            showSuccessToast(
              "Success",
              "Welcome to CoderIntuition, " + getName(response.name) + "! Go try some problems 🚀"
            );
            break;
          case "SETTINGS":
            showSuccessToast("Success", "Your settings have been updated.");
            break;
        }
      })
      .catch((_err) => {
        localStorage.removeItem(constants.ACCESS_TOKEN);
        this.setState({
          contextLoading: false,
        });
      });
  };

  logout = () => {
    localStorage.removeItem(constants.ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null,
    });
  };

  componentDidMount() {
    this.loadCurrentUser("");
  }

  render() {
    // wait for data from backend only if we're not on the homepage
    if (this.props.router.pathname !== "/" && this.state.contextLoading) {
      return (
        <Loader active inverted size="large">
          Loading
        </Loader>
      );
    }

    return (
      <GlobalContext.Provider
        value={{
          contextLoading: this.state.contextLoading,
          darkMode: this.state.darkMode,
          authenticated: this.state.authenticated,
          currentUser: this.state.currentUser,
          loadCurrentUser: this.loadCurrentUser,
          logout: this.logout,
          setDarkMode: this.setDarkMode,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default withRouter(GlobalContextProvider);
