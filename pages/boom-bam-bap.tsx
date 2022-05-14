// https://github.com/sickdyd/react-flashlight/blob/master/src/ReactFlashlight.js
// https://github.com/sickdyd/react-flashlight-demo/blob/master/src/App.js
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
// import { ReactFlashlight } from "react-flashlight";
import flashStyle from "../styles/index.module.scss";
import { Howl, Howler } from "howler";
import clientPromise from "../lib/mongodb";
import useLocalStorage from "./hooks/useLocalStorage";
import GetJoke from "./components/getJoke";
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
  jokes: Array<jokeSchema>
}
const isWindowContext = typeof window !== "undefined";
const x: number = (isWindowContext && window.innerWidth / 2) as number;
const y: number = (isWindowContext && window.innerHeight / 2) as number;
const BoomBamBap = ( props: IndexProps ) => {
  const { jokes } = props;

  function boomBapPow() {
    const sound = new Howl({
      src: ["boom-bap-POW.mp3"],
    });
    sound.once("load", function () {
      sound.play();
    });
  }
  function gotchaBitch() {
    const sound = new Howl({
      src: ["gotcha-bitch.mp3"],
    });
    sound.play();
  }
  function horn() {
    var sound = new Howl({
      src: ["air-horn.mp3"],
    });

    // Clear listener after first call.
    sound.once("load", function () {
      sound.play();
    });

    // // Fires when the sound finishes playing.
    // sound.on("end", function () {
    //   console.log("Finished!");
    // });
  }

  // function getJoke() {
  //   let knock: string = "";
  //   let who: string = "";
  //   console.log(JSON.stringify(jokes));
  //   const joke = jokes[Math.floor(Math.random() * jokes.length)];
  //   console.log(usedIDs, "        1st");
  //   console.log(joke, "        2nd");

  //   if (!usedIDs.includes(joke.id)) {
  //     console.log(joke.id, usedIDs[0]);
  //     setUsedIDs([...usedIDs, joke.id]);
  //     knock = joke["who's-there"];
  //     who = joke["who"];
  //     console.log(usedIDs, "        3rd");
  //     return (
  //       <>
  //         <div className={flashStyle.req}>
  //           <h1 className={flashStyle.center}>{knock}</h1>
  //         </div>
  //         <div className={flashStyle.res}>
  //           <h1 className={flashStyle.center}>{knock} who?</h1>
  //         </div>
  //         <div className={flashStyle.star}>
  //           <h1 className={flashStyle.center}>{who}</h1>
  //         </div>
  //       </>
  //     );
  //   }
  //   if (usedIDs.length == Object.keys(jokes).length) {
  //     knock = "1";
  //     who = "2";
  //     return (
  //       <>
  //         <div className={flashStyle.req}>
  //           <h1 className={flashStyle.center}>{knock}</h1>
  //         </div>
  //         <div className={flashStyle.res}>
  //           <h1 className={flashStyle.center}>{knock} who?</h1>
  //         </div>
  //         <div className={flashStyle.star}>
  //           <h1 className={flashStyle.center}>{who}</h1>
  //         </div>
  //       </>
  //     );
  //   }
  //   else {
  //     knock = "Ligma";
  //     who = "Ligma balls";
  //     return (
  //       <>
  //         <div className={flashStyle.req}>
  //           <h1 className={flashStyle.center}>{knock}</h1>
  //         </div>
  //         <div className={flashStyle.res}>
  //           <h1 className={flashStyle.center}>{knock} who?</h1>
  //         </div>
  //         <div className={flashStyle.star}>
  //           <h1 className={flashStyle.center}>{who}</h1>
  //         </div>
  //       </>
  //     );
  //   }
  // }

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
    // runs when the page runs
    // setPosition({ x: x, y: y });
    var randomNum = Math.floor(Math.random() * (Object.keys(jokes).length));
    while (usedIDs.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * (Object.keys(jokes).length));
    }

    // we use this if statement to make the usedIDs act as a set,
    // but since we added lines 131-133,
    // we don't need to add an if statement
    // since the list resets when it becomes full
    // and we are sure that the randomNum is not in the list thanks to the while loop
    // if (!usedIDs.includes(randomNum)) {
    setUsedIDs([...usedIDs, randomNum]);
    // }
    setID(randomNum);

    boomBapPow();
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
          <h1 className={flashStyle.center}>knock knock...</h1>
        </div>
        <div className={flashStyle.w}>
          <h1 className={flashStyle.center}>who&apos;s there?</h1>
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
  type Jokes = {
    id?: number;
    who?: string;
    "who's-there"?: string;
    _id?: string;
  };
  
  // let jokes: Partial<Jokes> = {};
  let jokes = await db.collection("jokes").find({}).toArray();
  jokes = JSON.parse(JSON.stringify(jokes));

  return {
    props: {
      jokes: jokes,
    },
  };
}
