import React from "react";
import { getCurrentUser } from "common/auth-service";
import { constants } from "common/constants";
import { getName, showSuccessToast } from "./utils";

export const GlobalContext = React.createContext({
  darkMode: 0,
  authenticated: false,
  currentUser: null,
  loadCurrentUser: (_type) => {},
  logout: () => {},
  setDarkMode: (_value) => {},
});

class GlobalContextProvider extends React.Component {
  state = {
    darkMode: 0,
    authenticated: false,
    currentUser: null,
    loading: true,
  };

  setDarkMode = (value: number) => {
    this.setState({
      darkMode: value,
    })
  }

  loadCurrentUser = (type) => {
    this.setState({
      loading: true,
    });

    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          authenticated: true,
          loading: false,
        });
        if (type === "LOGIN") {
          showSuccessToast("Success", "Welcome back, " + getName(response.name) + "!");
        } else if (type === "SIGNUP") {
          showSuccessToast(
            "Success",
            "Welcome to CoderIntuition, " + getName(response.name) + "! Go try some problems 🚀"
          );
        }
      })
      .catch((_err) => {
        localStorage.removeItem(constants.ACCESS_TOKEN);
        this.setState({
          loading: false,
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
    if (this.state.loading) {
      return <></>;
    }
    return (
      <GlobalContext.Provider
        value={{
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

export default GlobalContext;

export { GlobalContextProvider };
