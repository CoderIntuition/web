import React from "react";
import {AppProps} from "next/app";
import "tailwindcss/dist/base.min.css";

const App = ({Component, pageProps}: AppProps) => {
    return <Component {...pageProps} />;
}

export default App;
