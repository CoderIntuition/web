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
  UserName,
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

  onProblemPage() {
    return /^\/problem\//.test(this.props.router.asPath);
  }

  render() {
    const { authenticated, currentUser } = this.props;

    const trigger = authenticated ? (
      <>
        <User color="#ffffff" />
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
                  <Dropdown.Item>
                    <Link href="/login" passHref>
                      <StyledMobileLink onClick={() => this.handleLogin()}>Log In</StyledMobileLink>
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link href="/login" passHref>
                      <StyledMobileLink onClick={() => this.handleSignUp()}>Sign Up</StyledMobileLink>
                    </Link>
                  </Dropdown.Item>
                </>
              )}
            </MobileDropDownMenu>
          </MobileDropDown>
        </StyledMenuItem>
      </>
    );

    return (
      <>
        {!this.onProblemPage() && (
          <Banner>
            🚧 CoderIntuition is still under construction. Feel free to try it out and&nbsp;
            <Link href="/contact" passHref>
              <a style={{ color: "white", textDecoration: "underline" }}>submit your feedback</a>
            </Link>
            ! 🚧
          </Banner>
        )}
        <HomeNavbarMenu
          secondary
          position={this.onProblemPage() ? "" : "absolute"}
          width={this.onProblemPage() ? "" : "100%"}
          background={this.onProblemPage() ? "" : "transparent"}
          backgroundcolor={this.onProblemPage() ? "#242529" : "transparent"}
          height={this.onProblemPage() ? 60 : 80}
          mgbottom={this.onProblemPage() ? 0 : 5}
          mgtop={this.onProblemPage() ? 0 : 40}
        >
          <NavContainer>
            <div className="hidden lg:contents">{desktopNavbar}</div>
            <div className="contents lg:hidden">{mobileNavbar}</div>
          </NavContainer>
        </HomeNavbarMenu>
      </>
    );
  }
}

export default withRouter(withGlobalContext(HomeNavbar));
