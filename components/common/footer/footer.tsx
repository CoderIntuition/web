import React, { FC } from "react";
import Link from "next/link";
import { StyledContainer, StyledFooterLink, StyledGrid, StyledMenu } from "./footer-styles";
import styles from "./Footer.module.css";
import { GridColumn } from "semantic-ui-react";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <div className={styles.footerWrapper}>
      <StyledContainer>
        <StyledMenu secondary>
          <Link href="/" passHref>
            <StyledFooterLink>About Us</StyledFooterLink>
          </Link>
          <span className={styles.bar}>&#124;</span>
          <Link href="/faq" passHref>
            <StyledFooterLink>FAQ</StyledFooterLink>
          </Link>
          <span className={styles.bar}>&#124;</span>
          <Link href="/contact" passHref>
            <StyledFooterLink>Contact Us</StyledFooterLink>
          </Link>
          <span className={styles.bar}>&#124;</span>
          <Link href="/privacy" passHref>
            <StyledFooterLink href="/privacy">Privacy Policy</StyledFooterLink>
          </Link>
          <span className={styles.bar}>&#124;</span>
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
    </div>
  );
};

export default Footer;
