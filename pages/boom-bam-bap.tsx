// https://github.com/sickdyd/react-flashlight/blob/master/src/ReactFlashlight.js
// https://github.com/sickdyd/react-flashlight-demo/blob/master/src/App.js
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
// import { ReactFlashlight } from "react-flashlight";
import flashStyle from "../styles/index.module.scss";
import { Howl, Howler } from "howler";
import clientPromise from "../lib/mongodb";
import useLocalStorage from "../hooks/useLocalStorage";
import GetJoke from "../components/getJoke";
import { jokeSchema } from "../utils/types";

// https://github.com/goldfire/howler.js#quick-start

// import index from '../pages/index.module.scss'

// export async function getServerSideProps() {
//   const res = await fetch('https://api.jokes.one/knock-knock/random')
//   const joke = await res.json()
//   return {
//     props: {
//       joke
//     }
//   }
// }
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

  const [id, setID] = useState(9);
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
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/torch.svg" />
        </Head>
        <div className={flashStyle.animatedGrid}>
          <div className={flashStyle.k}>
            <h1>knock knock...</h1>
          </div>
          <div className={flashStyle.w}>
            <h1>who&apos;s there?</h1>
          </div>
          <GetJoke jokes={jokes} id={id} />
        </div>
      </div>
  );
};

export default BoomBamBap;

export async function getServerSideProps(context: any) {
  const client = await clientPromise;

  const db = client.db("knock-knock");

  let jokes = await db.collection("jokes").find({}).toArray();
  jokes = JSON.parse(JSON.stringify(jokes));

  return {
    props: {
      jokes: jokes,
    },
  };
}
