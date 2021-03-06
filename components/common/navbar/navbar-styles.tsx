import styled from "styled-components";
import { Button, Container, Dropdown, Menu, MenuItem } from "semantic-ui-react";

export const NavbarMenu = styled(Menu)`
  &&& {
    background-color: ${(props) => props.bgcolor};
    height: ${(props) => props.height}px;
    margin-bottom: 5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
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
    &:hover {
      background-color: #f0f1f2;
    }
  }
`;

export const StyledLink = styled.a`
  &&& {
    font-weight: 500;
    font-size: 15px;
    color: #243e63;
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
      color: #4d69e9;
    }

    &:hover::after {
      width: 100%;
      background: #4d69e9;
    }

    ${({ active }) =>
      active &&
      `
      color: #4d69e9;
      &::after {
        width: 100%;
        background: #4d69e9;
      }
    `}
  }
`;

export const StyledDropdown = styled(Dropdown)`
  &&&& {
    padding: 10px 25px;
    margin: 0;
    color: #243e63;
    &&&&&:hover {
      color: #243e63;
    }
    &&&&&:not(:focus) {
      color: #243e63;
    }
  }
`;

export const UserName = styled.span`
  &&& {
    font-size: 15px;
    font-weight: 500;
    margin-left: 10px;
    color: #243e63;
  }
`;

export const SignUpButton = styled(Button)`
  &&&&& {
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
    color: #4d69e9;

    &:hover {
      color: #4d69e9;
    }

    i.icon {
      margin: 0;

      &:hover {
        color: #4d69e9;
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
    color: #243e63;
    display: inline-block;
    width: 100%;
  }
`;
