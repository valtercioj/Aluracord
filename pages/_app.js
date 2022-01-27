import { Component } from "react/cjs/react.production.min"
import GlobalStyle from "./GlobalStyle"

export default function MyApp({Component, pageProps}){
    return (
        <>
            <GlobalStyle />
            <Component {...pageProps} />
        </>
    );
}