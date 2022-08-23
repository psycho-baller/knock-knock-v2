import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Howl } from "howler";
import { motion } from "framer-motion";
import { animation } from "../animations";

interface doorProps {
  showJoke: boolean;
  setShowJoke: (showJoke: boolean) => void;
}

const Door = ({ showJoke, setShowJoke }: doorProps) => {
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
    introSound();
    setTimeout(knockKnock, 800);
  }, []);

  return (
    <div className={styles.dark} onClick={introSound}>
      {/* <button onClick={introSound}>sound</button>      */}
      {/* for the chromium based browsers ^^^^^^^^^^^^^^^^^^ */}
      <Head>
        <link rel="icon" href="/brown-door.svg" />
      </Head>

      <div className={styles.main}>
        <motion.div
          onMouseOver={knockKnock}
          onMouseDown={stopSound}
          initial="hidden"
          animate="visible"
          variants={animation.variants}
          whileHover={animation.whileHover}
        >
          <motion.div
            animate={animation.animate}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onClick={() => setShowJoke(true)}
          >
            {/* <Link passHref href="/boom-bam-bap">
              <motion.a
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              > */}
            {/*
          possible fixes:
           https://github.com/vercel/next.js/issues/7915
          then:
           https://nextjs.org/docs/messages/react-hydration-error
          ------------------------------------------------------------
          make it load on the same page:
           https://flaviocopes.com/react-show-different-component-on-click */}

            <Image src="/brown-door.svg" alt="door" height={450} width={300} />
            {/* </motion.a>
            </Link> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Door;
