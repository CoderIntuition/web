import React, { Component } from "react";
import { NextRouter, withRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Dropdown, Icon } from "semantic-ui-react";
import { isMod } from "../../../common/auth-service";
import { showSuccessToast, withGlobalContext } from "common/utils";
import { constants } from "common/constants";
import styles from "./home-navbar.module.css";
import {
  HomeNavbarMenu,
  LogoLink,
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
          <Link href="/" passHref>
            <LogoLink>
              <Image src="/images/logoname-white.svg" alt="CoderIntuition logo" width="200px" height="36px" />
            </LogoLink>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem>
          <Link href="/" passHref>
            <StyledLink active={1}>Home</StyledLink>
          </Link>
          <Link href="/problems" passHref>
            <StyledLink active={0}>Learn</StyledLink>
          </Link>
          <Link href="/plus" passHref>
            <StyledLink active={0}>Intuition+</StyledLink>
          </Link>
          <Link href="/blog" passHref>
            <StyledLink active={0}>Blog</StyledLink>
          </Link>
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
              <Image src="/images/logoname-white.svg" alt="CoderIntuition logo" width="200px" height="36px" />
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
      <HomeNavbarMenu secondary>
        <NavContainer>
          <div className="hidden lg:contents">{desktopNavbar}</div>
          <div className="contents lg:hidden">{mobileNavbar}</div>
        </NavContainer>
      </HomeNavbarMenu>
    );
  }
}

export default withRouter(withGlobalContext(HomeNavbar));
