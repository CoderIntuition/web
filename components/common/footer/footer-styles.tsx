import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Container, Grid, Menu } from "semantic-ui-react";

export const FooterWrapper = styled.div`
  &&& {
    width: 100%;
    height: 300px;
    background: #4d69e9;
    font-weight: 500;
  }
`;

export const StyledContainer = styled(Container)`
  &&& {
    display: flex;
    justify-content: center;
  }
`;

export const StyledMenu = styled(Menu)`
  &&& {
    margin: 0;
    height: 10px;
  }
`;

export const StyledLogo = styled(Image)`
  &&& {
    height: 25px;
  }
`;

export const StyledFooterLink = styled(Link)`
  &&& {
    font-size: 14px;
    font-weight: 500;
    color: #eaedfc;
    margin: 0 15px;
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
      color: #cccfde;
    }

    &:hover::after {
      width: 100%;
      background: #cccfde;
    }
  }
`;

export const StyledGrid = styled(Grid)`
  &&& {
    width: inherit;
    font-size: 14px;
    color: #eaedfc;
  }
`;

export const StyledFooterBar = styled.span`
  &&& {
    margin: 0 15px;
    height: 15px;
    width: 2px;
    color: #c7d0f8;
  }
`;
