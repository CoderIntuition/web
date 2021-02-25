import React, { FC, PropsWithChildren } from "react";
import Navbar from "../home-navbar/home-navbar";
import { FlexContainer, FlexContent } from "../../../common/global-styles";
import Footer from "../footer/footer";

interface PageWrapperPropTypes extends PropsWithChildren<any> {
  hideFooter?: boolean;
}

const PageWrapper: FC = (props: PageWrapperPropTypes) => {
  return (
    <FlexContainer>
      <Navbar />
      <FlexContent>{props.children}</FlexContent>
      {!props.hideFooter && <Footer />}
    </FlexContainer>
  );
};

export default PageWrapper;
