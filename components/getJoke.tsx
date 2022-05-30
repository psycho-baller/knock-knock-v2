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
  const joke = jokes[id];

  knock = joke["who's-there"];
  who = joke["who"];

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
        <motion.h1
          initial="hidden"
          animate={["visible", "active"]}
          variants={animations.variants}
          whileHover={animations.whileHover}
          drag
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          layout="size"
        >
          {who}
        </motion.h1>
      </div>
    </>
  );
};

export default GetJoke;
