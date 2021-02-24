import React, { Component, FC } from "react";
import { NextRouter, useRouter, withRouter } from "next/router";
import Image from "next/image";
import { Dropdown, Icon } from "semantic-ui-react";
import { isMod } from "../../../common/auth-service";
import { showSuccessToast, withGlobalContext } from "common/utils";
import { constants } from "common/constants";
import styles from "./HomeNavbar.module.css";
import {
  DefaultNavbarMenu,
  HomeNavbarMenu,
  MobileDropDown,
  MobileDropDownMenu,
  NavContainer,
  SignUpButton,
  StyledDropdown,
  StyledLink,
  StyledMenuItem,
  StyledMobileLink,
} from "./home-navbar-styles";

interface HomeNavbarProps {
  router: NextRouter;
  authenticated: boolean;
  currentUser: any;
  loadCurrentUser: () => {};
  logout: () => {};
}

const NavbarMenu: FC = (props) => {
  const router = useRouter();

  if (router.pathname === "/") {
    return <HomeNavbarMenu secondary>{props.children}</HomeNavbarMenu>;
  }

  return (
    <DefaultNavbarMenu
      secondary
      height={/^\/problem\//.test(router.pathname) ? 60 : 80}
      bgcolor={/^\/problem\//.test(router.pathname) ? "#ffffff" : "#f8f8fc"}
    >
      {props.children}
    </DefaultNavbarMenu>
  );
};

class HomeNavbar extends Component<HomeNavbarProps, {}> {
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
      <>
        <Icon name="user circle" size="big" />
        <span className={styles.userName}>{this.props.currentUser.name}</span>
      </>
    ) : (
      <span />
    );

    const desktopNavbar = (
      <>
        <StyledMenuItem position="left">
          <Image
            src="/images/logoname-white.svg"
            alt="CoderIntuition logo"
            width="200px"
            height="36px"
            onClick={() => this.props.router.push("/")}
          />
        </StyledMenuItem>
        <StyledMenuItem>
          <StyledLink href="/" active={1}>
            Home
          </StyledLink>
          <StyledLink href="/problems" active={0}>
            Learn
          </StyledLink>
          <StyledLink href="/plus" active={0}>
            Intuition+
          </StyledLink>
          <StyledLink href="/blog" active={0}>
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
      </>
    );

    const mobileNavbar = (
      <>
        <StyledMenuItem position="left">
          <Image
            src="/images/logoname-white.svg"
            alt="CoderIntuition logo"
            width="200px"
            height="36px"
            onClick={() => this.props.router.push("/")}
          />
        </StyledMenuItem>
        <StyledMenuItem position="right">
          <MobileDropDown item icon="bars" pointing="top right">
            <MobileDropDownMenu>
              <Dropdown.Item>
                <StyledMobileLink href="/" active={1}>
                  Home
                </StyledMobileLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <StyledMobileLink href="/problems" active={0}>
                  Learn
                </StyledMobileLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <StyledMobileLink href="/plus" active={0}>
                  Intuition+
                </StyledMobileLink>
              </Dropdown.Item>
              <Dropdown.Item>
                <StyledMobileLink href="/blog" active={0}>
                  Blog
                </StyledMobileLink>
              </Dropdown.Item>
              <Dropdown.Divider />
              {this.props.authenticated ? (
                <>
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
                </>
              ) : (
                <>
                  <Dropdown.Item>Log In</Dropdown.Item>
                  <Dropdown.Item>Sign Up</Dropdown.Item>
                </>
              )}
            </MobileDropDownMenu>
          </MobileDropDown>
        </StyledMenuItem>
      </>
    );

    return (
      <div className={styles.navbarWrapper}>
        {this.props.router &&
          !/\/login/.test(this.props.router.pathname) &&
          !/\/signup/.test(this.props.router.pathname) && (
            <>
              <NavbarMenu>
                <NavContainer>
                  <div className="xs:hidden lg:contents">{desktopNavbar}</div>
                  <div className="contents lg:hidden">{mobileNavbar}</div>
                </NavContainer>
              </NavbarMenu>
            </>
          )}
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(withGlobalContext(HomeNavbar));
