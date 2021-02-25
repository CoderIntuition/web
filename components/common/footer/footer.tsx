import React, { FC } from "react";
import Link from "next/link";
import {
  FooterWrapper,
  StyledContainer,
  StyledFooterBar,
  StyledFooterLink,
  StyledGrid,
  StyledLogo,
  StyledMenu,
} from "./footer-styles";
import { GridColumn, MenuItem } from "semantic-ui-react";

const Footer: FC = () => {
  return (
    <FooterWrapper>
      <StyledContainer>
        <StyledMenu secondary>
          <MenuItem>
            <StyledFooterLink href="/">About Us</StyledFooterLink>
            <StyledFooterBar>&#124;</StyledFooterBar>
            <StyledFooterLink href="/faq">FAQ</StyledFooterLink>
            <StyledFooterBar>&#124;</StyledFooterBar>
            <StyledFooterLink href="/contact">Contact Us</StyledFooterLink>
            <StyledFooterBar>&#124;</StyledFooterBar>
            <StyledFooterLink href="/privacy">Privacy Policy</StyledFooterLink>
            <StyledFooterBar>&#124;</StyledFooterBar>
            <StyledFooterLink href="/terms">Terms of Service</StyledFooterLink>
          </MenuItem>
        </StyledMenu>
        <StyledGrid columns={3} centered>
          <GridColumn width={5} verticalAlign={"middle"} textAlign={"left"}>
            <Link href="/">
              <StyledLogo src="/images/logoname-white.svg" alt="CoderIntuition logo" width="100px" height="25px" />
            </Link>
          </GridColumn>
          <GridColumn width={6} verticalAlign={"middle"} textAlign={"center"}>
            &#169; {new Date().getFullYear()} CoderIntuition. All rights reserved.
          </GridColumn>
          <GridColumn width={5} verticalAlign={"middle"} textAlign={"right"}>
            {"< "}Keep Coding{" />"}
          </GridColumn>
        </StyledGrid>
      </StyledContainer>
    </FooterWrapper>
  );
};

export default Footer;
