// https://github.com/sickdyd/react-flashlight/blob/master/src/ReactFlashlight.js
// https://github.com/sickdyd/react-flashlight-demo/blob/master/src/App.js
import Head from "next/head";
import React, { useEffect, useState } from "react";
import flashStyle from "../styles/index.module.scss";
import { Howl } from "howler";
import useLocalStorage from "../hooks/useLocalStorage";
import GetJoke from "./getJoke";
import { jokeSchema } from "../utils/types";
import { animations } from "../animations/getJoke";
import { motion } from "framer-motion";

// https://github.com/goldfire/howler.js#quick-start

// Define the components props
interface IndexProps {
  jokes: Array<jokeSchema>;
}

const BoomBamBap = (props: IndexProps) => {
  const { jokes } = props;

  function boomBapBap() {
    const sound = new Howl({
      src: ["boom-bap-POW.mp3"],
    });
    sound.once("load", function () {
      sound.play();
    });
  }


  // from local storage, get the used IDs
  const [usedIDs, setUsedIDs] = useLocalStorage("usedIDs", [] as number[]);
  useEffect(() => {
    localStorage.setItem("usedIDs", JSON.stringify(usedIDs));

    // if all jokes have been used, reset the usedIDs local storage
    if (usedIDs.length == Object.keys(jokes).length) {
      window.localStorage.setItem("usedIDs", JSON.stringify([]));
    }
  }, [jokes, usedIDs]);

  const [id, setID] = useState(0);
  useEffect(() => {
    // runs only when the page renders for the first time
    var randomNum = Math.floor(Math.random() * Object.keys(jokes).length);
    while (usedIDs.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * Object.keys(jokes).length);
    }

    // we use this if statement to make the usedIDs act as a set,
    // but since we added lines 50-52, where we reset the usedIDs local storage,
    // we don't need to add an if statement anymore
    // since the list resets when it becomes full
    // and we are sure that the randomNum is not in the list thanks to the while loop
    // if (!usedIDs.includes(randomNum)) {
    setUsedIDs([...usedIDs, randomNum]);
    // }
    setID(randomNum);

    boomBapBap();
  }, []);

  return (
    <div className={flashStyle.fullScreen}>
      <Head>
        <title>Knock Knock</title>
        <link rel="icon" href="/flashlight.svg" />
      </Head>
      <div className={flashStyle.animatedGrid}>
        <div className={flashStyle.k}>
          <motion.h1
            drag
            whileDrag={{ scale: 1.1 }}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            whileTap={animations.jokeWhileTap}
          >
            knock knock...
          </motion.h1>
        </div>
        <div className={flashStyle.w}>
          <motion.h1
            drag
            whileDrag={{ scale: 1.1 }}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={1}
            whileTap={animations.jokeWhileTap}
          >
            who&apos;s there?
          </motion.h1>
        </div>
        <GetJoke jokes={jokes} id={id} />
      </div>
    </div>
  );
};

export default BoomBamBap;
