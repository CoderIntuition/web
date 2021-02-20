import styled from "styled-components";
import Link from "components/common/helpers/link";
import Image from "next/image";
import { Button, Container, Dropdown, Menu, MenuItem } from "semantic-ui-react";

export const UsernameSpan = styled.span`
  &&& {
    font-weight: 500;
  }
`;

export const NavbarDiv = styled.div`
  &&& {
    overflow: hidden;
    position: relative;
    min-height: 100vh;
  }
`;

export const NavbarMenu = styled(Menu)`
  &&& {
    background-color: ${(props) => props.bgcolor};
    height: ${(props) => props.height}px;
    margin: 0;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  &&& {
    margin: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

export const StyledDropdown = styled(Dropdown)`
  &&& {
    padding: 10px 25px !important;
  }
`;

export const StyledNavContainer = styled(Container)`
  &&& {
    width: 100% !important;
    padding-left: 7%;
    padding-right: 7%;
  }
`;

export const StyledLogo = styled(Image)`
  &&& {
    height: 36px;
  }
`;

export const StyledLink = styled(Link)`
  &&& {
    font-weight: 600; // Semi bold
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

    ${({ active }) =>
      active &&
      `
      color: #4d69e9;
      &::after {
        width: 100%;
        background: #4d69e9;
      }
    `} ${({ active }) =>
      !active &&
      `
      &:hover {
        color: #4d69e9;
      }
      &:hover::after {
        width: 100%;
        background: #4d69e9;
      }
    `}
  }
`;

export const StyledSignUpButton = styled(Button)`
  &&& {
    color: #f7fafc;
    border-radius: 9999px;
    width: 108px;
    padding: 14px 0 !important;
    font-size: 15px;
    transition-duration: 300ms;
    letter-spacing: 0.025em;
`;
