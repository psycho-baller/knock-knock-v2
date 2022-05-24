import Head from "next/head";
import styles from "../styles/contactForm.module.scss";
import { useState } from "react";
import { motion } from "framer-motion";

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
      <motion.form
        className={styles.form}
        onSubmit={submitForm}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.6,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              delay: 0.1,
              duration: 0.60,
            },
          },
        }}
      >
        <motion.h1
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 1.4,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.25,
                duration: 0.5,
              },
            },
          }}
        >
          Complete the Joke!
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 1.4,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.31,
                duration: 0.5,
              },
            },
          }}
        >
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
        </motion.div>
        <motion.div
          className={styles.inputs}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 1.4,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.37,
                duration: 0.5,
              },
            },
          }}
        >
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
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 1.4,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.44,
                duration: 0.5,
              },
            },
          }}
        >
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
        </motion.div>
        <motion.button
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              scale: 1.4,
              opacity: 0,
            },
            visible: {
              scale: 1,
              opacity: 1,
              transition: {
                delay: 0.52,
                duration: 0.5,
              },
            },
          }}
          className={styles.btn}
          type="submit"
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
}
