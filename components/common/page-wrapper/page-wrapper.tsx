import React, { FC, PropsWithChildren } from "react";
import Navbar from "components/common/navbar/navbar";
import HomeNavbar from "components/common/home-navbar/home-navbar";
import { FlexContainer, FlexContent } from "common/global-styles";
import Footer from "components/common/footer/footer";

interface PageWrapperProps extends PropsWithChildren<any> {
  homeNavbar?: boolean;
  hideFooter?: boolean;
}

const PageWrapper: FC<PageWrapperProps> = (props: PageWrapperProps) => {
  return (
    <FlexContainer>
      {props.homeNavbar ? <HomeNavbar /> : <Navbar />}
      <FlexContent>{props.children}</FlexContent>
      {!props.hideFooter && <Footer />}
    </FlexContainer>
  );
};

export default PageWrapper;
