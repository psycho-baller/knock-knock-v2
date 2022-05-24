import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Howl, Howler } from "howler";
import { motion } from "framer-motion";

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
const Home: NextPage = () => {
  // const { results = [] } = joke
  // console.log(joke);
  // console.log(results);

  const sound = new Howl({
    src: ["intro-sound.mp3"],
    onplayerror: function () {
      sound.on("unlock", function () {
        sound.play();
      });
    },
  });
  var stop = false;
  function stopSound() {
    stop = true;
    sound.stop();
  }
  function introSound() {
    if (navigator.userAgent.match(/chrome/i)) {
      if (!stop) {
        sound.once("unlock", function () {
          sound.play();
        });
      } else {
        sound.stop();
      }
    } else {
      sound.once("load", function () {
        sound.play();
      });
    }
  }
  function knockKnock() {
    const sound = new Howl({
      src: ["knock-knock.mp3"],
    });
    if (!stop) {
      sound.play();
    } else {
      sound.stop();
    }
  }
  useEffect(() => {
    if (!navigator.userAgent.match(/chrome|chromium|crios/i)) {
      // works in all browsers except chromium based browsers
      // this line won't run in chromium based browsers
      introSound();
      setTimeout(knockKnock, 800);
    }
  }, []);
  return (
    <div className={styles.dark} onClick={introSound}>
      {/* <button onClick={introSound}>sound</button>      */}
      {/* for the chromium based browsers ^^^^^^^^^^^^^^^^^^ */}
      <Head>
        <title>Door</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/flashlight.svg" />
      </Head>

      <div className={styles.main}>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 0.4,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.4,
                duration: 0.5,
              },
            },
          }}
          whileHover={{
            scale: [1, 0.9, 0.8, 0.9, 0.8, 0.9],
            transition: {
              duration: 0.5,
            },
          }}
          onMouseEnter={knockKnock}
          onMouseDown={stopSound}
        >
          <motion.div
            animate={{
              scale: [1, 0.9, 0.8, 0.9, 0.8, 0.9, 1],
              transition: {
                delay: 1.1,
                duration: 0.55,
              },
            }}
          >
            <Link href="/boom-bam-bap">
              <a>
                {/*
          possible fixes:
           https://github.com/vercel/next.js/issues/7915
          then:
           https://nextjs.org/docs/messages/react-hydration-error
          ------------------------------------------------------------
          make it load on the same page:
           https://flaviocopes.com/react-show-different-component-on-click */}
                <Image
                  src="/brown-door.svg"
                  alt="door"
                  height={450}
                  width={300}
                />
              </a>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
