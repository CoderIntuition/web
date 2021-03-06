import styled from "styled-components";
import { Container, Grid, Menu } from "semantic-ui-react";

export const FooterWrapper = styled.div`
  &&& {
    width: 100%;
    height: 300px;
    background: #ffffff;
    font-weight: 500;
    border-top: solid;
    border-top-width: 1px;
    border-top-color: rgba(124, 139, 161, 0.1);
  }
`;

export const StyledContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    position: relative;
  }
`;

export const StyledMenu = styled(Menu)`
  &&& {
    position: absolute;
    top: 80px;
    margin: 0;
    align-items: center;
  }
`;

export const StyledFooterLink = styled.a`
  &&& {
    font-size: 14px;
    font-weight: 500;
    color: #243e63;
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
      color: #567095;
    }

    &:hover::after {
      width: 100%;
      background: #567095;
    }
  }
`;

export const StyledGrid = styled(Grid)`
  &&& {
    width: inherit;
    font-size: 14px;
    color: #243e63;
    margin: 0;
    position: absolute;
    bottom: 60px;
  }
`;

export const Bar = styled.span`
  &&& {
    margin: 0 13px;
    height: 15px;
    width: 2px;
    color: #7c8ba1;
  }
`;

// For mobile

export const MobileFooterWrapper = styled.div`
  &&& {
    width: 100%;
    height: 350px;
    background: #ffffff;
    font-weight: 500;
    border-top: solid;
    border-top-width: 1px;
    border-top-color: rgba(124, 139, 161, 0.1);
  }
`;

export const MobileContainer = styled(Container)`
  &&& {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
`;

export const MobileMenu = styled(Menu)`
  &&& {
    margin: 0;
    width: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > * {
      margin-block: 15px;
    }
  }
`;

export const MobileLink = styled.a`
  &&& {
    font-size: 14px;
    font-weight: 500;
    color: #243e63;
    margin: 10px 0;
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
      color: #567095;
    }

    &:hover::after {
      width: 100%;
      background: #567095;
    }
  }
`;
