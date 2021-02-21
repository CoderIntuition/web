import React from "react";
import { AppProps } from "next/app";
import "tailwindcss/dist/base.min.css";
import "fomantic/dist/semantic.css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
};

export default App;
