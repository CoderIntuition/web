import React from "react";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import "fomantic/dist/semantic.css";
import { BreakpointProvider } from "react-socks";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <BreakpointProvider>
      <Component {...pageProps} />
    </BreakpointProvider>
  );
};

export default App;
