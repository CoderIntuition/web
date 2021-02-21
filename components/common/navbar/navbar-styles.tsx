import styled from "styled-components";
import Link from "components/common/helpers/link";
import { Button, Container, Dropdown, Menu, MenuItem } from "semantic-ui-react";

export const NavbarMenu = styled(Menu)`
  &&& {
  background: rgb(77,105,233);
  background: linear-gradient(90deg, rgba(77,105,233,1) 0%, rgba(123,97,220,1) 59%, rgba(151,90,205,1) 100%);
    height: ${(props) => props.height}px;
    margin: 0;
  }
`;

export const NavContainer = styled(Container)`
  &&&&& {
    width: 100%;
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

export const StyledDropdown = styled(Dropdown)`
  &&&& {
    padding: 10px 25px;
    margin: 0;
  }
`;

export const SignUpButton = styled(Button)`
  &&&&& {
    color: #f7fafc;
    border-radius: 9999px;
    width: 108px;
    padding: 14px 0;
    transition-duration: 300ms;
    letter-spacing: 0.025em;
  }
`;
