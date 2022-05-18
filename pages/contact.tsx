import Head from "next/head";
import styles from "../styles/contactForm.module.scss";
import { jokeSchema } from "../utils/types";
import { useState } from "react";

// For display toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [completion, setCompletion] = useState("");

  let jokeStr = "9";
  if (typeof window !== "undefined") {
    jokeStr = localStorage.getItem("joke") as string;
  }
  console.log(jokeStr);
  //   const joke = JSON.parse(JSON.parse(JSON.stringify(jokeStr))) as jokeSchema;
  //     console.log(joke, "parsed");

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const setName = name === "" ? "Anonymous" : name;
    const setEmail = email === "" ? "an@on" : email;
    const res = (await fetch("https://knock-knock.vercel.app/api/submit-form", {
      method: "POST",
      body: JSON.stringify({ setName, setEmail, jokeStr, completion }),
    })) as Response;
    if (res.status === 201) {
      toast("Thank you for contacting us!", { type: "success" });
    } else {
      toast("Please re-check your inputs.", { type: "error" });
    }
  };

  let previewJoke: string = `knock knock...
who's there?
May I come in?
May I come in who?
Not until you...`;
  //   if (joke) {
  //     previewJoke = `knock knock...
  // who's there?
  // ${joke["who's-there"]}
  // ${joke["who's-there"]} who?
  // ${joke["who"]}`;
  //   }
  return (
    <div className={styles.container}>
      <Head>
        <title>Contact</title>
        <link rel="icon" href="/blue-door.svg" />
      </Head>
      <ToastContainer />
      <form className={styles.form} onSubmit={submitForm}>
        <h1 className={styles.title}>React Out To Us</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Mo Bamba (optional)"
            required={false}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputs}>
          <div>
            <label htmlFor="email">E-Mail Address</label>
            <input
              type="email"
              name="email"
              placeholder="mo.bamba@example.io (optional)"
              required={false}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label htmlFor="message">
            Completion <span className={styles.redText}>*</span>
          </label>
          <textarea
            name="message"
            id="message"
            rows={5}
            placeholder={previewJoke}
            required
            value={completion}
            onChange={(e) => setCompletion(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
