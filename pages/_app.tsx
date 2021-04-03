import React from "react";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import "fomantic/dist/semantic.css";
import "react-notifications-component/dist/theme.css";
import "common/quiz.css";
import "../common/index.css";
import ReactNotification from "react-notifications-component";
import GlobalContextProvider from "../common/global-context-provider";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProvider>
      <ReactNotification />
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
};

export default App;
