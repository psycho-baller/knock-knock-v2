import Head from "next/head";
import styles from "../styles/contactForm.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { animations } from "../animations/contact";

// For display toasts
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [joke, setJoke] = useState("Knock-knock");

  const [firstKnock, setFirstKnock] = useState("");
  const [secondOne, setSecondOne] = useState("");
  const [secondKnock, setSecondKnock] = useState("");

  const [riddleQuestion, setRiddleQuestion] = useState("");
  const [riddleAnswer, setRiddleAnswer] = useState("");

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
    const typeOfJoke = joke;
    const jokeToAdd =
      firstKnock !== ""
        ? "Knock-knock?" + "\n" + "Who's there?" + "\n" +  firstKnock + "\n" + firstKnock + " who?" + "\n" + secondKnock
        : riddleQuestion + "\n" + riddleAnswer;
    const res = (await fetch("https://knock-knock.vercel.app/api/add-joke-api", {
      method: "POST",
      body: JSON.stringify({ setName, setEmail, jokeToAdd, typeOfJoke }),
    })) as Response;
    if (res.status === 201) {
      toast("Thank you for contacting us!", { type: "success" });
    } else {
      toast("Please re-check your inputs.", { type: "error" });
    }
  };
  // let typeOfJoke: HTMLInputElement;
  // if (typeof window !== "undefined") {
  //   typeOfJoke = document.getElementById("typeOfJoke") as HTMLInputElement;
  // }
  // useEffect(() => {
  //   typeOfJoke = document.getElementById("joke-type") as HTMLInputElement;
  // }, []);
  const firstPlaceholder = "Ligma";
  function addJoke() {
    if (joke === "Knock-knock") {
      return (
        <div>
          <motion.div
            // className={styles.oneLine}
            initial="hidden"
            animate="visible"
            variants={animations.addKnock}
          >
            <label htmlFor="first">
              Who&apos;s&nbsp;there?
              <span className={styles.redText}>*&nbsp;</span>
            </label>
            <input
              type="text"
              id="firstKnock"
              name="firstKnock"
              placeholder={firstPlaceholder}
              required={true}
              value={firstKnock}
              onChange={(e) => {
                setFirstKnock(e.target.value);
                setSecondOne(e.target.value);
              }}
            />
          </motion.div>
          <motion.div
            // className={styles.oneLine}
            initial="hidden"
            animate="visible"
            variants={animations.addKnock}
          >
            {/* Make label stay one line in a slick way */}
            <label htmlFor="first">
              {secondOne == "" ? firstPlaceholder : secondOne}
              &nbsp;who?<span className={styles.redText}>*&nbsp;</span>
            </label>
            <input
              type="text"
              id="secondKnock"
              name="secondKnock"
              placeholder="Ligma balls"
              required={true}
              value={secondKnock}
              onChange={(e) => setSecondKnock(e.target.value)}
            />
          </motion.div>
        </div>
      );
    } else {
      return (
        <>
          <motion.div
            // className={styles.oneLine}
            initial="hidden"
            animate="visible"
            variants={animations.addRiddle}
          >
            <label htmlFor="first">
              Riddle:<span className={styles.redText}>*&nbsp;</span>
            </label>
            <input
              type="text"
              id="first"
              name="first"
              placeholder="What has 13 hearts, but no other organs?"
              required={true}
              value={riddleQuestion}
              onChange={(e) => setRiddleQuestion(e.target.value)}
            />
          </motion.div>
          <motion.div
            // className={styles.oneLine}
            initial="hidden"
            animate="visible"
            variants={animations.addRiddle}
          >
            <label htmlFor="first">
              Answer:<span className={styles.redText}>*&nbsp;</span>
            </label>
            <input
              type="text"
              id="first"
              name="first"
              placeholder="A deck of cards"
              required={true}
              value={riddleAnswer}
              onChange={(e) => setRiddleAnswer(e.target.value)}
            />
          </motion.div>
        </>
      );
    }
  }

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
        variants={animations.form}
      >
        <motion.h1
          className={styles.title}
          initial="hidden"
          animate="visible"
          variants={animations.title}
        >
          Add your own&nbsp;Joke!
        </motion.h1>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.inputName}
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
          // className={styles.inputs}
          initial="hidden"
          animate="visible"
          variants={animations.inputEmail}
        >
          {/* <div> */}
          <label htmlFor="email">E-Mail Address</label>
          <input
            type="email"
            name="email"
            placeholder="mo.bamba@example.io (optional)"
            required={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* </div> */}
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.inputCompletion}
        >
          <hr />
          {/* <label htmlFor="message">
            Add Joke <span className={styles.redText}>*</span>
          </label> */}
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>{joke}</button>
            <div className={styles.dropdownContent}>
              <div onClick={() => setJoke("Knock-knock")}>Knock-knock</div>
              <div onClick={() => setJoke("Riddle")}>Riddle</div>
            </div>
          </div>
          {addJoke()}
        </motion.div>
        <motion.button
          initial="hidden"
          animate="visible"
          variants={animations.button}
          className={styles.btn}
          type="submit"
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
}
