import styled from "styled-components";
import { Button, Container, Dropdown, Menu, MenuItem } from "semantic-ui-react";

export const Banner = styled.div`
  display: flex;
  color: #ffffff;
  background-color: #ed2939;
  width: 100%;
  padding-block: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const HomeNavbarMenu = styled(Menu)`
  &&& {
    position: ${(props) => props.position};
    width: ${(props) => props.width};
    z-index: 1;
    background: ${(props) => props.background};
    background-color: ${(props) => props.backgroundcolor};
    height: ${(props) => props.height}px;
    margin-bottom: ${(props) => props.mgbottom}px;
    margin-top: 30px;
  }
`;

export const NavContainer = styled(Container)`
  &&&&& {
    width: 100%;
    max-width: 1440px;
    padding-left: 7%;
    padding-right: 7%;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &&&& {
    margin: 0;
    padding-inline: 0;
  }
`;

export const LogoLink = styled.a`
  &&& {
    padding: 2px 10px;
    border-radius: 10px;
  }
`;

export const StyledLink = styled.a`
  &&& {
    font-weight: 500;
    font-size: 15px;
    color: #ffffff;
    margin: 0 22px;
    transition-duration: 300ms;

    &::after {
      content: "";
      display: block;
      margin: auto;
      height: 2px;
      width: 0;
      background: transparent;
      transition: width 500ms ease;
    }

    &:hover {
      color: #ffffff;
    }

    &:hover::after {
      width: 100%;
      background: #ffffff;
    }

    ${({ active }) =>
      active &&
      `
      color: #ffffff;
      &::after {
        width: 100%;
        background: #ffffff;
      }
    `}
  }
`;

export const StyledDropdown = styled(Dropdown)`
  &&&&& {
    padding: 10px 25px;
    margin: 0;
    color: #ffffff;

    &&&&&:hover {
      color: #ffffff;
    }

    &&&&&:not(:focus) {
      color: #ffffff;
    }

    .item {
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
`;

export const UserName = styled.span`
  &&& {
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
    color: #ffffff;
  }
`;

export const SignUpButton = styled(Button)`
  &&&&& {
    color: #4d69e9;
    background-color: #ffffffd0;
    border-radius: 9999px;
    width: 108px;
    padding: 12px 0;
    transition-duration: 300ms;
    letter-spacing: 0.025em;
  }
`;

// For mobile

export const MobileDropDown = styled(Dropdown)`
  &&&&& {
    color: #ffffff;

    &:hover {
      color: #ffffff;
    }

    i.icon {
      margin: 0;

      &:hover {
        color: #ffffff;
      }
    }

    .item {
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
`;

export const MobileDropDownMenu = styled(Dropdown.Menu)`
  &&& {
    width: 180px;
  }
`;

export const StyledMobileLink = styled.a`
  &&& {
    color: #000000;
    display: inline-block;
    width: 100%;
  }
`;
