import React from "react";
import { AppProps } from "next/app";
import "../styles/tailwind.css";
import "fomantic/dist/semantic.css";
import "common/quiz.css";
import "../common/index.css";

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
