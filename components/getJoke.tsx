/* Ideas:
- Click to reveal
    - move sounds here, initial sound is now shorter and ends right b4 the "OOOO!"
    - when clicked, play the rest of the audio
        - not possible to click early coz button wont be shown
*/
import Link from "next/link";
import { useState } from "react";
import flashStyle from "../styles/index.module.scss";
import buttonStyle from "../styles/addButton.module.scss";
import { motion } from "framer-motion";
import { animations } from "../animations/getJoke";


const GetJoke = ({ jokes, id }) => {
  let knock: string = "";
  let who: string = "";
  let dots: string = "";
  const joke = jokes[id];

  knock = joke["who's-there"];
  who = joke["who"];

  function CompleteJoke() {
    if (id == 9) {
      if (typeof window !== "undefined") {
        localStorage.setItem("joke", JSON.stringify(jokes[id]));
      }
      return (
        <>
          <Link href="/contact">
            <a>
              <h2>Complete Joke</h2>
            </a>
          </Link>
        </>
      );
    }
  }
  return (
    <>
      <div className={flashStyle.req}>
        <h1> {knock} </h1>
      </div>
      <div className={flashStyle.res}>
        <h1>{knock} who?</h1>
      </div>
      <div className={flashStyle.star}>
        <Link href="/add-joke">
            <a>
          <button className={buttonStyle.button}>Add Your own Joke!</button>
          </a>
          </Link>
        <h1>
          {who}
          <motion.span
            initial="hidden"
            animate="visible"
            variants={animations.variants}
            whileHover={animations.whileHover}
          >
            {id == 9 ? "..." : ""}

          </motion.span>
        </h1>
        <div className={flashStyle.completeJoke}>{CompleteJoke()}</div>
      </div>
    </>
  );
};

export default GetJoke;
