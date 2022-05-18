/* Ideas:
- Click to reveal
    - move sounds here, initial sound is now shorter and ends right b4 the "OOOO!"
    - when clicked, play the rest of the audio
        - not possible to click early coz button wont be shown
*/
import Link from "next/link";
import { useState } from "react";
import flashStyle from "../styles/index.module.scss";

const GetJoke = ({ jokes, id }) => {
  let knock: string = "";
  let who: string = "";
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
              <h2>
                Complete Joke
              </h2>
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
        <h1> {who} </h1>
        <div className={flashStyle.completeJoke}>{CompleteJoke()}</div>
      </div>
    </>
  );
};

export default GetJoke;
