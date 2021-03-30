import React, { FC, PropsWithChildren } from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("components/common/navbar/navbar"));
const HomeNavbar = dynamic(() => import("components/common/home-navbar/home-navbar"));
const Footer = dynamic(() => import("components/common/footer/footer"));

// import Navbar from "components/common/navbar/navbar";
// import HomeNavbar from "components/common/home-navbar/home-navbar";
// import Footer from "components/common/footer/footer";
import { FlexContainer, FlexContent } from "common/global-styles";

interface PageWrapperProps extends PropsWithChildren<any> {
  darkMode?: number;
  homeNavbar?: boolean;
  hideFooter?: boolean;
}

const PageWrapper: FC<PageWrapperProps> = (props) => {
  return (
    <FlexContainer>
      {props.homeNavbar || props.darkMode ? <HomeNavbar /> : <Navbar />}
      <FlexContent>{props.children}</FlexContent>
      {!props.hideFooter && <Footer />}
    </FlexContainer>
  );
};

export default PageWrapper;
