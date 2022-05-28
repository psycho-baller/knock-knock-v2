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
  const [completion, setCompletion] = useState("");
  const [joke, setJoke] = useState("knock-knock");

  const [first, setFirst] = useState("");
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
  // let typeOfJoke: HTMLInputElement;
  // if (typeof window !== "undefined") {
  //   typeOfJoke = document.getElementById("typeOfJoke") as HTMLInputElement;
  // }
  // useEffect(() => {
  //   typeOfJoke = document.getElementById("joke-type") as HTMLInputElement;
  // }, []);
  function addJoke(){
    if (joke === "knock-knock") {
    return (
      <>
        <div className={styles.oneLine}>
          <label htmlFor="first">Knock&nbsp;Knock:</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Ligma"
            required={true}
            value={name}
            onChange={(e) => {
              setFirst(e.target.value);
              setName(e.target.value)}}
          />
        </div>
        <div className={styles.oneLine}>
          <label htmlFor="first">Knock&nbsp;Knock:</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Ligma"
            required={true}
            value={name}
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
        <div className={styles.oneLine}>
          <label htmlFor="first">Knock&nbsp;Knock:</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Ligma"
            required={true}
            value={name}
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
        <div className={styles.oneLine}>
          <label htmlFor="first">Knock&nbsp;Knock:</label>
          <input
            type="text"
            id="first"
            name="first"
            placeholder="Ligma"
            required={true}
            value={name}
            onChange={(e) => setFirst(e.target.value)}
          />
        </div>
      </>
    );
    }
    else {
      return (
        <>
          <div className={styles.oneLine}>
            <label htmlFor="first">Riddle:</label>
            <input
              type="text"
              id="first"
              name="first"
              placeholder="Ligma"
              required={true}
              value={name}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
          <div className={styles.oneLine}>
            <label htmlFor="first">Answer:</label>
            <input
              type="text"
              id="first"
              name="first"
              placeholder="Ligma"
              required={true}
              value={name}
              onChange={(e) => setFirst(e.target.value)}
            />
          </div>
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
          <label htmlFor="message">
            Add Joke <span className={styles.redText}>*</span>
          </label>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>{joke}</button>
            <div className={styles.dropdownContent}>
              <div onClick={() => setJoke("knock-knock")}>Knock-knock</div>
              <div onClick={() => setJoke("Riddle")}>Riddle</div>
            </div>
          </div>
          {addJoke()}
          {/* <textarea
            name="message"
            id="message"
            rows={5}
            placeholder=""
            required
            value={completion}
            onChange={(e) => setCompletion(e.target.value)}
          ></textarea> */}
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