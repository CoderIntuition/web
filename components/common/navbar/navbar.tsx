import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Dropdown } from "semantic-ui-react";
import { User } from "react-feather";
import { isMod } from "common/auth-service";
import { showSuccessToast, withGlobalContext } from "common/utils";
import { constants } from "common/constants";
import {
  Banner,
  LogoLink,
  MobileDropDown,
  MobileDropDownMenu,
  NavbarMenu,
  NavContainer,
  SignUpButton,
  StyledDropdown,
  StyledLink,
  StyledMenuItem,
  StyledMobileLink,
  UserName,
} from "./navbar-styles";

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
        showSuccessToast("Logged Out", "We hope to see you soon!");
        this.props.logout();
        this.props.router.push("/");
        break;
      case "profile":
        this.props.router.push("/user/" + this.props.currentUser.username);
        break;
      case "settings":
        this.props.router.push("/settings/general");
        break;
    }
  }

  handleLogin() {
    localStorage.setItem(constants.LAST_URL, this.props.router.asPath);
  }

  handleSignUp() {
    localStorage.setItem(constants.LAST_URL, this.props.router.asPath);
    this.props.router.push("/signup");
  }

  onPaths(paths) {
    return this.props.router && paths.test(this.props.router.asPath) ? 1 : 0;
  }

  render() {
    const { router, authenticated, currentUser } = this.props;

    const trigger = authenticated ? (
      <>
        <User color="#243e63" />
        <UserName>{currentUser.name}</UserName>
      </>
    ) : (
      <span />
    );

    const desktopNavbar = (
      <>
        <StyledMenuItem position="left">
          <Link href="/" passHref>
            <LogoLink>
              <Image src="/images/logoname.svg" alt="CoderIntuition logo" width="200px" height="36px" />
            </LogoLink>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link href="/" passHref>
            <StyledLink active={this.onPaths(/(^\/|\/home)$/)}>Home</StyledLink>
          </Link>
          <Link href="/problems" passHref>
            <StyledLink active={this.onPaths(/^\/(?:problem|learning-path|reading)/)}>Learn</StyledLink>
          </Link>
          <Link href="/plus" passHref>
            <StyledLink active={this.onPaths(/\/plus$/)}>Intuition+</StyledLink>
          </Link>
          <Link href="/blog" passHref>
            <StyledLink active={this.onPaths(/\/blog/)}>Blog</StyledLink>
          </Link>
        </StyledMenuItem>
        {authenticated ? (
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
                {isMod(currentUser.roles) && (
                  <Dropdown.Item
                    value="admin"
                    text="Admin"
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
            <Link href="/login" passHref>
              <StyledLink onClick={() => this.handleLogin()}>Log In</StyledLink>
            </Link>
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
          <Link href="/" passHref>
            <a>
              <Image src="/images/logoname.svg" alt="CoderIntuition logo" width="200px" height="36px" />
            </a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem position="right">
          <MobileDropDown item icon="bars" pointing="top right">
            <MobileDropDownMenu>
              <Dropdown.Item>
                <Link href="/" passHref>
                  <StyledMobileLink active={1}>Home</StyledMobileLink>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/problems" passHref>
                  <StyledMobileLink active={0}>Learn</StyledMobileLink>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/plus" passHref>
                  <StyledMobileLink active={0}>Intuition+</StyledMobileLink>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link href="/blog" passHref>
                  <StyledMobileLink active={0}>Blog</StyledMobileLink>
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              {authenticated ? (
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
                  {isMod(currentUser.roles) && (
                    <Dropdown.Item
                      value="admin"
                      text="Admin"
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
      <>
        {!/\/login/.test(router.asPath) && !/\/signup/.test(router.asPath) && (
          <>
            <NavbarMenu
              secondary
              height={/^\/problem\//.test(router.asPath) ? 60 : 80}
              bgcolor={/^\/problem\//.test(router.asPath) ? "#ffffff" : "#ffffff"}
              mgbottom={/^\/problem\//.test(router.asPath) ? 0 : 5}
            >
              <NavContainer>
                <div className="hidden lg:contents">{desktopNavbar}</div>
                <div className="contents lg:hidden">{mobileNavbar}</div>
              </NavContainer>
            </NavbarMenu>
          </>
        )}
      </>
    );
  }
}

export default withRouter(withGlobalContext(Navbar));
