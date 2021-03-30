import React from "react";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import "fomantic/dist/semantic.css";
import "react-notifications-component/dist/theme.css";
import "common/quiz.css";
import "../common/index.css";
import dynamic from "next/dynamic";

const ReactNotification = dynamic(() => import("react-notifications-component"));
const GlobalContextProvider = dynamic<any>(() =>
  import("../common/global-context-provider").then((mod) => mod.GlobalContextProvider)
);

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <GlobalContextProvider>
      <ReactNotification />
      <Component {...pageProps} />
    </GlobalContextProvider>
  );
};

export default App;
