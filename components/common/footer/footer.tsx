import React, { FC } from "react";
import Link from "next/link";
import {
  Bar,
  FooterWrapper,
  MobileContainer,
  MobileFooterWrapper,
  MobileLink,
  MobileMenu,
  StyledContainer,
  StyledFooterLink,
  StyledGrid,
  StyledMenu,
} from "./footer-styles";
import { GridColumn } from "semantic-ui-react";
import Image from "next/image";

const Footer: FC = () => {
  const desktopFooter = (
    <FooterWrapper>
      <StyledContainer className="md:flex">
        <StyledMenu secondary>
          <Link href="/" passHref>
            <StyledFooterLink>About Us</StyledFooterLink>
          </Link>
          <Bar>&#124;</Bar>
          <Link href="/faq" passHref>
            <StyledFooterLink>FAQ</StyledFooterLink>
          </Link>
          <Bar>&#124;</Bar>
          <Link href="/contact" passHref>
            <StyledFooterLink>Contact Us</StyledFooterLink>
          </Link>
          <Bar>&#124;</Bar>
          <Link href="/privacy" passHref>
            <StyledFooterLink href="/privacy">Privacy Policy</StyledFooterLink>
          </Link>
          <Bar>&#124;</Bar>
          <Link href="/terms" passHref>
            <StyledFooterLink href="/terms">Terms of Service</StyledFooterLink>
          </Link>
        </StyledMenu>
        <StyledGrid columns={3} centered>
          <GridColumn width={5} verticalAlign="middle" textAlign="left">
            <Link href="/" passHref>
              <a>
                <Image src="/images/logoname.svg" alt="CoderIntuition logo" width="200px" height="36px" />
              </a>
            </Link>
          </GridColumn>
          <GridColumn width={6} verticalAlign="middle" textAlign="center">
            &#169; {new Date().getFullYear()} CoderIntuition. All rights reserved.
          </GridColumn>
          <GridColumn width={5} verticalAlign="middle" textAlign="right">
            {"< "}Keep Coding{" />"}
          </GridColumn>
        </StyledGrid>
      </StyledContainer>
    </FooterWrapper>
  );

  const mobileFooter = (
    <MobileFooterWrapper>
      <MobileContainer className="md:flex">
        <MobileMenu secondary>
          <Link href="/" passHref>
            <a>
              <Image src="/images/logoname.svg" alt="CoderIntuition logo" width="200px" height="36px" />
            </a>
          </Link>
          <Link href="/" passHref>
            <MobileLink>About Us</MobileLink>
          </Link>
          <Link href="/faq" passHref>
            <MobileLink>FAQ</MobileLink>
          </Link>
          <Link href="/contact" passHref>
            <MobileLink>Contact Us</MobileLink>
          </Link>
          <Link href="/privacy" passHref>
            <MobileLink href="/privacy">Privacy Policy</MobileLink>
          </Link>
          <Link href="/terms" passHref>
            <MobileLink href="/terms">Terms of Service</MobileLink>
          </Link>
          <p>&#169; {new Date().getFullYear()} CoderIntuition. All rights reserved.</p>
        </MobileMenu>
      </MobileContainer>
    </MobileFooterWrapper>
  );

  return (
    <>
      <div className="hidden sm:contents">{desktopFooter}</div>
      <div className="contents sm:hidden">{mobileFooter}</div>
    </>
  );
};

export default Footer;
