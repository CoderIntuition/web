import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { isMod } from "common/auth-service";
import { constants } from "common/constants";
import { showSuccessToast, withGlobalContext } from "common/utils";
import {
  NavbarMenu,
  StyledDropdown,
  StyledLink,
  StyledLogo,
  StyledMenuItem,
  StyledNavContainer,
  SignUpButton,
  UsernameSpan,
} from "./navbar-styles";
import styles from "./Navbar.module.css";

interface NavbarProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
  loadCurrentUser: () => {};
  logout: () => {};
}

class Navbar extends Component<NavbarProps, {}> {
  handleDropdownClick(value) {
    switch (value) {
      case "admin":
        window.open(constants.ADMIN_WEB_URL, "_blank");
        break;
      case "signOut":
        showSuccessToast("Success", "We hope to see you later!");
        this.props.logout();
        this.props.router.push("/");
        break;
      case "profile":
        this.props.router.push("/user/" + this.props.currentUser.username);
        break;
      case "settings":
        this.props.router.push("/settings");
        break;
    }
  }

  handleLogin() {
    localStorage.setItem(constants.LAST_URL, this.props.router.pathname);
  }

  handleSignUp() {
    localStorage.setItem(constants.LAST_URL, this.props.router.pathname);
    this.props.router.push("/signup");
  }

  onPaths(paths) {
    return this.props.router && paths.test(this.props.router.pathname) ? 1 : 0;
  }

  render() {
    const trigger = this.props.authenticated ? (
      <UsernameSpan>
        <Icon name="user circle" size="big" /> {this.props.currentUser.name}
      </UsernameSpan>
    ) : (
      <span />
    );

    return (
      <div className={styles.navbarWrapper}>
        {this.props.router &&
          !/\/login/.test(this.props.router.pathname) &&
          !/\/signup/.test(this.props.router.pathname) && (
            <NavbarMenu
              secondary
              height={!/^\/problem\//.test(this.props.router.pathname) ? 80 : 60}
              bgcolor={!/^\/problem\//.test(this.props.router.pathname) ? "#f8f8fc" : "#ffffff"}
            >
              <StyledNavContainer>
                <StyledMenuItem position="left">
                  <StyledLogo
                    src="/images/logoname.svg"
                    alt="CoderIntuition logo"
                    width="200px"
                    height="36px"
                    onClick={() => this.props.router.push("/")}
                  />
                </StyledMenuItem>
                <StyledMenuItem>
                  <StyledLink href="/" active={this.onPaths(/(^\/|\/home)$/)}>
                    Home
                  </StyledLink>
                  <StyledLink href="/problems" active={this.onPaths(/^\/(?:problem|learning-path|reading)/)}>
                    Learn
                  </StyledLink>
                  <StyledLink href="/plus" active={this.onPaths(/\/plus/)}>
                    Intuition+
                  </StyledLink>
                  <StyledLink href="/blog" active={this.onPaths(/\/blog/)}>
                    Blog
                  </StyledLink>
                </StyledMenuItem>
                {this.props.authenticated ? (
                  <StyledMenuItem position="right">
                    <StyledDropdown item pointing="top right" trigger={trigger}>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          value="profile"
                          text="Profile"
                          icon="user"
                          onClick={() => this.handleDropdownClick("profile")}
                        />
                        <Dropdown.Item
                          value="settings"
                          text="Settings"
                          icon="settings"
                          onClick={() => this.handleDropdownClick("settings")}
                        />
                        {isMod(this.props.currentUser.roles) && (
                          <Dropdown.Item
                            value="admin"
                            text="Admin Panel"
                            icon="key"
                            onClick={() => this.handleDropdownClick("admin")}
                          />
                        )}
                        <Dropdown.Item
                          value="signOut"
                          text="Sign Out"
                          icon="sign out"
                          onClick={() => this.handleDropdownClick("signOut")}
                        />
                      </Dropdown.Menu>
                    </StyledDropdown>
                  </StyledMenuItem>
                ) : (
                  <StyledMenuItem position="right">
                    <StyledLink onClick={() => this.handleLogin()} href="/login">
                      Log In
                    </StyledLink>
                    <SignUpButton primary onClick={() => this.handleSignUp()}>
                      Sign Up
                    </SignUpButton>
                  </StyledMenuItem>
                )}
              </StyledNavContainer>
            </NavbarMenu>
          )}
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(withGlobalContext(Navbar));
