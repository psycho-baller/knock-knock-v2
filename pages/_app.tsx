// css files can only be imported in here since Next.js considers all css files as global,
// EXCEPT if you made it a module (like: name.module.css), which is not the case here
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import { motion, AnimatePresence } from "framer-motion";
// this is responsible for rendering all the pages
// the end point for all the pages before rendering them
function MyApp({ Component, pageProps}: AppProps) {
  // the code in here is excecuted in both the server and the client,
  // proof: use console.log and you'll get a a log in both places

  return (
    <>
      <Head>
        <title>Knock Joke Heaven</title>

        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
